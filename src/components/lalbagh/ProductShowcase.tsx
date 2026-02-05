import { useState, useEffect } from 'react';
import { ShoppingBag, Star, Heart, ExternalLink } from 'lucide-react';
import './ProductShowcase.css'; // Import the CSS file

// Image imports
import PuliyogareImg from '../assets/puliyogare.jpeg';
import TomatoImg from '../assets/tomato.jpeg';
import LemonImg from '../assets/lemonrice.jpeg';
import VangibathImg from '../assets/vangibath.jpeg';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  features: string[];
  weight?: string;
  imageUrl?: string;
  productUrl?: string;
}

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const actualProducts: Product[] = [
    {
      id: '1',
      name: "Puliyogare Gojju",
      description: "South Sutra Puliyogare is not just a food, it is a legacy. My father used to prepare Puliyogare as a prasadam for temples with devotion & unmatched love. I have grown up watching him pounding masalas & boiling tamarind. Today I cook the same way with love & care.",
      price: "₹140.00",
      rating: 5.0,
      weight: "200gms",
      features: ["Temple Prasadam Recipe"],
      imageUrl: PuliyogareImg,
      productUrl: "https://southsutra.com/products"
    },
    {
      id: '2',
      name: "Tomato Rice Gojju",
      description: "Authentic South Indian tomato rice spice mix prepared with fresh tomatoes and traditional spices. Perfect for a quick and flavorful meal that brings the taste of home to your kitchen.",
      price: "₹140.00",
      rating: 4.8,
      weight: "200gms",
      features: ["Fresh Tomatoes", "Traditional Spices"],
      imageUrl: TomatoImg,
      productUrl: "https://southsutra.com/products"
    },
    {
      id: '3',
      name: "Lemon Rice Gojju",
      description: "Tangy and aromatic lemon rice spice mix that captures the essence of South Indian cuisine. Made with fresh curry leaves, mustard seeds, and the perfect blend of spices for an authentic taste.",
      price: "₹140.00",
      rating: 4.9,
      weight: "200gms",
      features: ["Fresh Curry Leaves", "Aromatic Spices"],
      imageUrl: LemonImg,
      productUrl: "https://southsutra.com/products"
    },
    {
      id: '4',
      name: "Vangibath Gojju",
      description: "Traditional brinjal rice spice mix prepared with tender brinjals and aromatic spices. A beloved South Indian dish that brings comfort and satisfaction with every bite.",
      price: "₹140.00",
      rating: 4.7,
      weight: "200gms",
      features: ["Tender Brinjals", "Aromatic Blend"],
      imageUrl: VangibathImg,
      productUrl: "https://southsutra.com/products"
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(actualProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(actualProducts);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    window.open(product.productUrl, '_blank');
  };

  if (loading) {
    return (
      <section id="products" className="product-showcase">
        <div className="product-container">
          <div className="product-header">
            <div className="product-tag">
              <ShoppingBag className="product-tag-icon" />
              <span className="product-tag-text">Heritage Collection</span>
            </div>
            <h2 className="product-title">Our Flower Show Favorites</h2>
            <p className="product-subtitle">
              Loading our authentic South Indian food collection...
            </p>
          </div>
          <div className="product-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="product-loading-card">
                <div className="product-loading-image"></div>
                <div className="product-loading-content">
                  <div className="product-loading-line"></div>
                  <div className="product-loading-line short"></div>
                  <div className="product-loading-line extra-short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="product-showcase">
      <div className="product-container">
        <div className="product-header">
          <div className="product-tag">
            <ShoppingBag className="product-tag-icon" />
            <span className="product-tag-text">Heritage Collection</span>
          </div>
          <h2 className="product-title">Our Flower Show Favorites</h2>
          <p className="product-subtitle">
            Discover our authentic South Indian food products, crafted with traditional recipes 
            and prepared with the same love and devotion as temple prasadam.
          </p>
          <div className="product-link">
            <ExternalLink className="product-link-icon" />
            <span className="product-link-text">
              Order online at southsutra.com
            </span>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-image-container">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="product-image"
                  />
                ) : (
                  <div className="text-6xl text-center">🍛</div>
                )}
                <div className="product-weight">
                  {product.weight}
                </div>
                <div className="product-overlay">
                  <div className="product-overlay-content">
                    <span className="product-overlay-text">Order Now</span>
                  </div>
                </div>
              </div>

              <div className="product-content">
                <div className="space-y-2">
                  <h3 className="product-name">
                    {product.name}
                  </h3>
                  <p className="product-description">
                    {product.description}
                  </p>
                </div>

                <div className="product-rating">
                  <div className="product-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`product-star ${i < Math.floor(product.rating) ? 'filled' : 'empty'}`} 
                      />
                    ))}
                  </div>
                  <span className="product-rating-text">({product.rating})</span>
                </div>

                <div className="product-features">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="product-feature">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="product-price-section">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="product-price">{product.price}</span>
                      {product.originalPrice && (
                        <span className="product-original-price">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <button className="product-button">
                    <span>Order Now</span>
                    <Heart className="product-button-icon" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="product-cta">
          <button 
            onClick={() => window.open('https://southsutra.com/products', '_blank')}
            className="product-cta-button"
          >
            <span>Order All Products</span>
            <ExternalLink className="product-cta-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;