// import React, { useState } from 'react';
// import { Container, Card, Button, Form } from 'react-bootstrap';

// const ProfilePage = () => {
//   const [fullName, setFullName] = useState('customer');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   const handleSave = (e) => {
//     e.preventDefault();
//     setIsEditing(false);
//     // API call to save changes would go here
//   };

//   return (
//     <Container className="py-5" style={{ maxWidth: '600px' }}>
//       <Card className="border-0 shadow-sm">
//         <Card.Body className="p-4">
//           <h1 className="h4 mb-3 fw-normal">Your Profile</h1>
//           <p className="text-muted mb-4">Manage your personal information. Email address is read-only.</p>
          
//           <Form onSubmit={handleSave}>
//             <div className="mb-4">
//               <Form.Label className="d-block fw-semibold mb-2">Full Name</Form.Label>
//               {isEditing ? (
//                 <Form.Control
//                   type="text"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="py-2"
//                 />
//               ) : (
//                 <div className="ps-0 text-body">- {fullName}</div>
//               )}
//             </div>

//             <div className="mb-4">
//               <Form.Label className="d-block fw-semibold mb-2">Email Address (Read-only)</Form.Label>
//               <div className="ps-0 text-muted">- customer@example.com</div>
//             </div>

//             <div className="mb-4">
//               <Form.Label className="d-block fw-semibold mb-2">Phone Number</Form.Label>
//               {isEditing ? (
//                 <Form.Control
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   placeholder="Enter phone number"
//                   className="py-2"
//                 />
//               ) : (
//                 <div className="ps-0 text-body">
//                   - {phoneNumber || 'Enter phone number'}
//                 </div>
//               )}
//             </div>

//             <hr className="my-4" />

//             {isEditing ? (
//               <Button 
//                 variant="primary" 
//                 type="submit" 
//                 className="w-100 py-2 fw-semibold"
//               >
//                 Save Profile Changes
//               </Button>
//             ) : (
//               <Button 
//                 variant="outline-primary" 
//                 onClick={() => setIsEditing(true)} 
//                 className="w-100 py-2 fw-semibold"
//               >
//                 Edit Profile
//               </Button>
//             )}
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default ProfilePage;

// import React from 'react';

// const ProfilePage = () => {
//   return (
//     <div className="container py-5">
//       <div className="card shadow-sm" style={{ borderRadius: '12px' }}>
//         <div className="card-body p-4">
//           <div className="mb-4">
//             <h4 className="fw-bold">
//                <i className="bi bi-person-fill-gear text-warning fs-4"></i>
//               Your Profile
//             </h4>
//             <p className="text-muted mb-0">
//               Manage your personal information. Email address is read-only.
//             </p>
//           </div>

//           <form>
//             <div className="mb-3">
//               <label htmlFor="fullName" className="form-label">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control bg-light"
//                 id="fullName"
//                 placeholder="Enter full name"
//                 defaultValue="customer"
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email Address (Read-only)</label>
//               <input
//                 type="email"
//                 className="form-control bg-light"
//                 id="email"
//                 defaultValue="customer@example.com"
//                 readOnly
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="phone" className="form-label">Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control bg-light"
//                 id="phone"
//                 placeholder="Enter phone number"
//               />
//             </div>

//             <button type="submit" className="btn btn-warning w-100 text-white fw-semibold">
//               Save Profile Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProfilePage = () => {
  const brown = 'rgb(189, 78, 38)'; // SaddleBrown (or choose your own brown tone)

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
        <div className="card-body p-4">
          <div className="mb-4 d-flex align-items-center">
            <div
              className="rounded-circle p-3 me-3"
              style={{ backgroundColor: '#f3e8e3' }}
            >
              <i className="bi bi-person-fill-gear fs-4" style={{ color: brown }}></i>
            </div>
            <div>
              <h4 className="fw-bold mb-1">Your Profile</h4>
              <p className="text-muted mb-0">
                Manage your personal information. Email address is read-only.
              </p>
            </div>
          </div>

          <form>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control bg-light border-0"
                id="fullName"
                placeholder="Enter full name"
                defaultValue="customer"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address (Read-only)</label>
              <input
                type="email"
                className="form-control bg-light border-0"
                id="email"
                defaultValue="customer@example.com"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                className="form-control bg-light border-0"
                id="phone"
                placeholder="Enter phone number"
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white fw-bold shadow-sm"
              style={{ backgroundColor: brown, borderRadius: '12px' }}
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
