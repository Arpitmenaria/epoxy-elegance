// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCartPreview, setShowCartPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item._id === product._id && item.selectedSize?.label === selectedSize?.label
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { ...product, selectedSize, quantity: 1 }];
    });

    setShowCartPreview(true);
    setTimeout(() => setShowCartPreview(false), 4000);
  };

  const removeFromCart = (productId, selectedSizeLabel) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item._id === productId && item.selectedSize?.label === selectedSizeLabel) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeAllOfItem = (productId, selectedSizeLabel) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item._id === productId && item.selectedSize?.label === selectedSizeLabel)
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, removeAllOfItem, showCartPreview, setShowCartPreview }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
