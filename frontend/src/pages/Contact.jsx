import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Clock, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Contact = () => {
  const { t } = useTranslation();

  const openingHours = [
    { day: t('monday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('tuesday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('wednesday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('thursday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('friday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('saturday'), hours: '9:00 AM - 9:00 PM' },
    { day: t('sunday'), hours: '10:00 AM - 8:00 PM' }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold gradient-text mb-4">
            {t('contactUs')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit us, call us, or find us online. We're here to serve you the best traditional sweets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="card-festive">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Phone Number</h3>
                  <p className="text-muted-foreground">+91 91736 10885</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => window.open('tel:+919173610885')}
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-festive">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email Address</h3>
                  <p className="text-muted-foreground">utsavmodi1128@gmail.com</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => window.open('mailto:utsavmodi1128@gmail.com')}
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Address */}
            <Card className="card-festive">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* New Shop */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-semibold mb-2">Shree Krishna - Sweet - Namkin - Bakery (New Shop)</h3>
                    <a
                      href="https://maps.app.goo.gl/JqVDtD41PDzkdta8A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline mb-2"
                    >
                      View on Google Maps
                    </a>
                    <iframe
                      src="https://www.google.com/maps?q=Shree+Krishna+Sweet+Namkin+Bakery,+JqVDtD41PDzkdta8A&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl mb-2"
                    ></iframe>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">9:00 AM - 8:00 PM (All days)</span>
                    </div>
                  </div>
                  {/* Old Shop */}
                  <div className="flex flex-col items-center text-center">
                    <h3 className="font-semibold mb-2">Shree Krishna Seet Mart (Old Shop)</h3>
                    <a
                      href="https://maps.app.goo.gl/z1fmH4pUyZbxguKC6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline mb-2"
                    >
                      View on Google Maps
                    </a>
                    <iframe
                      src="https://www.google.com/maps?q=Shree+Krishna+Seet+Mart,+z1fmH4pUyZbxguKC6&output=embed"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl mb-2"
                    ></iframe>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">9:00 AM - 8:00 PM (All days)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            {/* Removed old opening hours card as timings are now shown with each shop */}
          </div>

          {/* Map and About */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Google Map */}
            {/* Removed old single map card */}

            {/* About Us */}
            <Card className="card-festive">
              <CardContent className="p-6">
                <h3 className="font-baloo font-bold text-xl gradient-text mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  About Us
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Shree Krishna Sweets has been a symbol of tradition and quality for over three generations in Gujarat. From our humble beginnings as a small family shop, we have grown into a beloved destination for sweet lovers, while always staying true to our roots.
                  </p>
                  <p>
                    Every sweet is made fresh daily using recipes passed down through our family. We use only the best ingredients—pure ghee, premium dry fruits, and fresh milk—so every bite is a celebration of authentic taste and quality.
                  </p>
                  <p>
                    We are proud to serve thousands of happy customers and to be a part of your celebrations and memories. Thank you for making us a part of your family!
                  </p>
                  <div className="flex items-center space-x-6 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">75+</div>
                      <div className="text-xs">Years of Service</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-xs">Sweet Varieties</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10k+</div>
                      <div className="text-xs">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-festive text-primary-foreground rounded-xl p-8 max-w-3xl mx-auto">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-baloo font-bold mb-4">
              Join Our Sweet Family
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Experience the warmth of traditional hospitality and the taste of authentic sweets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.open('tel:+919876543210')}
              >
                Call Us Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => window.open('https://wa.me/919876543210?text=Hello! I would like to visit your shop.')}
              >
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;