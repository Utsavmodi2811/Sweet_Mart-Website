import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      products: "View All Products",
      gallery: "Gallery",
      contact: "Contact",
      // Shop Info
      shopName: "Shree Krishna Sweets-Namkeen-Bakery",
      shopTagline: "Traditional Sweets, Fresh Daily",
      shopDescription: "Family-run traditional Indian sweet shop serving authentic sweets, namkeen, and fresh bakery items since generations.",
      // ... existing code ...
      whatsappText: "Hello! I'm interested in your sweets."
    }
  },
  gu: {
    translation: {
      // Navigation
      home: "હોમ",
      products: "બધા ઉત્પાદનો",
      gallery: "ગેલેરી",
      contact: "સંપર્ક",
      // Shop Info
      shopName: "શ્રી કૃષ્ણ સ્વીટ્સ-નમકીન-બેકરી",
      shopTagline: "પરંપરાગત મિઠાઈ, દરરોજ તાજી",
      shopDescription: "પેઢીઓથી ચાલતી પારિવારિક પરંપરાગત ભારતીય મિઠાઈની દુકાન જે અસલી મિઠાઈ, નમકીન અને તાજા બેકરી આઈટમ્સ પીરસે છે.",
      // ... existing code ...
      whatsappText: "નમસ્તે! મને તમારી મિઠાઈમાં રસ છે."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 