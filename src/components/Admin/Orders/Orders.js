import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Badge, Button, Card, Form, Nav, Pagination } from 'react-bootstrap';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './Orders.css';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import baseURL from "../../Api/Api";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';


function Orders() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState('All Products');
    const ordersPerPage = 10;

    const statusTabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    const [statusCounts, setStatusCounts] = useState({
        All: 0,
        Pending: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0
    });

    // Function to calculate counts for each status
    const getStatusCounts = (orders) => {
        const counts = {
            All: orders.length,
            Pending: 0,
            Processing: 0,
            Shipped: 0,
            Delivered: 0,
            Cancelled: 0
        };

        orders.forEach(order => {
            if (order.status === 'Pending') counts.Pending++;
            else if (order.status === 'Processing') counts.Processing++;
            else if (order.status === 'Shipped') counts.Shipped++;
            else if (order.status === 'Delivered') counts.Delivered++;
            else if (order.status === 'Cancelled') counts.Cancelled++;
        });

        return counts;
    };

    // Fetch orders from Node.js backend
    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const ordersResponse = await axios.get(`${baseURL}/api/orders`);
                const allOrders = ordersResponse.data;

                const ordersWithItems = await Promise.all(
                    allOrders.map(async (order) => {
                        try {
                            // Fetch order items
                            const itemsResponse = await axios.get(`${baseURL}/api/order-items/${order.order_id}`);
                            const items = itemsResponse.data;

                            // Fetch customer details
                            let customerData = {
                                fullName: `User ${order.user_id}`,
                                email: `user${order.user_id}@example.com`,
                                phone: '1234567890'
                            };
                            try {
                                const customerResponse = await axios.get(`${baseURL}/customers/${order.user_id}`);
                                customerData = customerResponse.data;
                            } catch (err) {
                                console.warn(`Customer ${order.user_id} not found. Using placeholder.`);
                            }

                            return {
                                ...order,
                                orderId: order.order_id,
                                items: items.map(item => ({
                                    ...item,
                                    product_id: item.product_id,
                                    name: item.name,
                                    price: parseFloat(item.price),
                                    quantity: item.quantity,
                                    image: item.image
                                })),
                                userName: customerData.fullName,
                                userEmail: customerData.email,
                                phone: customerData.phone,
                                createdAt: order.created_at,
                                tracking_id: order.tracking_id,
                                label_order_id: order.label_order_id,
                                manifest_order_id: order.manifest_order_id,
                                invoice_order_id: order.invoice_order_id
                            };
                        } catch (error) {
                            console.error(`Error fetching items or customer for order ${order.order_id}:`, error);
                            return {
                                ...order,
                                items: [],
                                userName: `User ${order.user_id}`,
                                userEmail: `user${order.user_id}@example.com`,
                                phone: '1234567890',
                                createdAt: order.created_at
                            };
                        }
                    })
                );

                setOrders(ordersWithItems);
                setFilteredOrders(ordersWithItems);
                setStatusCounts(getStatusCounts(ordersWithItems));

                // Extract unique products
                const allProducts = [];
                ordersWithItems.forEach(order => {
                    order.items.forEach(item => {
                        if (!allProducts.some(p => p.name === item.name)) {
                            allProducts.push({
                                id: item.product_id,
                                name: item.name
                            });
                        }
                    });
                });
                setProducts(allProducts);

            } catch (error) {
                console.error('Error fetching all orders:', error);
                setOrders([]);
                setFilteredOrders([]);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, []);


    // Rest of your component remains the same...
    // Filter orders based on search, product, and status
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
            );
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
        setStatusCounts(getStatusCounts(orders));
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
                            <Form.Group controlId="productFilter">
                                <Form.Select
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                    className="product-select"
                                >
                                    <option value="All Products">All Products</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.name}>
                                            {product.name}
                                        </option>
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
                                        {tab} ({statusCounts[tab] || 0})
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
                                            {/* <th>Phone</th> */}
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
                                                        <div className="customer-name">{order.phone}</div>
                                                        <div className="customer-email">{order.userEmail}</div>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    <div className="customer-info">
                                                        <div className="customer-name">{order.phone}</div>
                                                    </div>
                                                </td> */}
                                                <td>
                                                    <div className="order-date">
                                                        <div>{new Date(order.createdAt.replace(' ', 'T')).toLocaleDateString('en-GB')}</div>
                                                        <div className="time">
                                                            {new Date(order.createdAt.replace(' ', 'T')).toLocaleTimeString([], {
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            }).toUpperCase()}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>
                                                    <div className="order-items">
                                                        {order.items.slice(0, 2).map((item, i) => (
                                                            <div key={i} className="order-item">
                                                                {item.name} (x{item.quantity})
                                                            </div>
                                                        ))}
                                                        {order.items.length > 2 && (
                                                            <div className="text-muted">+{order.items.length - 2} more</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="order-total">
                                                    ₹{order.payment_amount}
                                                </td>
                                               
                                                <td>
                                                    <Badge pill bg={getStatusVariant(order.status)} className="status-badge">
                                                        {order.status}
                                                    </Badge>
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <FaEye
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: 'blue',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            margin: 'auto'
                                                        }}
                                                        onClick={() => handleViewClick(order.orderId)}
                                                    />
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
            
        </>
    );
}

export default Orders;