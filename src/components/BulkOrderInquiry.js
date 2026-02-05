import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BulkForm.css';
import baseURL from "../components/Api/Api";
import Header from './Customer/Header/Header';
import Footer from './Customer/Footer/Footer';
import Swal from 'sweetalert2';
    
function BulkOrderInquiry() {
    const [selectedProducts, setSelectedProducts] = useState({
        lemon: false,
        pulihora: false,
        sorakaya: false,
        tomato: false,
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProductChange = (e) => {
        const { name, checked } = e.target;
        setSelectedProducts(prev => ({ ...prev, [name]: checked }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isAnyProductSelected = Object.values(selectedProducts).some(value => value);
    if (!isAnyProductSelected) {
        setIsSubmitting(false);
        return Swal.fire({
            icon: 'warning',
            title: 'No Product Selected',
            text: 'Please select at least one product before submitting your order.',
        });
    }

    try {
        const response = await fetch(`${baseURL}/bulk-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                selectedProducts
            }),
        });

        const data = await response.json();
        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'Order Submitted!',
                text: 'Your bulk order was submitted successfully.',
            });

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
                lemon: false,
                pulihora: false,
                sorakaya: false,
                tomato: false,
            });
        } else {
            throw new Error(data.message || 'Failed to submit order');
        }
    } catch (error) {
        console.error('Submission error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: error.message || 'Error submitting order. Please try again.',
        });
    } finally {
        setIsSubmitting(false);
    }
};



    return (
        <>
            <Header />
            <div className="container py-5 bulk-order-form-container mt-5 ">
                <div className="bg-white p-4 shadow rounded mainbulkcard">
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
                            <div className="col-md-4 mb-3 mb-md-0">
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
                            <div className="col-md-4 mb-3 mb-md-0">
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
                            <div className="col-md-4">
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

                        <div className="row mb-3">

                        </div>

                        <div className="mb-3" >
                            {/* <label className="form-label bulk-order-form-label">Product(s) of Interest *</label> */}
                            <div className="row mb-3" style={{marginTop:'-30px'}}>
                                <label className="form-label bulk-order-form-label">Product(s) of Interest *</label>
                                <div className="col-md-12 d-flex flex-wrap justify-content-between">
                                    <div className="form-check custom-checkbox">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="lemon"
                                            id="lemon"
                                            checked={selectedProducts.lemon}
                                            onChange={handleProductChange}
                                        />
                                        <label className="form-check-label bulk-order-form-label" htmlFor="lemon">Lemon Rice Gojju</label>
                                    </div>
                                    <div className="form-check custom-checkbox">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="pulihora"
                                            id="pulihora"
                                            checked={selectedProducts.pulihora}
                                            onChange={handleProductChange}
                                        />
                                        <label className="form-check-label bulk-order-form-label" htmlFor="pulihora">Puliyogare Gojju</label>
                                    </div>
                                    <div className="form-check custom-checkbox">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="sorakaya"
                                            id="sorakaya"
                                            checked={selectedProducts.sorakaya}
                                            onChange={handleProductChange}
                                        />
                                        <label className="form-check-label bulk-order-form-label" htmlFor="sorakaya">Vangibath Gojju</label>
                                    </div>
                                    <div className="form-check custom-checkbox">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="tomato"
                                            id="tomato"
                                            checked={selectedProducts.tomato}
                                            onChange={handleProductChange}
                                        />
                                        <label className="form-check-label bulk-order-form-label" htmlFor="tomato">Tomato Rice Gojju</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4">
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
                            <div className="col-md-4 mb-3 mb-md-0">
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
                            <div className="col-md-4">
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

                        <div className="mb-3" style={{marginTop:'-10px'}}>
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
            <Footer />
        </>
    );
}

export default BulkOrderInquiry;