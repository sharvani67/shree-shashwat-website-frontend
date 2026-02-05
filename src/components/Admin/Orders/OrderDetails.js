import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { GrLocation } from "react-icons/gr";
import './OrderDetails.css';
import { Modal, Table } from 'react-bootstrap';
import Loading from '../../Loading/Loading';
import InvoiceDocument from "./InvoiceDocument";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Swal from 'sweetalert2';
import axios from 'axios';
import baseURL from "../../Api/Api";


function calculateSubtotal(items) {
    return items.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        return sum + price * item.quantity;
    }, 0);
}

function OrderDetails() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [showComplaintsModal, setShowComplaintsModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        setLoading(true);
        try {
            // Fetch order details
            const orderResponse = await axios.get(`${baseURL}/api/orders`);
            const matchedOrder = orderResponse.data.find(order => order.order_id === orderId);

            if (!matchedOrder) {
                throw new Error('Order not found');
            }

            // Fetch order items
            const itemsResponse = await axios.get(`${baseURL}/api/order-items/${orderId}`);
            const items = itemsResponse.data;

            // Fetch customer details
            const customerResponse = await axios.get(`${baseURL}/customers/${matchedOrder.user_id}`);
            const customerData = customerResponse.data;

            // Fetch order address
            let shippingAddress = {
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            };
            try {
                const addressResponse = await axios.get(`${baseURL}/api/order-address/${orderId}`);
                if (addressResponse.data.success && addressResponse.data.data) {
                    shippingAddress = addressResponse.data.data;
                }
                console.log("shippingAddress=", shippingAddress)
            } catch (err) {
                console.warn(`No shipping address found for order ${orderId}.`);
            }

            // Generate status history (can be enhanced later)
            const statusHistory = [
                {
                    status: matchedOrder.status,
                    timestamp: new Date(matchedOrder.created_at)
                }
            ];

            // Set the complete order data
            setOrderData({
                ...matchedOrder,
                orderId: matchedOrder.order_id,
                items: items.map(item => ({
                    ...item,
                    price: parseFloat(item.price),
                    quantity: item.quantity
                })),
                customer: customerData,
                statusHistory,
                complaints: [], // Add complaint logic if needed
                shippingAddress: shippingAddress,
                shippingCharge: matchedOrder.shipping_price ? parseFloat(matchedOrder.shipping_price) : 0,
                createdAt: matchedOrder.created_at
            });

        } catch (error) {
            console.error('Error fetching order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to fetch order details',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };



    const handleStatusChange = async (newStatus) => {
        if (!orderData) return;

        try {
            // Update order status in backend
            await axios.patch(`${baseURL}/api/orders/${orderId}`, {
                status: newStatus
            });

            // Update local state
            setOrderData(prev => ({
                ...prev,
                status: newStatus,
                statusHistory: [
                    ...prev.statusHistory,
                    {
                        status: newStatus,
                        timestamp: new Date()
                    }
                ]
            }));

            await Swal.fire({
                icon: 'success',
                title: `Order status updated to "${newStatus}"`,
                confirmButtonText: 'OK'
            });

            // Refresh order data
            fetchOrder();

        } catch (error) {
            console.error("Failed to update order status:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to update order status',
                text: error.message || 'Something went wrong!',
                confirmButtonText: 'OK'
            });
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    if (loading || !orderData) {
        return (
            <>
                <Loading isLoading={loading} />
            </>
        );
    }

    const subtotal = calculateSubtotal(orderData.items || []);
    const shippingCharge = parseFloat(orderData.shippingCharge || 0);
    const codCharges = Number(orderData.cod_charges) || 0;
    const discountAmt = Number(orderData.discount_amt) || 0;
    const total = subtotal + shippingCharge + codCharges - discountAmt;
    const address = orderData.shippingAddress || {};

    return (
        <>
            <Header />

            <Container className="py-4 mt-4 order-details-container">
                <Container className='maindiv py-4 mt-4 order-details-container'>
                    <Row className="align-items-center justify-content-between mb-4">
                        <Col>
                            <h3 className="order-title">
                                Order: <span className="order-id">#{orderData.orderId}</span>
                            </h3>
                        </Col>

                        <Col md="auto" className="d-flex gap-3 justify-content-end align-items-center">
                            <PDFDownloadLink
                                document={<InvoiceDocument
                                    orderData={orderData}
                                    subtotal={subtotal}
                                    shippingCharge={shippingCharge}
                                    codCharges={codCharges}
                                    discountAmt={discountAmt}
                                    total={total}
                                />}
                                fileName={`Invoice_${orderData.orderId}.pdf`}
                            >
                                {({ loading }) => (
                                    <button className="btn btn-outline-secondary" disabled={loading}>
                                        {loading ? 'Generating...' : '⬇ Download Invoice'}
                                    </button>
                                )}
                            </PDFDownloadLink>

                            <select
                                value={orderData.status}
                                onChange={(e) => handleStatusChange(e.target.value)}
                                className="form-select order-status-dropdown"
                            >
                                <option value="Pending" disabled={orderData.status !== 'Pending'}>
                                    Pending
                                </option>
                                <option value="Processing" disabled={orderData.status !== 'Pending'}>
                                    Processing
                                </option>
                                <option value="Shipped" disabled={orderData.status !== 'Processing'}>
                                    Shipped
                                </option>
                                <option value="Delivered" disabled={orderData.status !== 'Shipped'}>
                                    Delivered
                                </option>
                                <option value="Cancelled">
                                    Cancelled
                                </option>
                            </select>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={8}>
                            <Card className="custom-card mb-4">
                                <Card.Header><strong>📦 Order Items</strong></Card.Header>
                                <div className='my-orders-card-body'>
                                    {orderData.items?.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <strong>{item.name}</strong> (x{item.quantity})<br />
                                                    <small>Price:  ₹{Number(item.price).toFixed(2)}</small><br />
                                                    {item.weight && <small>Weight: {item.weight}</small>}
                                                </div>
                                                <div className="text-end">
                                                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                    <div className="d-flex justify-content-between mt-3 mb-1">
                                        <span>Subtotal:</span>
                                        <span>₹{orderData.total_price}</span>
                                    </div>
                                    <div className="d-flex justify-content-between  mb-1">
                                        <span>Shipping:</span>
                                        <span>₹{orderData.shipping_price}</span>
                                    </div>
                                    {orderData.cod_charges && (
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>COD Charge:</span>
                                            <span>₹{codCharges.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {orderData.discount_amt && (
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>Discount:</span>
                                            <span>- ₹{orderData.discount_amt}</span>
                                        </div>
                                    )}
                                    <div className="d-flex justify-content-between fs-5 mt-2 total-row">
                                        <strong>Total:</strong>
                                        <strong>₹{orderData.payment_amount}</strong>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card className="custom-card mb-4">
                                <Card.Header><GrLocation style={{ marginRight: "0.5rem" }} /><strong>Shipping Address</strong></Card.Header>
                                <div className='my-orders-card-body'>
                                    <p className="mb-0"><strong>Name:</strong> {orderData.customer.fullName}</p>
                                    <p className="mb-0"><strong>Phone:</strong> {orderData.customer.phone}</p>
                                    <p className="mb-0">{orderData.shippingAddress.addressLine1}</p>
                                    {orderData.shippingAddress.addressLine2 && <p className="mb-0">{orderData.shippingAddress.addressLine2}</p>}
                                    <p className="mb-0">{orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.postalCode}</p>
                                    <p className="mb-0">{orderData.shippingAddress.country}</p>
                                </div>
                            </Card>

                            <Card className="custom-card">
                                <Card.Header><strong>📄 Order Summary</strong></Card.Header>
                                <div className='my-orders-card-body'>
                                    {(() => {
                                        const badgeColor = {
                                            'Pending': 'warning',
                                            'Processing': 'info',
                                            'Shipped': 'primary',
                                            'Delivered': 'success',
                                            'Cancelled': 'danger'
                                        }[orderData.status] || 'secondary';
                                        const textColorClass = (orderData.status === 'Pending' || orderData.status === 'Processing') ? 'text-dark' : '';
                                        return (
                                            <>
                                                <p className="mb-0">
                                                    <strong>Status:</strong> <Badge bg={badgeColor} className={`${textColorClass}`}>{orderData.status}</Badge>
                                                </p>
                                                <p className="mb-0">
                                                    <strong>Created:</strong>
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
                                                </p>
                                            </>
                                        );
                                    })()}
                                </div>
                            </Card>
                            {(orderData.feedbackRating || orderData.feedbackComment || (orderData.complaints && orderData.complaints.length > 0)) && (
                                <Card className="custom-card mt-4">
                                    <Card.Header><strong>📄 Customer Feedback</strong></Card.Header>
                                    <Card.Body>
                                        {orderData.feedbackRating || orderData.feedbackComment || (orderData.complaints && orderData.complaints.length > 0) ? (
                                            <>
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
                                                {orderData.complaints && orderData.complaints.length > 0 && (
                                                    <div className="complaints-section">
                                                        <strong>Complaints: </strong>
                                                        <button
                                                            onClick={() => setShowComplaintsModal(true)}
                                                            className="btn btn-link p-0 ms-2"
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            View
                                                        </button>
                                                        <ul className="mt-2 list-unstyled">
                                                            {orderData.complaints.length > 2 && (
                                                                <li>
                                                                    <button
                                                                        onClick={() => setShowComplaintsModal(true)}
                                                                        className="btn btn-link p-0"
                                                                    >
                                                                        + {orderData.complaints.length - 2} more
                                                                    </button>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-muted">No feedback or complaints provided yet</p>
                                        )}
                                    </Card.Body>
                                </Card>
                            )}
                            {/* Complaints Modal */}
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
                        </Col>
                    </Row>

                    <Row>
                        {orderData.statusHistory && (
                            <Card className="custom-card mt-4">
                                <Card.Header>
                                    <span role="img" aria-label="clock" className="me-2">⏰</span>
                                    <strong>Order Status History</strong>
                                </Card.Header>
                                <Card.Body>
                                    {orderData.statusHistory
                                        .sort((a, b) => a.timestamp - b.timestamp)
                                        .map((entry, index) => {
                                            const formattedDate = entry.timestamp.toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            });
                                            const formattedTime = entry.timestamp.toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true,
                                            });

                                            const badgeColor = {
                                                'Pending': 'warning',
                                                'Processing': 'info',
                                                'Shipped': 'primary',
                                                'Delivered': 'success',
                                                'Cancelled': 'danger'
                                            }[entry.status] || 'secondary';

                                            const textColorClass = (entry.status === 'Pending' || entry.status === 'Processing') ? 'text-dark' : '';

                                            return (
                                                <div key={index} className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
                                                    <Badge bg={badgeColor} className={`px-3 py-1 ${textColorClass}`}>
                                                        {entry.status}
                                                    </Badge>
                                                    <small className="text-muted">{formattedDate}, {formattedTime}</small>
                                                </div>
                                            );
                                        })}
                                </Card.Body>
                            </Card>
                        )}
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    );
}

export default OrderDetails;