import { useState, useEffect } from 'react';
import './Slider.css';

const images = [
  '/assets/banner1.png',
  '/assets/banner2.png',
  '/assets/banner3.png',
];

function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`slide-${index}`}
          className={`slider-img ${index === current ? 'active' : 'inactive'}`}
        />
      ))}
    </div>
  );
}

export default Slider;
