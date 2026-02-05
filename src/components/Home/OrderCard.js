import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderCard.css';

const OrderCard = ({ orderId, date, items, total, status }) => {
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-success bg-opacity-25 text-success';
      case 'shipped':
        return 'bg-primary bg-opacity-25 text-primary';
      case 'processing':
        return 'bg-warning bg-opacity-25 text-warning';
      default:
        return 'bg-secondary bg-opacity-25 text-dark';
    }
  };

  return (
    <div className="card shadow-sm my-3 order-card-bootstrap">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">
            <span role="img" aria-label="tag">🏷️</span> <strong>Order #{orderId}</strong>
          </h5>
          <span className={`badge rounded-pill px-3 py-2 ${getStatusClass(status)}`}>
            {status}
          </span>
        </div>

        <p className="text-muted mb-1">📅 Placed on: {date}</p>
        <p className="mb-2"><strong>Items:</strong> {items}</p>

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <button className="btn btn-outline-warning view-details-btn mb-2 mb-sm-0">
            View Details
          </button>
          <div className="text-dark fw-bold fs-6">Total: ₹{total}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
