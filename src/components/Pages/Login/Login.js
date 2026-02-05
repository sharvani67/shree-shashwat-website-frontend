import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './../../../assets/SSLogo3-removebg-preview.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import baseURL from "../../Api/Api";
import { useAuth } from '../../AuthContext/AuthContext';


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'admin@gmail.com' && password === 'admin@123') {
      Swal.fire({
        icon: 'success',
        title: 'Admin login successful!',
        confirmButtonText: 'OK',
      }).then(() => navigate('/a-dashboard'));
      return;
    }

    try {
      const res = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data); // Save in AuthContext
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          confirmButtonText: 'OK',
        }).then(() => navigate('/'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: data.message || 'Please try again...',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: 'Try again later.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="customer-login-page">
      <form onSubmit={handleSubmit} className="customer-login-form-wrapper">
        <div className="customer-login-box">
          <div className="customer-login-container">
            <div className="customer-login-header">
              <img src={Logo} alt="Logo" className="customer-login-logo" />
              <h2 className="customer-login-title">Login</h2>
            </div>

            <div className="customer-login-field">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username"
                required
                className="customer-login-input"
              />
              <i className="customer-login-icon bx bx-user"></i>
            </div>

            <div className="customer-login-field">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="customer-login-input"
              />
              <i className="customer-login-icon bx bx-lock-alt"></i>
              <span className="customer-toggle-password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <button type="submit" className="customer-login-submit">Login</button>
            <div className="customer-login-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="customer-login-link">Sign up</Link> |{' '}
                <Link to="/forgot-password" className="customer-login-link">Forgot Password?</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
