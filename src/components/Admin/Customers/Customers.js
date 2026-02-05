import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Card, Form, Button, Nav } from 'react-bootstrap';
import { db } from '../../Firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import './Customers.css';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from "../../Api/Api";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;
    const [activeTab, setActiveTab] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${baseURL}/customers`);
                const customerData = response.data.map(customer => ({
                    ...customer,
                    id: customer.customer_id, // Assuming `customer_id` is the MySQL primary key
                    status: Math.random() > 0.3 ? 'Active' : 'Inactive', // Optional simulated status
                    joinDate: customer.createdAt
                }));
                setCustomers(customerData);
            } catch (error) {
                console.error('Error fetching customers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);


    const filteredCustomers = customers.filter(customer => {
        const searchString = `
            ${customer.fullName || ''}
            ${customer.email || ''}
            ${customer.phone || ''}
            ${customer.id || ''}
        `.toLowerCase();

        const matchesSearch = searchTerm === '' ||
            searchString.includes(searchTerm.toLowerCase());

        const matchesStatus = activeTab === 'All' ||
            (activeTab === 'New' && isNewCustomer(customer)) ||
            customer.status === activeTab;

        return matchesSearch && matchesStatus;
    });

    function isNewCustomer(customer) {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return customer.joinDate > weekAgo;
    }

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCustomerClick = (customerId) => {
        navigate(`/customer-orders/${customerId}`);
    };

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
            <Container className="customers-container">
                <Card className="customers-card">
                    <Card.Body>
                        <div className="d-flex justify-content-center">
                            <h2>Customers</h2>
                        </div>

                        <div className="customers-header">
                            <Form.Control
                                type="text"
                                placeholder="Search by Name, Email or Phone..."
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        {filteredCustomers.length === 0 ? (
                            <p className="text-center py-5">No customers found.</p>
                        ) : (
                            <>
                                <Table responsive className="customers-table">
                                    <thead>
                                        <tr>
                                            <th>S.No.</th>
                                            <th>Customer</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            {/* <th>Created At</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCustomers.map((customer, index) => (
                                            <tr key={customer.id}>
                                                <td className="customer-id">{indexOfFirstCustomer + index + 1}</td>
                                                <td>
                                                    <div
                                                        className="customer-info clickable"
                                                        onClick={() => handleCustomerClick(customer.id)}
                                                    >
                                                        <div className="customer-name">{customer.fullName || 'N/A'}</div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="customer-email">{customer.email || 'N/A'}</div>
                                                </td>
                                                <td>{customer.phone || 'N/A'}</td>
                                                {/* <td>
                                                    {customer.joinDate
                                                        ? new Date(customer.joinDate).toLocaleDateString('en-GB')
                                                        : 'N/A'}
                                                </td> */}

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <div className="customers-footer">
                                    <div className="showing-entries">
                                        Showing {indexOfFirstCustomer + 1}-{Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
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

export default Customers;