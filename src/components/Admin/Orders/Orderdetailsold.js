import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { db } from '../../Firebase/firebase';
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { GrLocation } from "react-icons/gr";
import './OrderDetails.css'; // ⬅️ Import your custom CSS here
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Modal, Table } from 'react-bootstrap';
import Loading from '../../Loading/Loading';

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
            const ordersCol = collection(db, 'orders');
            const ordersSnapshot = await getDocs(ordersCol);

            for (const userDoc of ordersSnapshot.docs) {
                const userId = userDoc.id;
                const userOrdersObj = userDoc.data();

                const matchedOrder = Object.values(userOrdersObj).find(
                    (order) => order?.orderId === orderId
                );

                if (matchedOrder) {
                    const customerDoc = await getDoc(doc(db, 'customers', userId));
                    const customerData = customerDoc.exists() ? customerDoc.data() : {};

                    // Fetch status history
                    const statusDoc = await getDoc(doc(db, 'order_status', orderId));
                    const statusData = statusDoc.exists() ? statusDoc.data() : {};
                    const statusHistory = statusData.statusHistory || [];

                    // Fetch feedback and complaints
                    const feedbackData = matchedOrder;
                    const complaints = feedbackData?.complaints || [];

                    setOrderData({
                        ...matchedOrder,
                        userId,
                        statusHistory,
                        complaints,
                        customer: {
                            fullName: customerData.fullName || matchedOrder?.shippingAddress?.fullName || 'N/A',
                            email: customerData.email || matchedOrder?.shippingAddress?.email || 'N/A',
                            phone: customerData.phone || matchedOrder?.shippingAddress?.phone || 'N/A',
                        },
                        items: matchedOrder?.items || [] // Ensure items is always an array
                    });
                    return;
                }
            }

            console.warn("Order not found");
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
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
    const total = subtotal + shippingCharge;
    const address = orderData.shippingAddress || {};

    const handleStatusChange = async (newStatus) => {
        if (!orderData) return;

        const { userId, orderId } = orderData;

        try {
            const orderRef = doc(db, 'orders', userId);
            const userOrderSnapshot = await getDoc(orderRef);
            if (userOrderSnapshot.exists()) {
                const userOrders = userOrderSnapshot.data();
                const updatedOrders = { ...userOrders };
                updatedOrders[orderId].status = newStatus;
                await updateDoc(orderRef, updatedOrders);
            }

            const statusRef = doc(db, 'order_status', orderId);
            await updateDoc(statusRef, {
                statusHistory: arrayUnion({
                    status: newStatus,
                    timestamp: new Date()
                })
            });

            setOrderData(prev => ({
                ...prev,
                status: newStatus
            }));

            // ✅ Show success alert
            alert(`Order Status updated to ${newStatus}`);
            fetchOrder();

        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const generateInvoicePDF = () => {
        if (!orderData) return;

        const pdfDoc = new jsPDF();
        const { orderId, createdAt, items, customer, shippingAddress, paymentStatus } = orderData;
        const subtotal = calculateSubtotal(items || []);
        const shippingCharge = Number(orderData.shippingCharge) || 0;
        const total = subtotal + shippingCharge;

        pdfDoc.setFontSize(16);
        pdfDoc.setTextColor(255, 87, 34);
        pdfDoc.text('SutraCart', 14, 20);
        pdfDoc.setFontSize(10);
        pdfDoc.setTextColor(0);
        pdfDoc.text('Authentic Masala Pastes', 14, 26);

        pdfDoc.setFontSize(12);
        pdfDoc.text(`INVOICE`, 160, 20);
        pdfDoc.setFontSize(10);
        pdfDoc.text(`Order ID: ${orderId}`, 160, 26);
        pdfDoc.text(`Date: ${createdAt?.toDate?.().toLocaleDateString()}`, 160, 32);

        const billing = [
            customer.fullName || 'Customer',
            shippingAddress?.addressLine1 || '',
            `${shippingAddress?.city}, ${shippingAddress?.state} - ${shippingAddress?.postalCode}`,
            shippingAddress?.country,
            `Email: ${customer.email}`,
            `Phone: ${customer.phone}`
        ];

        pdfDoc.setFontSize(11);
        pdfDoc.text("BILL TO:", 14, 45);
        billing.forEach((line, i) => pdfDoc.text(line, 14, 51 + i * 6));
        pdfDoc.text("SHIP TO:", 105, 45);
        billing.forEach((line, i) => pdfDoc.text(line, 105, 51 + i * 6));

        const tableRows = items.map((item, idx) => [
            idx + 1,
            item.name + (item.weight ? `\n${item.weight}` : ''),
            item.quantity,
            `${Number(item.price).toFixed(2)}`,
            `${(item.quantity * Number(item.price)).toFixed(2)}`
        ]);

        autoTable(pdfDoc, {
            head: [['#', 'Item', 'Qty', 'Unit Price', 'Total']],
            body: tableRows,
            startY: 100,
            styles: { fontSize: 10 },
            theme: 'striped'
        });

        const finalY = pdfDoc.lastAutoTable.finalY || 100;

        pdfDoc.setFontSize(10);
        pdfDoc.text(`Subtotal: ${subtotal.toFixed(2)}`, 160, finalY + 10, { align: 'right' });
        pdfDoc.text(`Shipping: ${shippingCharge.toFixed(2)}`, 160, finalY + 16, { align: 'right' });

        pdfDoc.setFontSize(12);
        pdfDoc.setTextColor(255, 87, 34);
        pdfDoc.text(`Grand Total: ${total.toFixed(2)}`, 160, finalY + 26, { align: 'right' });

        pdfDoc.setFontSize(11);
        pdfDoc.setTextColor(0);
        pdfDoc.text(`Payment Status: ${paymentStatus}`, 14, finalY + 26);

        pdfDoc.save(`Invoice.pdf`);
    };




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
                            {/* <button className="btn btn-outline-secondary" onClick={generateInvoicePDF}>
                                ⬇ Download Invoice
                            </button> */}

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
                                <Card.Body>
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
                                    <div className="d-flex justify-content-between fw-semibold mt-3">
                                        <span>Subtotal:</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between fw-semibold">
                                        <span>Shipping:</span>
                                        <span>₹{shippingCharge.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between fs-5 mt-2 total-row">
                                        <strong>Total:</strong>
                                        <strong>₹{total.toFixed(2)}</strong>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            {/* <Card className="custom-card mb-4">
                                <Card.Header><strong>👤 Customer Info</strong></Card.Header>
                                <Card.Body>
                                    <p className="mb-0"><strong>Name:</strong> {orderData.customer.fullName}</p>
                                    <p className="mb-0"><strong>Email:</strong> {orderData.customer.email}</p>
                                    <p className="mb-0"><strong>Phone:</strong> {orderData.customer.phone}</p>
                                </Card.Body>
                            </Card> */}

                            <Card className="custom-card mb-4">
                                <Card.Header><GrLocation style={{ marginRight: "0.5rem" }} /><strong>Shipping Address</strong></Card.Header>
                                <Card.Body>
                                    <p className="mb-0"><strong>Name:</strong> {orderData.customer.fullName}</p>
                                    {/* <p className="mb-0"><strong>Email:</strong> {orderData.customer.email}</p> */}
                                    <p className="mb-0"><strong>Phone:</strong> {orderData.customer.phone}</p>
                                    <p className="mb-0">{address.addressLine1}</p>
                                    {address.addressLine2 && <p className="mb-0">{address.addressLine2}</p>}
                                    <p className="mb-0">{address.city}, {address.state} - {address.postalCode}</p>
                                    <p className="mb-0">{address.country}</p>
                                </Card.Body>
                            </Card>

                            <Card className="custom-card">
                                <Card.Header><strong>📄 Order Summary</strong></Card.Header>
                                <Card.Body>
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
                                                    <strong>Created:</strong> {orderData.createdAt?.toDate?.().toLocaleString() || 'N/A'}
                                                </p>
                                            </>
                                        );
                                    })()}
                                </Card.Body>
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
                                        .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds) // sort by time
                                        .map((entry, index) => {
                                            const dateObj = entry.timestamp?.toDate?.();
                                            const formattedDate = dateObj?.toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric',
                                            });
                                            const formattedTime = dateObj?.toLocaleTimeString('en-US', {
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

                                            // Apply text-dark only for 'Pending' and 'Processing'
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
