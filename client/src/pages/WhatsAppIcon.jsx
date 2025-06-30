// src/components/WhatsAppIcon.jsx
import React from 'react';
import './WhatsAppIcon.css';

const WhatsAppIcon = () => {
  return (
    <a
      href="https://wa.me/918058715169"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
  );
};

export default WhatsAppIcon;
