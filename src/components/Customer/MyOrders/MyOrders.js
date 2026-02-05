import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhatApp from '../../Customer/WhatsApp/WhatApp';
import { useAuth } from '../../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css';
import { Container } from 'react-bootstrap';
import Loading from '../../Loading/Loading';
import baseURL from "../../Api/Api";
import axios from 'axios';

function MyOrders() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);


    const fetchCurrentUserOrders = async () => {
        try {
            if (!currentUser?.uid) return;

            // Fetch customer orders
            const ordersResponse = await fetch(`${baseURL}/api/orders/customer/${currentUser.uid}`);
            const ordersData = await ordersResponse.json();

            // Process each order to get order items
            const processedOrders = await Promise.all(
                ordersData.map(async (order) => {
                    // Fetch order items for each order
                    const itemsResponse = await fetch(`${baseURL}/api/order-items/${order.order_id}`);
                    const itemsData = await itemsResponse.json();

                    return {
                        orderId: order.order_id,
                        items: itemsData.map(item => ({
                            id: item.product_id,
                            name: item.name,
                            price: parseFloat(item.price),
                            original_price: parseFloat(item.original_price),
                            quantity: parseInt(item.quantity),
                            image: item.image,
                            weight: item.weight
                        })),
                        status: order.status || 'pending',
                        feedback: order.feedback,
                        createdAt: order.created_at,
                        tracking_id: order.tracking_id,
                        shipment_id: order.shipment_id,
                        shiprocket_order_id: order.shiprocket_order_id,
                        awbCode: order.awb_code || 'N/A',
                        paymentAmount: parseFloat(order.payment_amount) || 0 // <-- Add this line
                    };

                })
            );

            // Sort orders by date (newest first)
            processedOrders.sort((a, b) => b.createdAt - a.createdAt);
            setOrders(processedOrders);
        } catch (error) {
            console.error('Error fetching current user orders:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCurrentUserOrders();
    }, [currentUser]);

    const statusVariant = {
        delivered: 'success',
        shipped: 'primary',
        pending: 'warning',
        cancelled: 'danger',
        processing: 'info',
    };

    const handleViewClick = (orderId) => {
        navigate(`/ordersDetails/${orderId}`);
    };
    const handleTrackViewClick = (orderId) => {
        navigate(`/trackingordersDetails/${orderId}`);
    };

    // const handleCancelOrder = async (shiprocketOrderId) => {
    //     const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    //     if (!confirmCancel) return;

    //     try {
    //         const response = await axios.post(`${baseURL}/api/cancel-order`, {
    //             ids: [shiprocketOrderId] // Send as an array
    //         });

    //         if (response.data.success) {
    //             alert('Order cancelled successfully');
    //             fetchCurrentUserOrders(); // Refresh the order list
    //         } else {
    //             alert('Failed to cancel order');
    //         }
    //     } catch (error) {
    //         console.error('Cancel Order Error:', error);
    //         alert('Error cancelling order');
    //     }
    // };


    if (!currentUser) {
        return (
            <>
                <Header />
                <WhatApp />
                <Container className="wishlist-page-container">
                    <h2 className="wishlist-page-title fw-bold mb-4">Please log in to view your Orders</h2>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Loading isLoading={loading} />
            <Header />
            <WhatApp />
            <div className="container my-orders-container">
                <h2 className="mb-4 main-heading">🛍️ My Orders</h2>
                {orders.length === 0 ? (
                    <div className="text-center my-orders-empty">
                        <h4>😕 No Orders Found</h4>
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="row">
                        {orders.map((order, index) => (
                            <div className="col-md-6 col-sm-12 mb-4" key={index}>
                                <div className="card shadow-sm my-orders-card h-100">
                                    <div className="my-orders-card-body">
                                        <h6 className="my-orders-id">🔖 Order #{order.orderId}</h6>
                                        {/* {order.awbCode && order.awbCode !== 'N/A' && ( */}
                                        <p className="awb-code" style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#555' }}>
                                            📦 Track ID: {order.tracking_id}
                                        </p>
                                        {/* )} */}

                                        <p className="text-muted my-orders-date">
                                            📅 Placed on: {new Date(order.createdAt.replace(' ', 'T')).toLocaleString('en-GB', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true,
                                            }).replace(',', ' at').replace(/am|pm/i, match => match.toUpperCase())}
                                        </p>

                                        <div className="my-orders-items mb-2">
                                            <strong>Items:</strong> {order.items.length}
                                            <ul className="mb-1 ps-3">
                                                {order.items.map((item, i) => (
                                                    <li key={i} className="my-orders-item">
                                                        {item.name} (x{item.quantity})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p className="mb-0 fs-5 fw-bold my-orders-total">
                                                Total: ₹{order.paymentAmount.toFixed(2)}
                                            </p>


                                            <span
                                                className={`badge bg-${statusVariant[order.status.toLowerCase()] || 'info'} 
                                                fs-6 my-orders-status 
                                                ${['pending', 'processing'].includes(order.status.toLowerCase()) ? 'text-dark' : ''}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="d-flex justify-content-between mt-3 flex-wrap gap-2">
                                            <button
                                                className="btn btn-outline-success btn-sm my-orders-view-btn"
                                                onClick={() => handleViewClick(order.orderId)}
                                            >
                                                View Details
                                            </button>

                                            <button
                                                className="btn btn-outline-primary btn-sm my-orders-view-btn"
                                                onClick={() => handleTrackViewClick(order.orderId)}
                                            >
                                                Tracking
                                            </button>

                                            {/* {order.status.toLowerCase() !== 'cancelled' &&
                                                order.status.toLowerCase() !== 'delivered' && (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm my-orders-cancel-btn"
                                                        onClick={() => handleCancelOrder(order.shiprocket_order_id)}
                                                    >
                                                        Cancel Order
                                                    </button>
                                                )} */}

                                            {order.status.toLowerCase() === 'delivered' && (
                                                order.feedback ? (
                                                    <div style={{
                                                        backgroundColor: '#e6f4ea',
                                                        color: '#137333',
                                                        padding: '6px 12px',
                                                        borderRadius: '6px',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        fontSize: '14px',
                                                        fontWeight: '500'
                                                    }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 11.5l5-5-1.4-1.4L7 8.7 5.4 7.1 4 8.5l3 3z" />
                                                        </svg>
                                                        Feedback Submitted
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="btn btn-outline-primary btn-sm my-orders-feedback-btn"
                                                        onClick={() => navigate(`/ordersDetails/${order.orderId}`, { state: { openFeedback: true } })}
                                                    >
                                                        Leave Feedback
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MyOrders;