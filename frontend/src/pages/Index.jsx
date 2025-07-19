import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Carousel, { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../components/ui/carousel';
import logo from '../assets/logo.png';

const Index = () => {
  const { t, i18n } = useTranslation();
  const isGujarati = i18n.language === 'gu';
  const [festivals, setFestivals] = useState([]);
  const [festivalsLoading, setFestivalsLoading] = useState(true);
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);

  useEffect(() => {
    fetch('/api/festivals')
      .then(res => res.json())
      .then(data => {
        setFestivals(Array.isArray(data) ? data : []);
        setFestivalsLoading(false);
      })
      .catch(() => setFestivalsLoading(false));
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setPopularProducts(Array.isArray(data) ? data.filter(p => p.isPopular) : []);
        setPopularLoading(false);
      })
      .catch(() => setPopularLoading(false));
  }, []);

  // Mock popular products for demo
  const mockPopularProducts = [
    { id: 1, name: 'Kaju Katli', image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400', price: 450 },
    { id: 2, name: 'Motichoor Ladoo', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400', price: 220 },
    { id: 3, name: 'Jalebi', image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400', price: 180 },
    { id: 4, name: 'Rasgulla', image: 'https://images.unsplash.com/photo-1606906606219-0ee2a2c6b00e?w=400', price: 200 },
    { id: 5, name: 'Barfi', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400', price: 350 },
    { id: 6, name: 'Gulab Jamun', image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400', price: 250 },
  ];

  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-warm py-20 px-4 overflow-hidden">
        {/* Krishna background image */}
        <div className="absolute inset-0 w-full h-full bg-center bg-cover opacity-20" style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/6/6c/Lord_Krishna_with_Flute.jpg)' }} />
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-primary/5 bg-opacity-10" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23ff9933' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
               }}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <img 
              src={logo} 
              alt={t('shopName')} 
              className="w-24 h-24 mx-auto mb-6" // removed animate-float
            />
            <h1 className="text-4xl md:text-6xl font-baloo font-extrabold gradient-text mb-2 drop-shadow-lg animate-bounce-slow">
              {t('shopName')}
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-pink-700 mb-6 animate-fade-in-up tracking-wide drop-shadow-lg">
              "Mitthi yaadein hamesha"
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('shopBanner')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="btn-festive">
                  {t('viewAll')} {t('products')}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  {t('contactUs')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Specials */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold gradient-text mb-4">
              {festivals[0]?.sectionTitle || 'Festival Specials'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Celebrate every festival with our special traditional sweets and treats
            </p>
          </div>
          {festivalsLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : festivals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No festival products found. Add some in the admin panel!</div>
          ) : (
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                {festivals.map((festival, index) => (
                  <CarouselItem key={festival._id || festival.id || index} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="product-card group animate-fade-in-up relative overflow-visible">
                      {/* Festival Special Banner */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block bg-gradient-to-r from-yellow-300 via-pink-200 to-yellow-400 text-yellow-900 font-extrabold px-4 py-1 rounded-full shadow-lg border-2 border-yellow-500 text-base tracking-wider drop-shadow-md animate-pulse">
                          🎉 Festival Special
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={`${backendUrl}${festival.image}`}
                          alt={festival.name}
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500 bg-gray-100"
                          onError={e => { e.target.src = '/public/placeholder.svg'; }}
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-extrabold text-2xl mb-2 text-yellow-900 font-baloo">
                          {festival.name}
                        </h3>
                        <div className="text-base text-muted-foreground mb-2">
                          {festival.description}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          )}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold gradient-text mb-4">
              Popular Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved traditional sweets, crafted with love and authentic recipes.
            </p>
          </div>
          <Carousel className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {mockPopularProducts.map((product, index) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="product-card group animate-fade-in-up">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="bg-primary text-primary-foreground px-2 py-1 rounded-full flex items-center space-x-1">
                          <span className="text-xs font-medium">Popular</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <div className="text-xl font-bold text-primary">
                        ₹{product.price}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-festive text-primary-foreground rounded-2xl p-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold mb-4">
              Visit Our Store Today!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Experience the authentic taste of traditional Indian sweets
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Get Directions
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index; 