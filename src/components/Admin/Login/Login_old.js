import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import Logo from './../../../assets/SSLogo7-removebg-preview.png';
import Food from './../../../assets/Bgcustom.png';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email === 'admin@gmail.com' && password === 'admin@123') {
      alert('Admin login successful!');
      navigate('/a-dashboard');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Logo and Background (optional, you can style this as you wish) */}
      <div className="login-left-alone">
        <img src={Logo} alt="Logo" className="login-logo" />
        <img src={Food} alt="Background" className="login-food" />
      </div>

      {/* Form Card */}
      <div className="login-card">
        <div className="login-form-section">
          <h4 className="login-title">Welcome Back!</h4>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="admin@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
              autoFocus
            />

            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </span>
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          {/* <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="login-link">Sign up</Link> |{' '}
              <Link to="/forgot-password" className="login-link">Forgot Password?</Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
