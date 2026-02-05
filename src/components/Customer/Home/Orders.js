import React from 'react';

const orders = [
  {
    id: 'SUTRA-USER-12345',
    date: 'May 14, 2025',
    items: [
      { name: 'Andhra Chilli Paste', quantity: 1 },
      { name: 'Kerala Coconut Curry Paste', quantity: 2 },
    ],
    total: 45.99,
    status: 'Delivered',
  },
  {
    id: 'SUTRA-USER-67890',
    date: 'Apr 11, 2025',
    items: [
      { name: 'Tamilian Tamarind Paste', quantity: 1 },
      { name: 'Karnataka Garlic-Ginger Paste', quantity: 1 },
    ],
    total: 28.50,
    status: 'Shipped',
  },
];

const statusVariant = {
  delivered: 'success',
  shipped: 'warning',
  pending: 'secondary',
  cancelled: 'danger',
};

const Orders = () => {
  return (
    
    <div className="container my-4">
      <h2 className="mb-4">
        <span role="img" aria-label="orders">🛍️</span> My Orders
      </h2>

      {orders.map((order, index) => (
        <div className="card mb-3 shadow-sm" key={index}>
          <div className="card-body">
            <div className="row align-items-center">
              {/* Left Side: Order Info */}
              <div className="col-md-8 col-sm-12">
                <p className="mb-1">
                  <strong>🔖 Order #{order.id}</strong>
                </p>
                <p className="mb-1">
                  📅 Placed on: {order.date}
                </p>
                <p className="mb-2">
                  <strong>Items:</strong> {order.items.length}
                  <br />
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} (x{item.quantity}){i < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <button className="btn btn-outline-primary btn-sm">View Details</button>
              </div>

              {/* Right Side: Status and Total */}
              <div className="col-md-4 col-sm-12 text-md-end mt-3 mt-md-0">
                <span
                  className={`badge bg-${statusVariant[order.status.toLowerCase()] || 'secondary'} fs-6`}
                >
                  {order.status}
                </span>
                <p className="mt-2 mb-0 fs-5 fw-bold">
                  Total: ₹{order.total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
