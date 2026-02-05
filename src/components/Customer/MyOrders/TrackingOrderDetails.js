import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import { FaStar, FaShippingFast  } from "react-icons/fa";
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

            // 🔄 Fetch tracking details
            let trackingData = null;
            if (matchedOrder.shipment_id) {
                try {
                    const trackingResponse = await fetch(`${baseURL}/api/track-shipment/${matchedOrder.shipment_id}`);
                    const trackingResult = await trackingResponse.json();

                    trackingData = trackingResult.tracking_data || null;
                    console.log("Tracking Info=", trackingData)
                } catch (trackingError) {
                    console.error("Error fetching tracking data:", trackingError);
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
                tracking_id: matchedOrder.tracking_id,
                shipment_id: matchedOrder.shipment_id,
                shiprocket_order_id: matchedOrder.shiprocket_order_id,
                trackingData: trackingData, // ⬅️ Include tracking data here
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
    const total = subtotal + shippingCharge - (Number(orderData.discount_amt) || 0);
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
                            {orderData?.trackingData?.shipment_track?.length > 0 && (
                                <div className="card shadow-sm">
                                    <div className="my-orders-card-body">
                                        <h5 className="card-title mb-3">
                                            <FaShippingFast  style={{ marginRight: "0.5rem" }} /> Tracking Information
                                        </h5>

                                        <p className="mb-1"><strong>Status:</strong> {orderData.trackingData.shipment_track[0].current_status}</p>
                                        <p className="mb-1">
                                            <strong>Origin:</strong> {orderData.trackingData.shipment_track[0].origin}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Destination:</strong> {orderData.trackingData.shipment_track[0].destination}
                                        </p> 
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OrderDetails;