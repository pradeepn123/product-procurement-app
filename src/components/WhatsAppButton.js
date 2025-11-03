import React from 'react';

const WhatsAppButton = ({ phoneNumber, message }) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <button 
      className="btn btn-success mb-3"
      onClick={handleWhatsAppClick}
    >
      📱 Send via WhatsApp
    </button>
  );
};

export default WhatsAppButton;