// import React from 'react';
// import './OrderDetails.css'; // Enhanced CSS for styling

// const OrderDetails = () => {
//   const orderItems = [
//     { id: 1, name: 'Andhra Chilli Paste', quantity: 40, weight: '250g', price: 12.99 },
//     { id: 2, name: 'Kerala Coconut Curry Paste', quantity: 40, weight: '250g', price: 29.00 },
//   ];

//   const shippingAddress = {
//     name: 'Current User',
//     address: '123 User Lane',
//     city: 'UserCity',
//     state: 'UserState',
//     zip: '10001',
//     country: 'India',
//     email: 'user@example.com',
//     phone: '9998887770',
//   };

//   const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
//   const shipping = 3.50;
//   const total = subtotal + shipping;

//   return (
//     <div className="order-details">
//       <header className="order-header">
//         <h1>Order Details</h1>
//         <div className="order-id">Order ID: #SUTRA-USER-12345</div>
//         <div className="order-date">Placed on: May 14, 2025, 6:15:21 PM</div>
//         <div className="order-status">Status: Delivered</div>
//       </header>

//       <div className="order-content">
//         <div className="order-items">
//           <h2>Order Items</h2>
//           {orderItems.map((item) => (
//             <div key={item.id} className="order-item">
//               <div className="item-quantity">{item.quantity} x {item.weight}</div>
//               <div className="item-name">{item.name}</div>
//               <div className="item-price">₹{item.price.toFixed(2)}</div>
//             </div>
//           ))}
//           <div className="order-summary">
//             <div className="summary-row">
//               <span>Subtotal:</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Shipping:</span>
//               <span>₹{shipping.toFixed(2)}</span>
//             </div>
//             <div className="summary-row total">
//               <span>Total:</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <div className="shipping-address">
//           <h2>Shipping Address</h2>
//           <div>{shippingAddress.name}</div>
//           <div>{shippingAddress.address}</div>
//           <div>{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.zip}</div>
//           <div>{shippingAddress.country}</div>
//           <div>Email: {shippingAddress.email}</div>
//           <div>Phone: {shippingAddress.phone}</div>
//         </div>

//         <div className="payment-information">
//           <h2>Payment Information</h2>
//           <div>Payment Status: <span className="paid">Paid</span></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;
// import React from 'react';
// import './OrderDetails.css';

// const OrderDetails = () => {
//   return (
//     <div className="order-container">
//       <div className="order-header">
//         <button className="back-btn">← Back to My Orders</button>
//         <h2>Order Details</h2>
//         <button className="download-btn">⬇ Download Invoice</button>
//       </div>

//       <div className="order-status">
//         <div>
//           <h3>Order ID: #SUTRA-USER-12345</h3>
//           <p>Last updated: May 12, 2025, 6:15:21 PM</p>
//         </div>
//         <div>
//           <span className="status-label">Status: Delivered</span>
//           <p>Placed on: May 14, 2025, 6:15:21 PM</p>
//         </div>
//       </div>

//       <div className="order-content">
//         <div className="order-items card">
//           <h4>📦 Order Items</h4>
//           <div className="item">
//             <div className="item-img" />
//             <div>
//               <h5>Andhra Chilli Paste</h5>
//               <p>Qty: 1 · 250g</p>
//               <p>Price: ₹12.99 each</p>
//             </div>
//             <span className="item-price">₹12.99</span>
//           </div>

//           <div className="item">
//             <div className="item-img" />
//             <div>
//               <h5>Kerala Coconut Curry Paste</h5>
//               <p>Qty: 2 · 250g</p>
//               <p>Price: ₹14.50 each</p>
//             </div>
//             <span className="item-price">₹29.00</span>
//           </div>

//           <div className="totals">
//             <div>Subtotal:</div>
//             <div>₹42.49</div>
//             <div>Shipping:</div>
//             <div>₹3.50</div>
//             <div className="total">Total:</div>
//             <div className="total">₹45.99</div>
//           </div>
//         </div>

//         <div className="right-section">
//           <div className="card">
//             <h4>📍 Shipping Address</h4>
//             <p><strong>Current User</strong></p>
//             <p>123 User Lane</p>
//             <p>UserCity, UserState - 10001</p>
//             <p>India</p>
//             <p>Email: user@example.com</p>
//             <p>Phone: 9998887770</p>
//           </div>

//           <div className="card">
//             <h4>💳 Payment Information</h4>
//             <p>Payment Status: <span className="paid">Paid</span></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDetails;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderDetails.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const OrderDetails = () => {
  return (
    <div className="container py-4 order-details-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-light rounded p-3 mb-4 shadow-sm">
        <button className="btn btn-outline-secondary">
          ← Back to My Orders
        </button>
        <h3 className="mb-0 fw-semibold text-dark">Order Details</h3>
        <button className="btn btn-primary">
          ⬇ Download Invoice
        </button>
      </div>

      {/* Order Status */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="bg-white rounded shadow-sm p-3 h-100">
            <h5 className="fw-semibold mb-1">Order ID: <span className="text-primary">#SUTRA-USER-12345</span></h5>
            <small className="text-muted">Last updated: May 12, 2025, 6:15:21 PM</small>
          </div>
        </div>
        <div className="col-md-6">
          <div className="bg-white rounded shadow-sm p-3 h-100">
            <span className="badge bg-success mb-2 px-3 py-2 fs-6">Delivered</span>
            <br />
            <small className="text-muted">Placed on: May 14, 2025, 6:15:21 PM</small>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="row g-4">
        {/* Order Items */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">📦 Order Items</h5>

              {/* Item 1 */}
              <div className="d-flex align-items-center mb-4 border-bottom pb-3">
                <div className="item-img me-3"></div>
                <div>
                  <h6 className="mb-1 fw-bold">Andhra Chilli Paste</h6>
                  <small>Qty: 1 · 250g</small><br />
                  <small>Price: ₹12.99 each</small>
                </div>
                <div className="ms-auto fw-bold">₹12.99</div>
              </div>

              {/* Item 2 */}
              <div className="d-flex align-items-center mb-4 border-bottom pb-3">
                <div className="item-img me-3"></div>
                <div>
                  <h6 className="mb-1 fw-bold">Kerala Coconut Curry Paste</h6>
                  <small>Qty: 2 · 250g</small><br />
                  <small>Price: ₹14.50 each</small>
                </div>
                <div className="ms-auto fw-bold">₹29.00</div>
              </div>

              {/* Totals */}
              <div className="pt-3">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹42.49</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>₹3.50</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
                  <span>Total:</span>
                  <span>₹45.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-4">
          {/* Shipping Address */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">📍 Shipping Address</h5>
              <p className="mb-1 fw-semibold">Current User</p>
              <p className="mb-1">123 User Lane</p>
              <p className="mb-1">UserCity, UserState - 10001</p>
              <p className="mb-1">India</p>
              <p className="mb-1">Email: <a href="mailto:user@example.com">user@example.com</a></p>
              <p className="mb-0">Phone: 9998887770</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">💳 Payment Information</h5>
              <p className="mb-0">Payment Status: <span className="badge bg-success px-3 py-2">Paid</span></p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
