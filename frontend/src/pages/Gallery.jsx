import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { galleryImages } from '../data/sampleData';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const isGujarati = i18n.language === 'gu';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'shop', label: t('shopPhotos') },
    { id: 'sweets', label: t('sweetPhotos') },
    { id: 'packaging', label: 'Packaging' },
    { id: 'festive', label: 'Festival Celebrations' }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold gradient-text mb-4">
            {t('ourGallery')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a visual journey through our shop, delicious sweets, and festive celebrations
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-8 animate-fade-in-up">
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground shadow-festive' 
                  : 'hover:bg-primary/10 hover:scale-105'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-xl shadow-soft hover:shadow-festive transition-all duration-500 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={isGujarati ? image.altGu : image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
              </div>

              {/* Category Badge */}
              <Badge className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm">
                {image.category}
              </Badge>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">No images found</p>
              <p className="text-sm">Try selecting a different category</p>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
              >
                <X className="w-5 h-5" />
              </Button>
              <img
                src={selectedImage}
                alt="Gallery image"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-warm rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-baloo font-bold gradient-text mb-4">
              Visit Our Store
            </h3>
            <p className="text-muted-foreground mb-6">
              Experience the authentic taste and warm hospitality of our traditional sweet shop
            </p>
            <Button className="btn-festive">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;