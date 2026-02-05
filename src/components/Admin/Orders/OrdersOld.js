import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Badge, Button, Card, Form, Nav, Pagination } from 'react-bootstrap';
import { db } from '../../Firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import Loading from '../../Loading/Loading';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState('All Products');
    const ordersPerPage = 10;

    const productList = [
        'All Products',
        'Product A',
        'Product B',
        'Product C',
        'Product D'
    ];

    const statusTabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const ordersCol = collection(db, 'orders');
                const ordersSnapshot = await getDocs(ordersCol);

                let allOrders = [];

                for (const docSnap of ordersSnapshot.docs) {
                    const userId = docSnap.id;
                    const userOrdersObj = docSnap.data();

                    const userDoc = await getDoc(doc(db, 'customers', userId));
                    const userInfo = userDoc.exists() ? userDoc.data() : {};

                    const userOrdersArray = Object.values(userOrdersObj).map(order => ({
                        ...order,
                        userId,
                        userName: userInfo.fullName || 'N/A',
                        userEmail: userInfo.email || 'N/A',
                        phone: userInfo.phone || 'N/A',
                    }));

                    allOrders = allOrders.concat(userOrdersArray);
                }

                allOrders.sort((a, b) => {
                    const dateA = a.createdAt?.toDate() || new Date(0);
                    const dateB = b.createdAt?.toDate() || new Date(0);
                    return dateB - dateA;
                });

                setOrders(allOrders);
                setFilteredOrders(allOrders);
            } catch (error) {
                console.error('Error fetching all orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, []);

    useEffect(() => {
        let result = orders;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(order =>
                order.orderId.toLowerCase().includes(term) ||
                order.userName.toLowerCase().includes(term) ||
                order.userEmail.toLowerCase().includes(term) ||
                order.phone.toLowerCase().includes(term) ||
                order.items.some(item => item.name.toLowerCase().includes(term))
            )
        }
        if (selectedProduct !== 'All Products') {
            result = result.filter(order =>
                order.items.some(item => item.name === selectedProduct))
        }

        if (activeTab !== 'All') {
            result = result.filter(order => order.status === activeTab);
        }

        setFilteredOrders(result);
        setCurrentPage(1);
    }, [searchTerm, selectedProduct, activeTab, orders]);

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Pending': return 'warning';
            case 'Processing': return 'info';
            case 'Shipped': return 'primary';
            case 'Delivered': return 'success';
            case 'Cancelled': return 'danger';
            default: return 'secondary';
        }
    };

    const handleViewClick = (orderId) => {
        navigate(`/a-ordersDetails/${orderId}`);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <>
                <Loading isLoading={loading} />
            </>
        );
    }

    return (
        <>
            <Header />
            <Container className="orders-container">
                <Card className="orders-card">
                    <Card.Body>
                        <div className="d-flex justify-content-center">
                            <h2>Orders</h2>
                        </div>

                        <div className="orders-header">
                            {/* <h2>Orders</h2> */}

                            <Form.Group controlId="productFilter">
                                <Form.Select
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    className="product-select"
                                >
                                    {productList.map((product, index) => (
                                        <option key={index} value={product}>{product}</option>
                                    ))}
                                </Form.Select>

                            </Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Search by Order ID, Customer..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>

                        <Nav className="status-tabs">
                            {statusTabs.map((tab) => (
                                <Nav.Item key={tab}>
                                    <Nav.Link
                                        className={activeTab === tab ? 'active' : ''}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>

                        {filteredOrders.length === 0 ? (
                            <p className="text-center py-5">No orders found.</p>
                        ) : (
                            <>
                                <Table responsive className="orders-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Phone</th>
                                            <th>Date</th>
                                            <th>Items</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map((order, index) => (
                                            <tr key={index}>
                                                <td className="order-id">{order.orderId}</td>
                                                <td>
                                                    <div className="customer-info">
                                                        <div className="customer-name">{order.userName}</div>
                                                        <div className="customer-email">{order.userEmail}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="customer-info">
                                                        <div className="customer-name">{order.phone}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="order-date">
                                                        <div>{order.createdAt?.toDate().toLocaleDateString()}</div>
                                                        <div className="time">{order.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="order-items">
                                                        {order.items?.slice(0, 2).map((item, i) => (
                                                            <div key={i} className="order-item">
                                                                {item.name} (x{item.quantity})
                                                            </div>
                                                        ))}
                                                        {order.items?.length > 2 && (
                                                            <div className="text-muted">+{order.items.length - 2} more</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="order-total">
                                                    ₹{order.items
                                                        ? order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
                                                        : "0.00"}
                                                </td>
                                                <td>
                                                    <Badge pill bg={getStatusVariant(order.status)} className="status-badge">
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleViewClick(order.orderId)}
                                                        className="view-button"
                                                    >
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div className="orders-footer">
                                    <div className="showing-entries">
                                        Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
                                    </div>

                                    <div className="custom-pagination">
                                        <button
                                            className="nav-button"
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            &lt; Previous
                                        </button>

                                        <span className="page-info">Page {currentPage} of {totalPages}</span>

                                        <button
                                            className="nav-button"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next &gt;
                                        </button>
                                    </div>
                                </div>

                            </>
                        )}
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </>
    );
}

export default Orders;