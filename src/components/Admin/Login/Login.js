// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../Firebase/firebase';
// import Logo from './../../../assets/SSLogo3-removebg-preview.png';

// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const { email, password } = formData;

//     if (email === 'admin@gmail.com' && password === 'admin@123') {
//       alert('Admin login successful!');
//       navigate('/a-dashboard');
//       return;
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert('Login successful!');
//       navigate('/');
//     } catch (error) {
//       alert('Invalid Credentials. Please try again...');
//     }
//   };

//   return (
//     <div className="loginPage">
//       <form onSubmit={handleSubmit} className="loginFormWrapper">
//         <div className="loginBox">
//           <div className="loginContainer">
//             <div className="loginHeader">
//               <img src={Logo} alt="Logo" className="loginLogo" />
//               <h2 className="loginTitle">Admin Login</h2>
//             </div>

//             <div className="loginField">
//               <input
//                 type="text"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Username"
//                 required
//                 className="loginInput"
//               />
//               <i className="loginIcon bx bx-user"></i>
//             </div>

//             <div className="loginField">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 required
//                 className="loginInput"
//               />
//               <i className="loginIcon bx bx-lock-alt"></i>
//               <span className="togglePasswordIcon" onClick={togglePasswordVisibility}>
//                 {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
//               </span>
//             </div>

//             <button type="submit" className="loginSubmit">Login</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
