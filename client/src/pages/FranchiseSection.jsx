import { useState } from "react";
import "./FranchiseSection.css";

const FranchiseSection = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="franchise-section">
      <h2 className="franchise-heading">Become a Franchise Partner</h2>
      <div className="franchise-content">
        <div className="franchise-text">
          <p>
            We’re expanding and looking for passionate partners! Here’s a glimpse of our first store.
          </p>
          <button onClick={toggleForm} className="inquiry-button">
            Inquiry
          </button>
        </div>

        <div className="franchise-img-wrapper">
          <img
            src="https://res.cloudinary.com/dbazlbkfj/image/upload/v1750268209/2025-06-14_c3rvjs.webp"
            alt="Our First Store"
            className="franchise-image"
          />
        </div>
      </div>

      {showForm && (
        <div className="franchise-form-modal">
          <form
            className="franchise-form"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.target);
              fetch("http://localhost:5000/api/franchise-inquiry", {
                method: "POST",
                body: JSON.stringify({
                  name: data.get("name"),
                  email: data.get("email"),
                  phone: data.get("phone"),
                  message: data.get("message"),
                }),
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => res.json())
                .then(() => {
                  alert("Inquiry sent successfully!");
                  setShowForm(false);
                })
                .catch(() => alert("Something went wrong. Try again later."));
            }}
          >
            <h3>Franchise Inquiry</h3>
            <input name="name" placeholder="Your Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" placeholder="Phone" required />
            <textarea name="message" placeholder="Tell us more..." required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FranchiseSection;
