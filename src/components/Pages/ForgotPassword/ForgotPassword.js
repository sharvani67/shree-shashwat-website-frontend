import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import baseURL from "../../Api/Api";
import Header from '../../Customer/Header/Header';
import Footer from '../../Customer/Footer/Footer';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uid, setUid] = useState('');
    const navigate = useNavigate();
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleSendOtp = async () => {
        const genOtp = generateOTP();
        setGeneratedOtp(genOtp);

        // Store OTP in MySQL via backend
        await fetch(`${baseURL}/store-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp: genOtp })
        });

        // Send OTP to email
        await fetch(`${baseURL}/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp: genOtp })
        });

        const res = await fetch(`${baseURL}/get-customer-uid?email=${email}`);

        const data = await res.json();
        if (data.success) {
            setUid(data.customer_id); // rename to setCustomerId if you want for clarity
            setStep(2);
            alert('OTP sent to email.');
        }
        else {
            alert('Email not found.');
        }
    };


    const handleVerifyOtp = () => {
        if (otp === generatedOtp) {
            setStep(3);
        } else {
            alert('Invalid OTP');
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            await fetch(`${baseURL}/api/customers/${uid}/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            });

            alert('Password updated successfully!');
            navigate('/login');
        } catch (err) {
            console.error('Failed to update password:', err);
            alert('Something went wrong while resetting password.');
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="forgot-wrapper">
                <div className="forgot-box">
                    <h2>Forgot Password</h2>
                    {step === 1 && (
                        <>
                            <div className="forgot-form">
                                <input
                                    type="email"
                                    placeholder="Enter your registered email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button onClick={handleSendOtp} className="forgot-btn">Send OTP</button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="forgot-form">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button onClick={handleVerifyOtp} className="forgot-btn">Verify OTP</button>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="forgot-form">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button onClick={handlePasswordReset} className="forgot-btn">Reset Password</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default ForgotPassword;
