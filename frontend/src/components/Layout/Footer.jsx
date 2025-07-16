import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import logo from "../../assets/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt={t('shopName')} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-baloo font-bold text-primary">
                  {t('shopName')}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t('shopTagline')}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('shopDescription')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('contactUs')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">info@shrikrishnasweets.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-sm">
                  123 Gandhi Road, Ahmedabad,<br />Gujarat 380001
                </span>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t('openingHours')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('monday')} - {t('saturday')}</span>
                <span>9:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{t('sunday')}</span>
                <span>10:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <a href="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('home')}
              </a>
              <a href="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('products')}
              </a>
              <a href="/gallery" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('gallery')}
              </a>
              <a href="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('contact')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {t('shopName')}. All rights reserved. Made with ❤️ for traditional sweets lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;