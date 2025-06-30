import { useState } from "react";
import "./Customization.css";

function Customization() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Send formData via email (Nodemailer or API)
    console.log("Customization Inquiry:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      requirements: ""
    });
  };

  return (
    <div className="customization-page">
      <div className="customization-header">
        <h1>Get Your Custom Epoxy Table</h1>
        <p>
          We specialize in creating **tailor-made epoxy tables** to suit your space and personality.
          Choose your theme, size, wood type, resin color, and design — and we'll turn your vision into reality.
        </p>
      </div>

      <div className="customization-form-section">
        <h2>Customization Inquiry</h2>

        {submitted ? (
          <p className="thank-you">Thank you! We'll get back to you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="custom-form">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="requirements"
              rows="5"
              placeholder="Describe your customization idea or requirements..."
              value={formData.requirements}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Inquiry</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Customization;
