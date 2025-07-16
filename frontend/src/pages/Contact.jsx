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
                  <h3 className="font-semibold mb-2">{t('phoneNumber')}</h3>
                  <p className="text-muted-foreground">+91 98765 43210</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => window.open('tel:+919876543210')}
                  >
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-festive">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{t('emailAddress')}</h3>
                  <p className="text-muted-foreground">info@shrikrishnasweets.com</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => window.open('mailto:info@shrikrishnasweets.com')}
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Address */}
            <Card className="card-festive">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{t('ourLocation')}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Gandhi Road, Maninagar<br />
                      Ahmedabad, Gujarat 380008<br />
                      India
                    </p>
                    <Button 
                      className="btn-festive mt-4"
                      onClick={() => window.open('https://maps.google.com/?q=23.0225,72.5714')}
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening Hours */}
            <Card className="card-festive">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-4">{t('openingHours')}</h3>
                    <div className="space-y-2">
                      {openingHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="font-medium">{schedule.day}</span>
                          <span className="text-muted-foreground">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and About */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Google Map */}
            <Card className="card-festive">
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5692523425043!2d72.5692!3d23.0225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* About Us */}
            <Card className="card-festive">
              <CardContent className="p-6">
                <h3 className="font-baloo font-bold text-xl gradient-text mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  {t('aboutUs')}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    For over three generations, Shree Krishna Sweets has been serving authentic 
                    traditional Indian sweets to families across Gujarat. What started as a small 
                    family business has grown into a beloved institution, yet we've never lost 
                    our commitment to quality and tradition.
                  </p>
                  <p>
                    Every sweet in our shop is made fresh daily using time-honored recipes passed 
                    down through our family. We use only the finest ingredients - pure ghee, 
                    premium dry fruits, and organic milk - to ensure every bite is a celebration 
                    of authentic taste.
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