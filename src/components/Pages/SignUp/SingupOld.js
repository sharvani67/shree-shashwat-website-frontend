import React, { useState } from 'react';
import './SignUp.css';
import Header from '../../Customer/Header/Header';
import Footer from '../../Customer/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../Firebase/firebase'; // adjust path as needed
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import baseURL from "../../Api/Api";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Create a Firestore document using uid as the document ID
            await setDoc(doc(db, 'customers', user.uid), {
                uid: user.uid,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                createdAt: new Date()
            });

            // Send welcome email
            await fetch(`${baseURL}/send-welcome-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    fullName: formData.fullName,
                    password: formData.password
                })
            });


            alert("Signup successful!");
            navigate('/login');
        } catch (error) {
            console.error("Error signing up:", error);
            alert(error.message);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="signup-wrapper mb-5">
                <div className="signup-box">
                    <h2 className="signup-title">Create an Account</h2>
                    <p className="signup-subtext">
                        Join SutraCart to enjoy a seamless shopping experience.
                    </p>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <label>Full Name</label>
                        <input type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />

                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="you@example.com" onChange={handleChange} required />

                        <label>Phone Number</label>
                        <input type="tel" name="phone" placeholder="Enter your phone number" onChange={handleChange} required />

                        <label>Password</label>
                        <div className="password-input-container">
                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="********" onChange={handleChange} required />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                            </span>
                        </div>
                        <label>Confirm Password</label>
                        <div className="password-input-container">
                            <input type={showPassword ? 'text' : 'password'} name="confirmPassword" placeholder="********" onChange={handleChange} required />
                            <span className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                            </span>
                        </div>
                        <button type="submit" className="signup-btn">Sign Up</button>
                    </form>

                    <div className="signup-footer">
                        <p>Already have an account? <Link to="/Login">Sign in</Link></p>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default Signup;
