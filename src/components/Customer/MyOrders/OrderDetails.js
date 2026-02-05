import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from "../../Customer/WhatsApp/WhatApp";
import { db } from "../../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { Table } from 'react-bootstrap';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion, setDoc
} from "firebase/firestore";
import { useAuth } from '../../AuthContext/AuthContext';
import { GrLocation } from "react-icons/gr";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceDocument from "./InvoiceDocument";
import "./OrderDetails.css";
import baseURL from "../../Api/Api";

function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);
}

function OrderDetails() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);

  useEffect(() => {
    if (location.state?.openFeedback) {
      setShowFeedbackModal(true);
    }
  }, [location.state]);

  const fetchOrder = async () => {
    try {
      const ordersResponse = await fetch(`${baseURL}/api/orders`);
      const ordersData = await ordersResponse.json();
      const matchedOrder = ordersData.find(order => order.order_id === orderId);

      if (!matchedOrder) {
        console.warn("Order not found");
        return;
      }

      const orderItemsResponse = await fetch(`${baseURL}/api/order-items/${orderId}`);
      const orderItemsData = await orderItemsResponse.json();

      const itemsWithFullImageUrls = orderItemsData.map(item => ({
        ...item,
        image: item.image.startsWith('http') ? item.image : `${baseURL}${item.image}`
      }));

      const addressResponse = await fetch(`${baseURL}/api/order-address/${orderId}`);
      const addressData = await addressResponse.json();
      console.log("addressData=", addressData)

      const shippingAddress = addressData?.data || {
        fullName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        label: ""
      };

      let customerData = {};
      if (matchedOrder.user_id) {
        try {
          const customerResponse = await fetch(`${baseURL}/api/orders/customer/${matchedOrder.user_id}`);
          const customerOrders = await customerResponse.json();

          customerData = {
            fullName: customerOrders?.fullName || "Customer Name",
            email: customerOrders?.email || "customer@example.com",
            phone: customerOrders?.phone || "1234567890"
          };
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }

      // Final order data
      setOrderData({
        ...matchedOrder,
        orderId: matchedOrder.order_id,
        paymentStatus: matchedOrder.payment_status,
        status: matchedOrder.status,
        feedback: matchedOrder.feedback,
        createdAt: matchedOrder.created_at,
        items: itemsWithFullImageUrls,
        shippingAddress: shippingAddress,
        customer: customerData,
        statusHistory: [
          {
            status: matchedOrder.status,
            createdAt: matchedOrder.created_at
          }
        ]
      });

      setOrderItems(itemsWithFullImageUrls);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };


  useEffect(() => {
    fetchOrder();
  }, [orderId, baseURL]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
          userId: currentUser.uid,
          userName: currentUser.fullName,
          rating,
          comment,
          complaintText,
          items: orderData.items, // Assuming each item has a `product_id`
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowFeedbackModal(false);
        alert('Thank you for your feedback!');
        fetchOrder(); // Refresh order status
      } else {
        console.error('Backend error:', result.message);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };


  if (!orderData) {
    return (
      <>
        <Header />
        <Container className="py-4 text-center">
          <h4>Loading order details...</h4>
        </Container>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal(orderData.items || []);
  const shippingCharge = Number(orderData.shipping_price) || 0;
  const codCharges= Number(orderData.cod_charges) || 0;
  const discountAmt= Number(orderData.discount_amt) || 0;
  const total = subtotal + shippingCharge + codCharges - (Number(orderData.discount_amt) || 0);
  const address = orderData.shippingAddress || {};

  const statusColors = {
    Pending: "warning",
    Processing: "info",
    Shipped: "primary",
    Delivered: "success",
    Cancelled: "danger",
  };

  return (
    <>
      <Header />
      <WhatApp />
      <div className="container py-4 order-details-page">
        <div className="bg-light rounded p-3 mb-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/myorders")}
              >
                ← Back to My Orders
              </button>
            </div>
            <div className="flex-grow-1 text-center">
              <h3 className="mb-0">Order Details</h3>
            </div>
            <div className="d-flex gap-2">
              <PDFDownloadLink
                document={<InvoiceDocument orderData={orderData} 
                subtotal={subtotal} 
                shippingCharge={shippingCharge} 
                codCharges={codCharges}
                discountAmt={discountAmt}
                total={total} 

                />}
                fileName={`Invoice_${orderData.orderId}.pdf`}
                className="btn btn-outline-secondary"
              >
                {({ loading }) => (loading ? 'Preparing document...' : '⬇ Download Invoice')}
              </PDFDownloadLink>
              {orderData.status === "Delivered" &&
                (orderData.feedback ? (
                  <div
                    style={{
                      backgroundColor: "#e6f4ea",
                      color: "#137333",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      fontWeight: "500",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      style={{ marginRight: "8px" }}
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 11.5l5-5-1.4-1.4L7 8.7 5.4 7.1 4 8.5l3 3z" />
                    </svg>
                    Feedback Submitted
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    Leave Feedback
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <h5 className="fw-semibold mb-1">
                Order ID:{" "}
                <span className="text-primary">#{orderData.orderId}</span>
              </h5>
              <small className="text-muted">
                Last updated:{" "}
                {orderData.createdAt
                  ? new Date(orderData.createdAt.replace(' ', 'T'))
                    .toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })
                    .replace(/am|pm/i, match => match.toUpperCase())
                  : "N/A"}

              </small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <span
                className={`badge bg-${statusColors[orderData.status] || "secondary"} mb-2 px-3 py-2 fs-6`}
              >
                {orderData.status}
              </span>
              <br />
              <small className="text-muted">
                Placed on:{" "}
                {orderData.createdAt
                  ? new Date(orderData.createdAt.replace(' ', 'T'))
                    .toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })
                    .replace(/am|pm/i, match => match.toUpperCase())
                  : "N/A"}
              </small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">💳 Payment Information</h5>
                <p className="mb-0">
                  Payment Status:{" "}
                  <span className="badge bg-success px-3 py-2">
                    {orderData.paymentStatus}
                  </span>
                </p>
                <p className="mb-0">
                  Total Paid: ₹{orderData.payment_amount || total.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col-12 col-lg-7 mb-4 mb-lg-0">
              <div className="card shadow-sm h-100 order-items-scroll">
                <div className="card-body">
                  <h5 className="card-title mb-3">📦 Order Items</h5>
                  {orderData.items?.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-3 border-bottom pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/80?text=No+Image";
                        }}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "1rem",
                        }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                        <small>
                          Qty: {item.quantity} · {item.weight || "N/A"}
                        </small>
                        <br />
                        <small>
                          Price: ₹{Number(item.price).toFixed(2)} each
                        </small>
                      </div>
                      <div className="ms-auto fw-bold">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="pt-0">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span>₹{shippingCharge.toFixed(2)}</span>
                    </div>
                    {orderData.cod_charges && (
                    <div className="d-flex justify-content-between">
                      <span>COD Charge:</span>
                      <span>₹{codCharges.toFixed(2)}</span>
                    </div>
                    )}
                    {orderData.discount_amt && (
                      <div className="d-flex justify-content-between">
                        <span>Discount:</span>
                        <span>-₹{Number(orderData.discount_amt).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
                      <span>Total:</span>
                      <strong>₹{total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 d-flex flex-column gap-4">
              <div className="card shadow-sm">
                <div className="my-orders-card-body">
                  <h5 className="card-title mb-3">
                    <GrLocation style={{ marginRight: "0.5rem" }} /> Shipping Address
                  </h5>
                  <p className="mb-1 mt-2">{address.addressLine1}</p>
                  <p className="mb-1 mt-2">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                  <p className="mb-1 mt-2">{address.country}</p>
                </div>
              </div>

              {(orderData.feedbackRating || orderData.feedbackComment || (orderData.complaints?.length > 0)) && (
                <div className="card shadow-sm">
                  <div className="my-orders-card-body">
                    <h5 className="card-title mb-3">📄 Feedback</h5>

                    {orderData.feedbackRating && (
                      <div className="mb-3">
                        <strong>Rating: </strong>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < orderData.feedbackRating ? '#ffc107' : '#e4e5e9' }}>
                            ★
                          </span>
                        ))}
                        <span className="ms-2">({orderData.feedbackRating}/5)</span>
                      </div>
                    )}

                    {orderData.feedbackComment && (
                      <div className="feedback-comment mb-3">
                        <strong>Comment: </strong>
                        <span style={{ whiteSpace: 'pre-wrap' }}>
                          {orderData.feedbackComment}
                        </span>
                      </div>
                    )}

                    {orderData.complaints?.length > 0 && (
                      <div className="complaints-section">
                        <strong>Complaints: </strong>
                        <button
                          onClick={() => setShowComplaintsModal(true)}
                          className="btn btn-link p-0 ms-2"
                          style={{ textDecoration: 'none' }}
                        >
                          View
                        </button>
                        {orderData.complaints.length > 2 && (
                          <ul className="mt-2 list-unstyled">
                            <li>
                              <button
                                onClick={() => setShowComplaintsModal(true)}
                                className="btn btn-link p-0"
                              >
                                + {orderData.complaints.length - 2} more
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Modal show={showComplaintsModal} onHide={() => setShowComplaintsModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>All Complaints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Date</th>
                    <th>Complaint</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.complaints?.map((complaint, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(complaint.date).toLocaleString()}</td>
                      <td style={{ whiteSpace: 'pre-wrap' }}>{complaint.text}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setShowComplaintsModal(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>

          <div className="col-lg-12">
            {orderData.statusHistory?.length > 0 && (
              <div className="card shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">⏰ Order Status History</h5>

                  {orderData.awbCode && (
                    <p className="mb-3" style={{ fontSize: "0.95rem", color: "#444" }}>
                      📦 <strong>Track ID:</strong> {orderData.awbCode}
                    </p>
                  )}

                  {orderData.statusHistory
                    .map((entry, index) => {
                      const badgeColor =
                        {
                          Pending: "warning",
                          Processing: "info",
                          Shipped: "primary",
                          Delivered: "success",
                          Cancelled: "danger",
                        }[entry.status] || "secondary";

                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                        >
                          <span className={`badge bg-${badgeColor} px-3 py-2`}>
                            {entry.status}
                          </span>
                          <small className="text-muted">{orderData.createdAt
                            ? new Date(orderData.createdAt.replace(' ', 'T'))
                              .toLocaleString('en-GB', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                second: '2-digit',
                                hour12: true,
                              })
                              .replace(/am|pm/i, match => match.toUpperCase())
                            : "N/A"}</small>
                        </div>
                      );
                    })}

                </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          show={showFeedbackModal}
          onHide={() => setShowFeedbackModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Rate & Provide Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rate your experience:</label>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={starValue}
                        size={24}
                        color={
                          starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                        }
                        style={{ cursor: "pointer", marginRight: 8 }}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Comment:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Leave a Complaint:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                />
              </div>

              <div className="text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="ms-2">
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;