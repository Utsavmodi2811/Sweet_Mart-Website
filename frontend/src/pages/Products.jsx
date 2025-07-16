import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Search, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
// import { sampleProducts } from '../data/sampleData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Products = () => {
  const { t, i18n } = useTranslation();
  const isGujarati = i18n.language === 'gu';
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'sweets', label: t('sweets') },
    { id: 'namkeen', label: t('namkeen') },
    { id: 'bakery', label: t('bakery') }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameGu && product.nameGu.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  // Group products by subcategory
  const groupedBySubcategory = filteredProducts.reduce((acc, product) => {
    const subcat = product.subcategory || 'Other';
    if (!acc[subcat]) acc[subcat] = [];
    acc[subcat].push(product);
    return acc;
  }, {});

  const handlePayment = (product) => {
    // Razorpay integration would go here
    // For demo, we'll just show an alert
    alert(`Payment for ${isGujarati ? product.nameGu : product.name} - ₹${product.price}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold gradient-text mb-4">
            {t('allProducts')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our complete range of traditional sweets, savory snacks, and fresh bakery items
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedCategory === category.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {loading && <div className="text-center py-12">Loading products...</div>}
        {error && <div className="text-center text-red-500 py-12">{error}</div>}

        {/* Products Grid - Grouped by Subcategory */}
        {!loading && !error && Object.keys(groupedBySubcategory).map((subcat) => (
          <div key={subcat} className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-primary">{subcat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedBySubcategory[subcat].map((product, index) => (
                <Card key={product.id || product._id} className="product-card group animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={isGujarati ? product.nameGu : product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.isPopular && (
                      <Badge className="absolute top-3 left-3 bg-primary">
                        Popular
                      </Badge>
                    )}
                    <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {isGujarati ? product.nameGu : product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {isGujarati ? product.descriptionGu : product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-primary">
                        ₹{product.price}
                      </div>
                      <Button 
                        onClick={() => handlePayment(product)}
                        className="btn-festive"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('buyNow')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No products found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Payment Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-festive text-primary-foreground rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-baloo font-bold mb-4">
              Secure Payment Available
            </h3>
            <p className="mb-4 opacity-90">
              Pay securely using Razorpay for instant orders. We accept UPI, cards, and net banking.
            </p>
            <p className="text-sm opacity-75">
              Free delivery on orders above ₹500 within 5km radius
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;