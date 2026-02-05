import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import andrachillipowder from "../../assets/pic6.webp";
import keralacoconut from "../../assets/pic7.webp";
import karnatagarlic from "../../assets/pic8.webp";
import tamilian from "../../assets/pic9.webp";
import { FaHeart, FaCartPlus, FaShoppingBag, FaStar, FaRegStar, FaFire, FaLeaf, FaPepperHot, FaSeedling } from 'react-icons/fa';

const MasalaPastes = () => {
  const products = [
    {
      id: 1,
      name: 'Andhra Chilli Paste',
      weight: '250g',
      description: 'Fiery and aromatic paste capturing the essence of Andhra cuisine.',
      price: '₹1074.62',
      originalPrice: '₹1299.00',
      image: andrachillipowder,
      rating: 4.5,
      spicyLevel: 5,
      tag: 'Bestseller',
      icon: <FaFire className="text-danger" />
    },
    {
      id: 2,
      name: 'Kerala Coconut Curry Paste',
      weight: '250g',
      description: 'Creamy paste infused with fresh coconut and Kerala spices.',
      price: '₹1241.78',
      image: keralacoconut,
      rating: 4.8,
      spicyLevel: 2,
      tag: 'Premium',
      icon: <FaLeaf className="text-success" />
    },
    {
      id: 3,
      name: 'Tamilian Tamarind Paste',
      weight: '100g',
      description: 'Tangy and savory tamarind paste, a Tamil Nadu staple.',
      price: '₹400.00',
      originalPrice: '₹499.00',
      image: tamilian,
      rating: 4.2,
      spicyLevel: 1,
      tag: 'New',
      icon: <FaPepperHot className="text-warning" />
    },
    {
      id: 4,
      name: 'Karnataka Garlic-Ginger Paste',
      weight: '100g',
      description: 'Aromatic garlic and ginger blend from Karnataka.',
      price: '₹430.00',
      image: karnatagarlic,
      rating: 4.3,
      spicyLevel: 3,
      tag: 'Organic',
      icon: <FaSeedling className="text-info" />
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-warning" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-warning" style={{ opacity: 0.5 }} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-warning" />);
    }
    
    return stars;
  };

  return (
    <Container className="my-5 py-4" style={{ maxWidth: '1200px' }}>
      <div className="text-center mb-5">
        <h1
          className="display-5 fw-bold mb-3"
          style={{ 
            fontFamily: "'Poppins', sans-serif", 
            color: '#C1440E',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
            position: 'relative',
            display: 'inline-block'
          }}
        >
          Our Signature Masala Pastes
          <span 
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #C1440E, #FFA500)',
              borderRadius: '2px'
            }}
          ></span>
        </h1>
        <p className="text-muted">Authentic regional flavors crafted with traditional recipes</p>
      </div>

      <Row className="g-4 justify-content-center">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={3}>
            <Card
              className="shadow-sm h-100 border-0"
              style={{
                borderRadius: '15px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                background: '#fffdf9',
                border: '1px solid rgba(193, 68, 14, 0.1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(193, 68, 14, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{ position: 'relative' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ 
                    height: '180px', 
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                {product.tag && (
                  <Badge 
                    pill 
                    bg="danger"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      fontSize: '0.7rem',
                      padding: '5px 10px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                  >
                    {product.tag}
                  </Badge>
                )}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(255,255,255,0.8)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  {product.icon}
                </div>
              </div>
              
              <Card.Body className="p-3 d-flex flex-column">
                <div className="mb-2">
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title 
                      className="h6 fw-bold mb-1" 
                      style={{ color: '#333', fontSize: '1rem' }}
                    >
                      {product.name}
                    </Card.Title>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    {product.weight}
                  </Card.Subtitle>
                  
                  <div className="d-flex align-items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2" style={{ fontSize: '0.8rem' }}>Spice:</span>
                    {[...Array(5)].map((_, i) => (
                      <FaPepperHot 
                        key={i} 
                        className={i < product.spicyLevel ? "text-danger" : "text-secondary"} 
                        style={{ opacity: i < product.spicyLevel ? 1 : 0.3 }}
                        size={12}
                      />
                    ))}
                  </div>
                  
                  <Card.Text 
                    style={{ 
                      fontSize: '0.85rem', 
                      color: '#555',
                      minHeight: '40px'
                    }}
                  >
                    {product.description}
                  </Card.Text>
                </div>
                
                <div className="mt-auto">
                  <div className="d-flex align-items-center mb-3">
                    <span className="fw-bold text-danger me-2" style={{ fontSize: '1.1rem' }}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-decoration-line-through text-muted" style={{ fontSize: '0.8rem' }}>
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="d-flex justify-content-between gap-2 mb-3">
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                      style={{ borderRadius: '20px' }}
                    >
                      <FaCartPlus size={14} /> Add
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="d-flex align-items-center gap-1 flex-grow-1 justify-content-center"
                      style={{ borderRadius: '20px' }}
                    >
                      <FaShoppingBag size={14} /> Buy
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      className="d-flex align-items-center justify-content-center"
                      style={{ 
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px'
                      }}
                    >
                      <FaHeart size={14} />
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <a
                      href="#"
                      className="text-decoration-none fw-semibold d-flex align-items-center justify-content-center gap-1"
                      style={{ 
                        fontSize: '0.85rem', 
                        color: '#C1440E',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#e35f1c';
                        e.currentTarget.style.transform = 'translateX(5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#C1440E';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      View Details <span style={{ transition: 'all 0.2s ease' }}>→</span>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MasalaPastes;