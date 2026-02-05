import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { db } from '../../Firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import baseURL from "../../Api/Api";

const AdminDashboard = () => {
  const [totalCustomersCount, setTotalCustomersCount] = useState(0);
  const [totalOrdersCount, setTotalOrdersCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${baseURL}/dashboard`);
      const dashboardData = response.data;

      const customersEntry = dashboardData.find(entry => entry.name === 'customers');
      const ordersEntry = dashboardData.find(entry => entry.name === 'orders');

      if (customersEntry) {
        setTotalCustomersCount(customersEntry.count || 0);
      }

      if (ordersEntry) {
        setTotalOrdersCount(ordersEntry.count || 0);
        setTotalRevenue(Number(ordersEntry.totalAmount) || 0);
        // setTotalQuantity(ordersEntry.totalQuantity || 0); 
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);

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
      <div className="container-fluid p-4">
        <h1 className="mb-4" style={{ marginTop: '60px', color: '#4d0000' }}>Admin Dashboard</h1>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{ height: '150px', cursor: 'pointer' }}
              onClick={() => navigate('/a-orders')}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#4d0000' }}>Total Orders</h5>

                <h2 className="admin-card-text" style={{ color: '#4d0000' }}>{totalOrdersCount}</h2>

              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{ height: '150px', cursor: 'pointer' }}
              onClick={() => navigate('/a-orders')}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#4d0000' }}>Total Revenue</h5>
                <h2 className="admin-card-text" style={{ color: '#4d0000' }}>
                  ₹{Number(totalRevenue).toFixed(2)}
                </h2>

              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card"
              style={{ height: '150px', cursor: 'pointer' }}
              onClick={() => navigate('/a-customers')}
            >
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#4d0000' }}>Customers</h5>
                <h2 className="admin-card-text" style={{ color: '#4d0000' }}>{totalCustomersCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
