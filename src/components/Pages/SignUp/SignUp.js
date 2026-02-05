import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (formData.password !== formData.confirmPassword) {
    //         alert("Passwords do not match.");
    //         return;
    //     }

    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    //         const user = userCredential.user;

    //         // Create a Firestore document using uid as the document ID
    //         await setDoc(doc(db, 'customers', user.uid), {
    //             uid: user.uid,
    //             fullName: formData.fullName,
    //             email: formData.email,
    //             phone: formData.phone,
    //             password: formData.password,
    //             createdAt: new Date()
    //         });

    //         // 🔄 Update customer count in dashboard
    //         const dashboardRef = doc(db, 'dashboard', 'customers');
    //         const dashboardSnap = await getDoc(dashboardRef);

    //         if (dashboardSnap.exists()) {
    //             // Increment count
    //             await updateDoc(dashboardRef, {
    //                 count: increment(1)
    //             });
    //         } else {
    //             // Initialize count
    //             await setDoc(dashboardRef, {
    //                 count: 1
    //             });
    //         }

    //         // Send welcome email
    //         await fetch(`${baseURL}/send-welcome-email`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: formData.email,
    //                 fullName: formData.fullName,
    //                 password: formData.password
    //             })
    //         });

    //         alert("Signup successful!");
    //         navigate('/login');
    //     } catch (error) {
    //         console.error("Error signing up:", error);
    //         alert(error.message);
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            // const createdAt = new Date().toISOString();

            // Send customer data to your backend
            const response = await fetch(`${baseURL}/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                    // createdAt: createdAt,
                }),
            });

            const result = await response.json();

            if (response.status === 201) {
                // Send welcome email
                await fetch(`${baseURL}/send-welcome-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        fullName: formData.fullName,
                        password: formData.password,
                    }),
                });

                alert("Signup successful!");
                navigate('/login');
            } else if (response.status === 409) {
                alert("Email already exists.");
            } else {
                alert("Something went wrong.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Error signing up.");
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="signup-wrapper mb-5">
                <div className="signup-box">
                    <h2 className="signup-title">Create an Account</h2>
                    

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
