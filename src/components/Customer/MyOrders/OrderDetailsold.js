// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Container, Modal, Button } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";
// import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import WhatApp from "../../Customer/WhatsApp/WhatApp";
// import { db } from "../../Firebase/firebase";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
// } from "firebase/firestore";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// // import FeedbackForm from './Feedback'; // ✅ Import FeedbackForm
// import "./OrderDetails.css";

// function calculateSubtotal(items) {
//   return items.reduce((sum, item) => {
//     const price = Number(item.price) || 0;
//     return sum + price * item.quantity;
//   }, 0);
// }

// function OrderDetails() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { orderId } = useParams();
//   const [orderData, setOrderData] = useState(null);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false); // ✅ Modal State
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(null);
//   const [comment, setComment] = useState("");
//   const [complaintText, setComplaintText] = useState("");
//   const [complaints, setComplaints] = useState([]);

//   useEffect(() => {
//     if (location.state?.openFeedback) {
//       setShowFeedbackModal(true);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const ordersCol = collection(db, "orders");
//         const ordersSnapshot = await getDocs(ordersCol);

//         for (const userDoc of ordersSnapshot.docs) {
//           const userId = userDoc.id;
//           const userOrdersObj = userDoc.data();

//           const matchedOrder = Object.values(userOrdersObj).find(
//             (order) => order.orderId === orderId
//           );

//           if (matchedOrder) {
//             const customerDoc = await getDoc(doc(db, "customers", userId));
//             const customerData = customerDoc.exists() ? customerDoc.data() : {};

//             const statusDoc = await getDoc(doc(db, "order_status", orderId));
//             const statusData = statusDoc.exists()
//               ? statusDoc.data().statusHistory || []
//               : [];

//             setOrderData({
//               ...matchedOrder,
//               userId,
//               statusHistory: statusData,
//               customer: {
//                 fullName:
//                   customerData.fullName ||
//                   matchedOrder.shippingAddress?.fullName ||
//                   "N/A",
//                 email:
//                   customerData.email ||
//                   matchedOrder.shippingAddress?.email ||
//                   "N/A",
//                 phone:
//                   customerData.phone ||
//                   matchedOrder.shippingAddress?.phone ||
//                   "N/A",
//               },
//             });
//             return;
//           }
//         }

//         console.warn("Order not found");
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (!user || !orderData) return;

//     try {
//       const userOrdersRef = doc(db, "orders", user.uid);
//       const userOrdersSnap = await getDoc(userOrdersRef);

//       if (!userOrdersSnap.exists()) {
//         console.error("User orders not found");
//         return;
//       }

//       const orders = userOrdersSnap.data();
//       const orderToUpdate = orders[orderData.orderId];

//       if (!orderToUpdate) {
//         console.error("Order not found in user's orders");
//         return;
//       }

//       const updatedOrder = {
//         ...orderToUpdate,
//         feedback: true,
//         feedbackRating: rating,
//         feedbackComment: comment,
//       };

//       // Update feedback and append complaint to the complaints array
//       await updateDoc(userOrdersRef, {
//         [orderData.orderId]: updatedOrder,
//         [`${orderData.orderId}.complaints`]: arrayUnion({
//             text: complaintText,
//             date: new Date().toISOString(),
//          }),
//       });

//       setShowFeedbackModal(false);
//       alert("Thank you for your feedback and complaint!");
//     } catch (error) {
//       console.error("Failed to submit feedback or complaint:", error);
//     }
//   };

//   const generateInvoicePDF = () => {
//     if (!orderData) return;

//     const pdfDoc = new jsPDF();
//     const {
//       orderId,
//       createdAt,
//       items,
//       customer,
//       shippingAddress,
//       paymentStatus,
//     } = orderData;
//     const subtotal = calculateSubtotal(items || []);
//     const shippingCharge = Number(orderData.shippingCharge) || 0;
//     const total = subtotal + shippingCharge;

//     pdfDoc.setFontSize(16);
//     pdfDoc.setTextColor(255, 87, 34);
//     pdfDoc.text("SutraCart", 14, 20);
//     pdfDoc.setFontSize(10);
//     pdfDoc.setTextColor(0);
//     pdfDoc.text("Authentic Masala Pastes", 14, 26);

//     pdfDoc.setFontSize(12);
//     pdfDoc.text(`INVOICE`, 160, 20);
//     pdfDoc.setFontSize(10);
//     pdfDoc.text(`Order ID: ${orderId}`, 160, 26);
//     pdfDoc.text(`Date: ${createdAt?.toDate?.().toLocaleDateString()}`, 160, 32);

//     const billing = [
//       customer.fullName || "Customer",
//       shippingAddress?.addressLine1 || "",
//       `${shippingAddress?.city}, ${shippingAddress?.state} - ${shippingAddress?.postalCode}`,
//       shippingAddress?.country,
//       `Email: ${customer.email}`,
//       `Phone: ${customer.phone}`,
//     ];

//     pdfDoc.setFontSize(11);
//     pdfDoc.text("BILL TO:", 14, 45);
//     billing.forEach((line, i) => pdfDoc.text(line, 14, 51 + i * 6));
//     pdfDoc.text("SHIP TO:", 105, 45);
//     billing.forEach((line, i) => pdfDoc.text(line, 105, 51 + i * 6));

//     const tableRows = items.map((item, idx) => [
//       idx + 1,
//       item.name + (item.weight ? `\n${item.weight}` : ""),
//       item.quantity,
//       `${Number(item.price).toFixed(2)}`,
//       `${(item.quantity * Number(item.price)).toFixed(2)}`,
//     ]);

//     autoTable(pdfDoc, {
//       head: [["#", "Item", "Qty", "Unit Price", "Total"]],
//       body: tableRows,
//       startY: 100,
//       styles: { fontSize: 10 },
//       theme: "striped",
//     });

//     const finalY = pdfDoc.lastAutoTable.finalY || 100;

//     pdfDoc.setFontSize(10);
//     pdfDoc.text(`Subtotal: ${subtotal.toFixed(2)}`, 160, finalY + 10, {
//       align: "right",
//     });
//     pdfDoc.text(`Shipping: ${shippingCharge.toFixed(2)}`, 160, finalY + 16, {
//       align: "right",
//     });

//     pdfDoc.setFontSize(12);
//     pdfDoc.setTextColor(255, 87, 34);
//     pdfDoc.text(`Grand Total: ${total.toFixed(2)}`, 160, finalY + 26, {
//       align: "right",
//     });

//     pdfDoc.setFontSize(11);
//     pdfDoc.setTextColor(0);
//     pdfDoc.text(`Payment Status: ${paymentStatus}`, 14, finalY + 26);

//     pdfDoc.save(`Invoice.pdf`);
//   };

//   if (!orderData) {
//     return (
//       <>
//         <Header />
//         <Container className="py-4 text-center">
//           <h4>Loading order details...</h4>
//         </Container>
//         <Footer />
//       </>
//     );
//   }

//   const subtotal = calculateSubtotal(orderData.items || []);
//   const shippingCharge = Number(orderData.shippingCharge) || 0;
//   const total = subtotal + shippingCharge;
//   const address = orderData.shippingAddress || {};

//   return (
//     <>
//       <Header />
//       <WhatApp />
//       <div className="container py-4 order-details-page">
//         <div className="bg-light rounded p-3 mb-4 shadow-sm">
//           <div className="d-flex justify-content-between align-items-center flex-wrap">
//             <div>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => navigate("/myorders")}
//               >
//                 ← Back to My Orders
//               </button>
//             </div>
//             <div className="flex-grow-1 text-center">
//               <h3 className="mb-0">Order Details</h3>
//             </div>
//             <div className="d-flex gap-2">
//               <button
//                 className="btn btn-outline-secondary"
//                 onClick={generateInvoicePDF}
//               >
//                 ⬇ Download Invoice
//               </button>
//               {orderData.status === "Delivered" &&
//                 (orderData.feedback ? (
//                   <div
//                     style={{
//                       backgroundColor: "#e6f4ea",
//                       color: "#137333",
//                       padding: "8px 16px",
//                       borderRadius: "8px",
//                       display: "inline-flex",
//                       alignItems: "center",
//                       fontWeight: "500",
//                     }}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       fill="currentColor"
//                       viewBox="0 0 16 16"
//                       style={{ marginRight: "8px" }}
//                     >
//                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 11.5l5-5-1.4-1.4L7 8.7 5.4 7.1 4 8.5l3 3z" />
//                     </svg>
//                     Feedback Submitted
//                   </div>
//                 ) : (
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => setShowFeedbackModal(true)}
//                   >
//                     Leave Feedback
//                   </button>
//                 ))}
//             </div>
//           </div>
//         </div>

//         <div className="row g-3 mb-4">
//           <div className="col-md-6">
//             <div className="bg-white rounded shadow-sm p-3 h-100">
//               <h5 className="fw-semibold mb-1">
//                 Order ID:{" "}
//                 <span className="text-primary">#{orderData.orderId}</span>
//               </h5>
//               <small className="text-muted">
//                 Last updated:{" "}
//                 {orderData.createdAt?.toDate?.().toLocaleString() || "N/A"}
//               </small>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="bg-white rounded shadow-sm p-3 h-100">
//               <span className="badge bg-danger mb-2 px-3 py-2 fs-6">
//                 {orderData.status}
//               </span>
//               <br />
//               <small className="text-muted">
//                 Placed on:{" "}
//                 {orderData.createdAt?.toDate?.().toLocaleString() || "N/A"}
//               </small>
//             </div>
//           </div>

//           <div className="col-md-3">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title mb-3">💳 Payment Information</h5>
//                 <p className="mb-0">
//                   Payment Status:{" "}
//                   <span className="badge bg-success px-3 py-2">
//                     {orderData.paymentStatus}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="row g-4">
//           <div className="col-lg-7">
//             <div className="card shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title mb-3">📦 Order Items</h5>
//                 {orderData.items?.map((item, index) => (
//                   <div
//                     key={index}
//                     className="d-flex align-items-center mb-3 border-bottom pb-3"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       style={{
//                         width: "80px",
//                         height: "80px",
//                         objectFit: "cover",
//                         borderRadius: "8px",
//                         marginRight: "1rem",
//                       }}
//                     />
//                     <div>
//                       <h6 className="mb-1 fw-bold">{item.name}</h6>
//                       <small>
//                         Qty: {item.quantity} · {item.weight || "N/A"}
//                       </small>
//                       <br />
//                       <small>
//                         Price: ₹{Number(item.price).toFixed(2)} each
//                       </small>
//                     </div>
//                     <div className="ms-auto fw-bold">
//                       ₹{(Number(item.price) * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}

//                 <div className="pt-0">
//                   <div className="d-flex justify-content-between">
//                     <span>Subtotal:</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <span>Shipping:</span>
//                     <span>₹{shippingCharge.toFixed(2)}</span>
//                   </div>
//                   <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
//                     <span>Total:</span>
//                     <strong>₹{total.toFixed(2)}</strong>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-5">
//             <div className="card shadow-sm mb-4">
//               <div className="card-body">
//                 <h5 className="card-title mb-3">📍 Shipping Address</h5>
//                 <p className="mb-1 fw-semibold mt-4">
//                   {orderData.customer.fullName}
//                 </p>
//                 <p className="mb-1 mt-2">{address.addressLine1}</p>
//                 <p className="mb-1 mt-2">
//                   {address.city}, {address.state} - {address.postalCode}
//                 </p>
//                 <p className="mb-1 mt-2">{address.country}</p>
//                 <p className="mb-1 mt-2">Email: {orderData.customer.email}</p>
//                 <p className="mb-0 mt-2">Phone: {orderData.customer.phone}</p>
//               </div>
//             </div>
//           </div>

//           <div className="col-lg-12">
//             {orderData.statusHistory?.length > 0 && (
//               <div className="card shadow-sm mt-4">
//                 <div className="card-body">
//                   <h5 className="card-title mb-3">⏰ Order Status History</h5>
//                   {orderData.statusHistory
//                     .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds)
//                     .map((entry, index) => {
//                       const dateObj = entry.timestamp?.toDate?.();
//                       const formattedDate = dateObj?.toLocaleDateString(
//                         "en-GB",
//                         {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       );
//                       const formattedTime = dateObj?.toLocaleTimeString(
//                         "en-US",
//                         {
//                           hour: "numeric",
//                           minute: "2-digit",
//                           hour12: true,
//                         }
//                       );

//                       const badgeColor =
//                         {
//                           Pending: "warning",
//                           Processing: "info",
//                           Shipped: "primary",
//                           Delivered: "success",
//                           Cancelled: "warning",
//                         }[entry.status] || "secondary";

//                       return (
//                         <div
//                           key={index}
//                           className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
//                         >
//                           <span className={`badge bg-${badgeColor} px-3 py-2`}>
//                             {entry.status}
//                           </span>
//                           <small className="text-muted">
//                             {formattedDate}, {formattedTime}
//                           </small>
//                         </div>
//                       );
//                     })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ✅ Feedback Modal */}
//         <Modal
//           show={showFeedbackModal}
//           onHide={() => setShowFeedbackModal(false)}
//           centered
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Rate & Provide Feedback</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Rate your experience:</label>
//                 <div>
//                   {[...Array(5)].map((_, index) => {
//                     const starValue = index + 1;
//                     return (
//                       <FaStar
//                         key={starValue}
//                         size={24}
//                         color={
//                           starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
//                         }
//                         style={{ cursor: "pointer", marginRight: 8 }}
//                         onClick={() => setRating(starValue)}
//                         onMouseEnter={() => setHover(starValue)}
//                         onMouseLeave={() => setHover(null)}
//                       />
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Comment:</label>
//                 <textarea
//                   className="form-control"
//                   rows={3}
//                   value={comment}
//                   onChange={(e) => setComment(e.target.value)}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Leave a Complaint:</label>
//                 <textarea
//                   className="form-control"
//                   rows={3}
//                   value={complaintText}
//                   onChange={(e) => setComplaintText(e.target.value)}
//                 />
//               </div>

//               <div className="text-end">
//                 <Button
//                   variant="secondary"
//                   onClick={() => setShowFeedbackModal(false)}
//                 >
//                   Cancel
//                 </Button>
//                 <Button variant="primary" type="submit" className="ms-2">
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </Modal.Body>
//         </Modal>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default OrderDetails;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatApp from "../../Customer/WhatsApp/WhatApp";
import { db } from "../../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { Table } from 'react-bootstrap';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion, setDoc
} from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import FeedbackForm from './Feedback'; // ✅ Import FeedbackForm
import "./OrderDetails.css";
import { GrLocation } from "react-icons/gr";
import { useAuth } from '../../AuthContext/AuthContext';

function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);
}

function OrderDetails() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false); // ✅ Modal State
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [showComplaintsModal, setShowComplaintsModal] = useState(false);

  useEffect(() => {
    if (location.state?.openFeedback) {
      setShowFeedbackModal(true);
    }
  }, [location.state]);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       const ordersCol = collection(db, "orders");
  //       const ordersSnapshot = await getDocs(ordersCol);

  //       for (const userDoc of ordersSnapshot.docs) {
  //         const userId = userDoc.id;
  //         const userOrdersObj = userDoc.data();

  //         const matchedOrder = Object.values(userOrdersObj).find(
  //           (order) => order.orderId === orderId
  //         );

  //         if (matchedOrder) {
  //           const customerDoc = await getDoc(doc(db, "customers", userId));
  //           const customerData = customerDoc.exists() ? customerDoc.data() : {};

  //           const statusDoc = await getDoc(doc(db, "order_status", orderId));
  //           const statusData = statusDoc.exists()
  //             ? statusDoc.data().statusHistory || []
  //             : [];

  //           setOrderData({
  //             ...matchedOrder,
  //             userId,
  //             statusHistory: statusData,
  //             customer: {
  //               fullName:
  //                 customerData.fullName ||
  //                 matchedOrder.shippingAddress?.fullName ||
  //                 "N/A",
  //               email:
  //                 customerData.email ||
  //                 matchedOrder.shippingAddress?.email ||
  //                 "N/A",
  //               phone:
  //                 customerData.phone ||
  //                 matchedOrder.shippingAddress?.phone ||
  //                 "N/A",
  //             },
  //           });
  //           return;
  //         }
  //       }

  //       console.warn("Order not found");
  //     } catch (error) {
  //       console.error("Error fetching order:", error);
  //     }
  //   };

  //   fetchOrder();
  // }, [orderId]);


  const fetchOrder = async () => {
    try {
      const ordersCol = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCol);

      for (const userDoc of ordersSnapshot.docs) {
        const userId = userDoc.id;
        const userOrdersObj = userDoc.data();

        const matchedOrder = Object.values(userOrdersObj).find(
          (order) => order.orderId === orderId
        );

        if (matchedOrder) {
          const customerDoc = await getDoc(doc(db, "customers", userId));
          const customerData = customerDoc.exists() ? customerDoc.data() : {};

          const statusDoc = await getDoc(doc(db, "order_status", orderId));
          const statusData = statusDoc.exists()
            ? statusDoc.data().statusHistory || []
            : [];

          // ✅ Log awb_code if available
          const awbCode =
            matchedOrder?.shiprocketResponse?.awb?.response?.data?.awb_code;

          if (awbCode) {
            console.log("AWB Code:", awbCode);
          } else {
            console.warn("AWB code not found for this order.");
          }

          // ✅ Fetch feedback and complaints
          const feedbackRating = matchedOrder.feedbackRating || null;
          const feedbackComment = matchedOrder.feedbackComment || "";
          const complaints = matchedOrder.complaints || [];

          setOrderData({
            ...matchedOrder,
            userId,
            statusHistory: statusData,
            awbCode: awbCode || "N/A",
            feedbackRating,
            feedbackComment,
            complaints,
            customer: {
              fullName:
                customerData.fullName ||
                matchedOrder.shippingAddress?.fullName ||
                "N/A",
              email:
                customerData.email ||
                matchedOrder.shippingAddress?.email ||
                "N/A",
              phone:
                customerData.phone ||
                matchedOrder.shippingAddress?.phone ||
                "N/A",
            },
          });
          return;
        }
      }

      console.warn("Order not found");
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };



  useEffect(() => {
    fetchOrder();
  }, [orderId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user || !orderData) return;

    try {
      const userOrdersRef = doc(db, "orders", user.uid);
      const userOrdersSnap = await getDoc(userOrdersRef);

      if (!userOrdersSnap.exists()) {
        console.error("User orders not found");
        return;
      }

      const orders = userOrdersSnap.data();
      const orderToUpdate = orders[orderData.orderId];

      if (!orderToUpdate) {
        console.error("Order not found in user's orders");
        return;
      }

      const updatedOrder = {
        ...orderToUpdate,
        feedback: true,
        feedbackRating: rating,
        feedbackComment: comment,
      };

      // Update order with feedback and complaints
      await updateDoc(userOrdersRef, {
        [orderData.orderId]: updatedOrder,
        [`${orderData.orderId}.complaints`]: arrayUnion({
          text: complaintText,
          date: new Date().toISOString(),
        }),
      });

      // Add feedback to each product in the order
      const products = orderToUpdate.items;
      for (const item of products) {
        const productId = item.product_id;

        // Defensive checks
        if (!productId || rating === undefined || comment === undefined || !orderData.orderId) {
          console.warn("Missing required data for feedback:", {
            productId,
            rating,
            comment,
            orderId: orderData.orderId,
          });
          continue; // Skip this product if data is incomplete
        }

        const feedbackRef = doc(db, "feedback", productId);

        await setDoc(
          feedbackRef,
          {
            feedbacks: arrayUnion({
              userId: user.uid,
              userName: currentUser.fullName,
              rating,
              comment,
              date: new Date().toISOString(),
              orderId: orderData.orderId,
            }),
          },
          { merge: true }
        );
      }


      setShowFeedbackModal(false);
      alert("Thank you for your feedback!");
      fetchOrder();
    } catch (error) {
      console.error("Failed to submit feedback or complaint:", error);
    }
  };

  const generateInvoicePDF = () => {
    if (!orderData) return;

    const pdfDoc = new jsPDF();
    const {
      orderId,
      createdAt,
      items,
      customer,
      shippingAddress,
      paymentStatus,
    } = orderData;
    const subtotal = calculateSubtotal(items || []);
    const shippingCharge = Number(orderData.shippingCharge) || 0;
    const total = subtotal + shippingCharge;

    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(255, 87, 34);
    pdfDoc.text("SutraCart", 14, 20);
    pdfDoc.setFontSize(10);
    pdfDoc.setTextColor(0);
    pdfDoc.text("Authentic Masala Pastes", 14, 26);

    pdfDoc.setFontSize(12);
    pdfDoc.text(`INVOICE`, 160, 20);
    pdfDoc.setFontSize(10);
    pdfDoc.text(`Order ID: ${orderId}`, 160, 26);
    pdfDoc.text(`Date: ${createdAt?.toDate?.().toLocaleDateString()}`, 160, 32);

    const billing = [
      customer.fullName || "Customer",
      shippingAddress?.addressLine1 || "",
      `${shippingAddress?.city}, ${shippingAddress?.state} - ${shippingAddress?.postalCode}`,
      shippingAddress?.country,
      `Email: ${customer.email}`,
      `Phone: ${customer.phone}`,
    ];

    pdfDoc.setFontSize(11);
    pdfDoc.text("BILL TO:", 14, 45);
    billing.forEach((line, i) => pdfDoc.text(line, 14, 51 + i * 6));
    pdfDoc.text("SHIP TO:", 105, 45);
    billing.forEach((line, i) => pdfDoc.text(line, 105, 51 + i * 6));

    const tableRows = items.map((item, idx) => [
      idx + 1,
      item.name + (item.weight ? `\n${item.weight}` : ""),
      item.quantity,
      `${Number(item.price).toFixed(2)}`,
      `${(item.quantity * Number(item.price)).toFixed(2)}`,
    ]);

    autoTable(pdfDoc, {
      head: [["#", "Item", "Qty", "Unit Price", "Total"]],
      body: tableRows,
      startY: 100,
      styles: { fontSize: 10 },
      theme: "striped",
    });

    const finalY = pdfDoc.lastAutoTable.finalY || 100;

    pdfDoc.setFontSize(10);
    pdfDoc.text(`Subtotal: ${subtotal.toFixed(2)}`, 160, finalY + 10, {
      align: "right",
    });
    pdfDoc.text(`Shipping: ${shippingCharge.toFixed(2)}`, 160, finalY + 16, {
      align: "right",
    });

    pdfDoc.setFontSize(12);
    pdfDoc.setTextColor(255, 87, 34);
    pdfDoc.text(`Grand Total: ${total.toFixed(2)}`, 160, finalY + 26, {
      align: "right",
    });

    pdfDoc.setFontSize(11);
    pdfDoc.setTextColor(0);
    pdfDoc.text(`Payment Status: ${paymentStatus}`, 14, finalY + 26);

    pdfDoc.save(`Invoice.pdf`);
  };

  if (!orderData) {
    return (
      <>
        <Header />
        <Container className="py-4 text-center">
          <h4>Loading order details...</h4>
        </Container>
        <Footer />
      </>
    );
  }

  const subtotal = calculateSubtotal(orderData.items || []);
  const shippingCharge = Number(orderData.shippingCharge) || 0;
  const total = subtotal + shippingCharge;
  const address = orderData.shippingAddress || {};

  const statusColors = {
    Pending: "warning",
    Processing: "info",
    Shipped: "primary",
    Delivered: "success",
    Cancelled: "danger",
  };

  return (
    <>
      <Header />
      <WhatApp />
      <div className="container py-4 order-details-page">
        <div className="bg-light rounded p-3 mb-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/myorders")}
              >
                ← Back to My Orders
              </button>
            </div>
            <div className="flex-grow-1 text-center">
              <h3 className="mb-0">Order Details</h3>
            </div>
            <div className="d-flex gap-2">
              {/* <button
                className="btn btn-outline-secondary"
                onClick={generateInvoicePDF}
              >
                ⬇ Download Invoice
              </button> */}
              {orderData.status === "Delivered" &&
                (orderData.feedback ? (
                  <div
                    style={{
                      backgroundColor: "#e6f4ea",
                      color: "#137333",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      display: "inline-flex",
                      alignItems: "center",
                      fontWeight: "500",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      style={{ marginRight: "8px" }}
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM7 11.5l5-5-1.4-1.4L7 8.7 5.4 7.1 4 8.5l3 3z" />
                    </svg>
                    Feedback Submitted
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    Leave Feedback
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-6">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <h5 className="fw-semibold mb-1">
                Order ID:{" "}
                <span className="text-primary">#{orderData.orderId}</span>
              </h5>
              <small className="text-muted">
                Last updated:{" "}
                {orderData.createdAt?.toDate?.().toLocaleString() || "N/A"}
              </small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="bg-white rounded shadow-sm p-3 h-100">
              <span
                className={`badge bg-${statusColors[orderData.status] || "secondary"} mb-2 px-3 py-2 fs-6`}
              >
                {orderData.status}
              </span>
              <br />
              <small className="text-muted">
                Placed on:{" "}
                {orderData.createdAt?.toDate?.().toLocaleString() || "N/A"}
              </small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">💳 Payment Information</h5>
                <p className="mb-0">
                  Payment Status:{" "}
                  <span className="badge bg-success px-3 py-2">
                    {orderData.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">


          <div className="row" style={{ marginTop: "20px" }}>
            {/* Left Column: Order Items */}
            <div className="col-12 col-lg-7 mb-4 mb-lg-0">
              <div className="card shadow-sm h-100 order-items-scroll">
                <div className="card-body">
                  <h5 className="card-title mb-3">📦 Order Items</h5>
                  {orderData.items?.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center mb-3 border-bottom pb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "1rem",
                        }}
                      />
                      <div>
                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                        <small>
                          Qty: {item.quantity} · {item.weight || "N/A"}
                        </small>
                        <br />
                        <small>
                          Price: ₹{Number(item.price).toFixed(2)} each
                        </small>
                      </div>
                      <div className="ms-auto fw-bold">
                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="pt-0">
                    <div className="d-flex justify-content-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span>₹{shippingCharge.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
                      <span>Total:</span>
                      <strong>₹{total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Shipping Address + Feedback */}
            <div className="col-12 col-lg-5 d-flex flex-column gap-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <GrLocation style={{ marginRight: "0.5rem" }} /> Shipping Address
                  </h5>
                  <p className="mb-1 mt-2">{address.addressLine1}</p>
                  <p className="mb-1 mt-2">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                  <p className="mb-1 mt-2">{address.country}</p>
                </div>
              </div>

              {(orderData.feedbackRating || orderData.feedbackComment || (orderData.complaints?.length > 0)) && (
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-3">📄 Feedback</h5>

                    {orderData.feedbackRating && (
                      <div className="mb-3">
                        <strong>Rating: </strong>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} style={{ color: i < orderData.feedbackRating ? '#ffc107' : '#e4e5e9' }}>
                            ★
                          </span>
                        ))}
                        <span className="ms-2">({orderData.feedbackRating}/5)</span>
                      </div>
                    )}

                    {orderData.feedbackComment && (
                      <div className="feedback-comment mb-3">
                        <strong>Comment: </strong>
                        <span style={{ whiteSpace: 'pre-wrap' }}>
                          {orderData.feedbackComment}
                        </span>
                      </div>
                    )}

                    {orderData.complaints?.length > 0 && (
                      <div className="complaints-section">
                        <strong>Complaints: </strong>
                        <button
                          onClick={() => setShowComplaintsModal(true)}
                          className="btn btn-link p-0 ms-2"
                          style={{ textDecoration: 'none' }}
                        >
                          View
                        </button>
                        {orderData.complaints.length > 2 && (
                          <ul className="mt-2 list-unstyled">
                            <li>
                              <button
                                onClick={() => setShowComplaintsModal(true)}
                                className="btn btn-link p-0"
                              >
                                + {orderData.complaints.length - 2} more
                              </button>
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>



          <Modal show={showComplaintsModal} onHide={() => setShowComplaintsModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>All Complaints</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Date</th>
                    <th>Complaint</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.complaints?.map((complaint, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{new Date(complaint.date).toLocaleString()}</td>
                      <td style={{ whiteSpace: 'pre-wrap' }}>{complaint.text}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-secondary"
                onClick={() => setShowComplaintsModal(false)}
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>


          <div className="col-lg-12">
            {orderData.statusHistory?.length > 0 && (
              <div className="card shadow-sm mt-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">⏰ Order Status History</h5>

                  {orderData.awbCode && (
                    <p className="mb-3" style={{ fontSize: "0.95rem", color: "#444" }}>
                      📦 <strong>Track ID:</strong> {orderData.awbCode}
                    </p>
                  )}

                  {orderData.statusHistory
                    .sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds)
                    .map((entry, index) => {
                      const dateObj = entry.timestamp?.toDate?.();
                      const formattedDate = dateObj?.toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });
                      const formattedTime = dateObj?.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      });

                      const badgeColor =
                        {
                          Pending: "warning",
                          Processing: "info",
                          Shipped: "primary",
                          Delivered: "success",
                          Cancelled: "danger",
                        }[entry.status] || "secondary";

                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                        >
                          <span className={`badge bg-${badgeColor} px-3 py-2`}>
                            {entry.status}
                          </span>
                          <small className="text-muted">
                            {formattedDate}, {formattedTime}
                          </small>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* ✅ Feedback Modal */}
        <Modal
          show={showFeedbackModal}
          onHide={() => setShowFeedbackModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Rate & Provide Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Rate your experience:</label>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <FaStar
                        key={starValue}
                        size={24}
                        color={
                          starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                        }
                        style={{ cursor: "pointer", marginRight: 8 }}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Comment:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Leave a Complaint:</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                />
              </div>

              <div className="text-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" className="ms-2">
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;


