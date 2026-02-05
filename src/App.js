import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Customer/Home/Home";
import Gallery from "./components/Customer/Gallery/Gallery";
import Products from "./components/Customer/Products/Products";
import AboutUs from "./components/Customer/AboutUs/AboutUs";
import ContactUs from "./components/Customer/Contact/Contact";
import CheckOut from "./components/Customer/CheckOut/CheckOut";
import BuyNow from "./components/Customer/BuyNow/BuyNow";
import WishList from "./components/Customer/Wishlist/Wishlist";
import MyOrders from "./components/Customer/MyOrders/MyOrders";
import Login from "./components/Pages/Login/Login";
import SignUp from "./components/Pages/SignUp/SignUp";
import Viewdetails from "./components/Customer/Viewdetails/Viewdetails";
import AdminViewdetails from "./components/Admin/ViewDetails/ViewDetails";
import ShoppingCart from "./components/Customer/Shoppingcart/Shoppingcart";
import Termsandconditions from "./components/Customer/Termsandconditions/Termsandconditions";
import Refundpolicy from "./components/Customer/Refundpolicy/Refundpolicy";
import AdminRefundpolicy from "./components/Admin/Refundpolicy/Refundpolicy";
import AdminTermsandconditions from "./components/Admin/Termsandconditions/Termsandconditions";
import FAQ from "./components/FAQ/FAQ";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { CartProvider } from "./components/AuthContext/CartContext";
import { WishlistProvider } from "./components/AuthContext/WishlistContext";
import AdminLogin from "./components/Admin/Login/Login";
import AdminHome from "./components/Admin/Home/Home";
import AdminProducts from "./components/Admin/Products/Products";
import AdminAboutUs from "./components/Admin/AboutUs/AboutUs";
import AdminOrders from "./components/Admin/Orders/Orders";
import AdminOrderDetails from "./components/Admin/Orders/OrderDetails";
import ProductUpload from "./components/ProductUpload";
import ForgotPassword from "./components/Pages/ForgotPassword/ForgotPassword";
import EcommerceCarousel from "./components/Home/Carousel";
import Orders from "./components/Customer/Home/Orders";
import ProfilePage from "./components/Customer/Profile/Profile";
import AdminProfilePage from "./components/Admin/Profile/Profile";
import OrderDetails from "./components/Home/OrderDetails";
import CustomerOrderDetails from "./components/Customer/MyOrders/OrderDetails";
import TrackingOrderDetails from "./components/Customer/MyOrders/TrackingOrderDetails";
import AddProductForm from "./components/Admin/AddProduct";
import AddWishlistForm from './components/Admin/AddWishlist';
import BulkOrderInquiry from "./components/BulkOrderInquiry";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Feedback from "./components/Customer/MyOrders/Feedback";
import Customers from "./components/Admin/Customers/Customers";
import AddressFormPage from "./components/Customer/Profile/AddressFormPage";
import ShippingPolicy from './components/Customer/Termsandconditions/ShippingPolicy';
import AdminShippingPolicy from './components/Admin/Termsandconditions/ShippingPolicy';
import PrivacyPolicy from './components/Customer/PrivacyPolicy/PrivacyPolicy';
import AdminPrivacyPolicy from './components/Admin/PrivacyPolicy/PrivacyPolicy';
import CustomerOrders from './components/Admin/Customers/CustomerOrders'
import StickyOfferStrip from "./components/Customer/StickyOfferStrip";
import TestingCheckOut from "./components/Customer/CheckOut/TestingCheckOut";
import TestingBuyNow from "./components/Customer/BuyNow/TestingBuyNow";
import Lalbaghflower from "./components/lalbagh/lalbaghflower.tsx";
import FeedbackTable from "./components/Visitor/FeedbackTable.jsx";
import FeedbackForm from "./components/Visitor/Form/Form.jsx";
import usePageTracking from "./usepageTracking.js";
function AppContent() {
  const location = useLocation();
   // ✅ Track page changes
  usePageTracking();

   const hideStickyOfferRoutes = [
    "/Login",
    "/signup",
    "/forgot-password",
    "/a-login",
    "/Lalbagh-flower-show-promotion",
    "/Lalbagh-flower-show-visitor",
    "/Lalbagh-flower-show-visitorForm",
  ];

  const shouldHideStickyOffer = hideStickyOfferRoutes.includes(location.pathname);

  return (
    <>
       {!shouldHideStickyOffer && <StickyOfferStrip />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Lalbagh-flower-show-promotion" element={<Lalbaghflower />} />
        <Route path="/Lalbagh-flower-show-visitor" element={<FeedbackTable />} />
        <Route path="/Lalbagh-flower-show-visitorForm" element={<FeedbackForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/buynow/:id" element={<BuyNow />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/ordersDetails/:orderId" element={<CustomerOrderDetails />} />
        <Route path="/trackingordersDetails/:orderId" element={<TrackingOrderDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/a-login" element={<AdminLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/viewdetails/:id" element={<Viewdetails />} />
        <Route path="/a-viewdetails/:id" element={<AdminViewdetails />} />
        <Route path="/Shoppingcart" element={<ShoppingCart />} />
        <Route path="/Termsandconditions" element={<Termsandconditions />} />
        <Route path="/refundpolicy" element={<Refundpolicy />} />
        <Route path="/a-Termsandconditions" element={<AdminTermsandconditions />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/a-products" element={<AdminProducts />} />
        <Route path="/a-aboutus" element={<AdminAboutUs />} />
        <Route path="/a-orders" element={<AdminOrders />} />
        <Route path="/a-ordersDetails/:orderId" element={<AdminOrderDetails />} />
        <Route path="/uploadproducts" element={<ProductUpload />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/carousel" element={<EcommerceCarousel />} />
        <Route path="/orderdetails" element={<OrderDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/a-profile" element={<AdminProfilePage />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/add-wishlist" element={<AddWishlistForm />} />
        <Route path="/bulk-order-form" element={<BulkOrderInquiry />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/a-dashboard" element={<Dashboard />} />
        <Route path="/a-customers" element={<Customers />} />
        <Route path="/address-form" element={<AddressFormPage />} />
        <Route path="/shippingpolicy" element={<ShippingPolicy />} />
        <Route path="/a-shippingpolicy" element={<AdminShippingPolicy />} />
        <Route path="/a-refundpolicy" element={<AdminRefundpolicy />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/a-privacypolicy" element={<AdminPrivacyPolicy />} />
        <Route path="/customer-orders/:customerId" element={<CustomerOrders />} />
        <Route path="/internal_testing_checkout_v1" element={<TestingCheckOut />} />
        <Route path="/internal_testing_product_v1" element={<TestingBuyNow />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;