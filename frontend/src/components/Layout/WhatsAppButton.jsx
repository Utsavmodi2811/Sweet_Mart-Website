import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const { t } = useTranslation();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsappText'));
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="floating-whatsapp animate-pulse-glow"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;