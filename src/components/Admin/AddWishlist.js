import React, { useState } from 'react';
import axios from 'axios';
import baseURL from "../Api/Api";

const WishlistForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',
    name: '',
    image: null,
    original_price: '',
    price: '',
    quantity: 1,
    weight: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(`${baseURL}/wishlist`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Item successfully added to wishlist!');
      setFormData({
        customer_id: '',
        product_id: '',
        name: '',
        image: null,
        original_price: '',
        price: '',
        quantity: 1,
        weight: ''
      });
      setPreviewImage(null);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setIsError(true);
      setMessage(error.response?.data?.message || 'Failed to add item to wishlist');
    }
  };

  return (
    <div className="wishlist-form-container">
      <h2>Add Item to Wishlist</h2>
      <form onSubmit={handleSubmit} className="wishlist-form">
        <input type="number" name="customer_id" placeholder="Customer ID" value={formData.customer_id} onChange={handleChange} required />
        <input type="number" name="product_id" placeholder="Product ID" value={formData.product_id} onChange={handleChange} required />
        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '200px' }} />}
        <input type="number" name="original_price" placeholder="Original Price" step="0.01" value={formData.original_price} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Current Price" step="0.01" value={formData.price} onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input type="text" name="weight" placeholder="Weight (optional)" value={formData.weight} onChange={handleChange} />
        <button type="submit">Add to Wishlist</button>
        {message && <p className={isError ? 'error' : 'success'}>{message}</p>}
      </form>
    </div>
  );
};

export default WishlistForm;
