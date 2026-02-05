import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BulkForm.css';

function BulkOrderInquiry() {
  const [selectedProducts, setSelectedProducts] = useState({
    andhra: false,
    kerala: false,
    tamilian: false,
    karnataka: false,
  });

  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    email: '',
    phone: '',
    shipping_city: '',
    shipping_pincode: '',
    additional_message: '',
  });

  const [quantities, setQuantities] = useState({
    andhra: { '250g': '', '500g': '', '1000g': '' },
    kerala: { '250g': '', '500g': '', '1000g': '' },
    tamilian: { '250g': '', '500g': '', '1000g': '' },
    karnataka: { '250g': '', '500g': '', '1000g': '' },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const { name, checked } = e.target;
    setSelectedProducts(prev => ({ ...prev, [name]: checked }));
  };

  const handleQuantityChange = (product, size, value) => {
    setQuantities(prev => ({
      ...prev,
      [product]: {
        ...prev[product],
        [size]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/bulk-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedProducts,
          quantities
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Order submitted successfully!');
        // Reset form
        setFormData({
          full_name: '',
          company_name: '',
          email: '',
          phone: '',
          shipping_city: '',
          shipping_pincode: '',
          additional_message: '',
        });
        setSelectedProducts({
          andhra: false,
          kerala: false,
          tamilian: false,
          karnataka: false,
        });
        setQuantities({
          andhra: { '250g': '', '500g': '', '1000g': '' },
          kerala: { '250g': '', '500g': '', '1000g': '' },
          tamilian: { '250g': '', '500g': '', '1000g': '' },
          karnataka: { '250g': '', '500g': '', '1000g': '' },
        });
      } else {
        throw new Error(data.error || 'Failed to submit order');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(error.message || 'Error submitting order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5 bulk-order-form-container">
      <div className="bg-white p-4 shadow rounded">
        <div className="text-center mb-4">
          <div className="bulk-order-form-header-icon">
            <i className="bi bi-box"></i>
          </div>
          <h3 className="bulk-order-form-header-title">Bulk Order Inquiry</h3>
          <p className="bulk-order-form-header-subtitle">
            Interested in larger quantities for your business or event? Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label bulk-order-form-label">Full Name *</label>
              <input 
                type="text" 
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="Your Full Name" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label bulk-order-form-label">Company Name (Optional)</label>
              <input 
                type="text" 
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="Your Company Name" 
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label bulk-order-form-label">Email Address *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="you@example.com" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label bulk-order-form-label">Phone Number *</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="Your Phone Number" 
                required 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label bulk-order-form-label">Product(s) of Interest *</label>
            <div className="row">
              <div className="col-md-6">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="andhra" 
                    id="andhra" 
                    checked={selectedProducts.andhra} 
                    onChange={handleProductChange} 
                  />
                  <label className="form-check-label bulk-order-form-label" htmlFor="andhra">Lemon Chutney</label>
                </div>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="kerala" 
                    id="kerala" 
                    checked={selectedProducts.kerala} 
                    onChange={handleProductChange} 
                  />
                  <label className="form-check-label bulk-order-form-label" htmlFor="kerala">Pulihora Chutney</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="tamilian" 
                    id="tamilian" 
                    checked={selectedProducts.tamilian} 
                    onChange={handleProductChange} 
                  />
                  <label className="form-check-label bulk-order-form-label" htmlFor="tamilian">Sorakaya Chutney</label>
                </div>
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    name="karnataka" 
                    id="karnataka" 
                    checked={selectedProducts.karnataka} 
                    onChange={handleProductChange} 
                  />
                  <label className="form-check-label bulk-order-form-label" htmlFor="karnataka">Tomato Chutney</label>
                </div>
              </div>
            </div>
          </div>

          {/* Estimated Quantities for Selected Products */}
          {(selectedProducts.andhra || selectedProducts.kerala || selectedProducts.tamilian || selectedProducts.karnataka) && (
            <div className="bulk-order-form-quantity-section p-3 rounded mb-3">
              <h6 className="fw-semibold bulk-order-form-quantity-title">
                <i className="bi bi-graph-up-arrow me-1"></i> Estimated Quantities for Selected Products
              </h6>

              {selectedProducts.andhra && (
                <div className="bulk-order-form-product-section p-3 rounded mb-3">
                  <h6 className="fw-semibold mb-3 bulk-order-form-product-title">Lemon Chutney</h6>
                  <div className="row mb-2">
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 250g</label>
                      <input 
                        type="number" 
                        value={quantities.andhra['250g']}
                        onChange={(e) => handleQuantityChange('andhra', '250g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 50" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 500g</label>
                      <input 
                        type="number" 
                        value={quantities.andhra['500g']}
                        onChange={(e) => handleQuantityChange('andhra', '500g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 50" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 1000g</label>
                      <input 
                        type="number" 
                        value={quantities.andhra['1000g']}
                        onChange={(e) => handleQuantityChange('andhra', '1000g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 50" 
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedProducts.kerala && (
                <div className="bulk-order-form-product-section p-3 rounded mb-3">
                  <h6 className="fw-semibold mb-3 bulk-order-form-product-title">Pulihora Chutney</h6>
                  <div className="row mb-2">
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 250g</label>
                      <input 
                        type="number" 
                        value={quantities.kerala['250g']}
                        onChange={(e) => handleQuantityChange('kerala', '250g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 30" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 500g</label>
                      <input 
                        type="number" 
                        value={quantities.kerala['500g']}
                        onChange={(e) => handleQuantityChange('kerala', '500g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 30" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 1000g</label>
                      <input 
                        type="number" 
                        value={quantities.kerala['1000g']}
                        onChange={(e) => handleQuantityChange('kerala', '1000g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 30" 
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedProducts.tamilian && (
                <div className="bulk-order-form-product-section p-3 rounded mb-3">
                  <h6 className="fw-semibold mb-3 bulk-order-form-product-title">Sorakaya Chutney</h6>
                  <div className="row mb-2">
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 250g</label>
                      <input 
                        type="number" 
                        value={quantities.tamilian['250g']}
                        onChange={(e) => handleQuantityChange('tamilian', '250g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 20" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 500g</label>
                      <input 
                        type="number" 
                        value={quantities.tamilian['500g']}
                        onChange={(e) => handleQuantityChange('tamilian', '500g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 20" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 1000g</label>
                      <input 
                        type="number" 
                        value={quantities.tamilian['1000g']}
                        onChange={(e) => handleQuantityChange('tamilian', '1000g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 20" 
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedProducts.karnataka && (
                <div className="bulk-order-form-product-section p-3 rounded mb-3">
                  <h6 className="fw-semibold mb-3 bulk-order-form-product-title">Tomato Chutney</h6>
                  <div className="row mb-2">
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 250g</label>
                      <input 
                        type="number" 
                        value={quantities.karnataka['250g']}
                        onChange={(e) => handleQuantityChange('karnataka', '250g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 40" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 500g</label>
                      <input 
                        type="number" 
                        value={quantities.karnataka['500g']}
                        onChange={(e) => handleQuantityChange('karnataka', '500g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 40" 
                        min="0"
                      />
                    </div>
                    <div className="col-md-4 bulk-order-form-quantity-inputs">
                      <label className="form-label bulk-order-form-label">Quantity for: 1000g</label>
                      <input 
                        type="number" 
                        value={quantities.karnataka['1000g']}
                        onChange={(e) => handleQuantityChange('karnataka', '1000g', e.target.value)}
                        className="form-control bulk-order-form-input" 
                        placeholder="e.g. 40" 
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label bulk-order-form-label">Shipping City/Region (Optional)</label>
              <input 
                type="text" 
                name="shipping_city"
                value={formData.shipping_city}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="e.g. Bangalore, Karnataka" 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label bulk-order-form-label">Shipping Pincode (Optional)</label>
              <input 
                type="text" 
                name="shipping_pincode"
                value={formData.shipping_pincode}
                onChange={handleInputChange}
                className="form-control bulk-order-form-input" 
                placeholder="e.g. 560001" 
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label bulk-order-form-label">Additional Message (Optional)</label>
            <textarea 
              name="additional_message"
              value={formData.additional_message}
              onChange={handleInputChange}
              className="form-control bulk-order-form-input" 
              rows="3" 
              placeholder="Any specific requirements or questions?"
            ></textarea>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn bulk-order-form-submit-btn fw-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BulkOrderInquiry;