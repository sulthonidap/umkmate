import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingConsultant = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about export opportunities through UMKM Mate.");
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-mint-500 to-sky-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 group hover:scale-110 animate-pulse-soft"
      aria-label="Contact Consultant on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Contact Consultant
      </span>
    </button>
  );
};

export default FloatingConsultant;