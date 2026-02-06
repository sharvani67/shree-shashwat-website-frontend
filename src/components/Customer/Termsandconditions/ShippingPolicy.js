import React from 'react';
import { FaInfoCircle, FaShippingFast , FaRegClock , FaMapMarkedAlt , FaDollarSign , FaHourglassHalf , FaMoneyBillAlt , FaGlobe , FaSearchLocation , FaQuestionCircle  } from 'react-icons/fa';
import './TermsAndConditions.css'; // Import the CSS file
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="container my-5" style={{ maxWidth: '900px', marginTop: '500px' }}>
        <div className="card shadow-lg rounded-4 border-0">
          <div className="policy-card-header  text-white rounded-top p-4">
            <h1 className="mb-0">Shipping Policy</h1>
            <small className="fst-italic">SHREE SHASHWATHRAJ - Supplying Quality Groceries with Trust</small>
          </div>
          <div className="card-body p-4" style={{ backgroundColor: '#f8f9fa', backgroundImage: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}>
            <p className="lead">
             Thank you for shopping at SouthSutra! Here are the details of our shipping policy:
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaInfoCircle className="me-2" />1. Processing Time</h4>
            <p>
             Orders are typically processed and shipped within 1 to 2 business days from the date of purchase. Business days exclude weekends and major holidays. Please note that this processing time may vary during busy periods or holidays.
            </p>
            <p>After shipping, the product will be delivered within <b>5 to 7 business days</b>, depending on your location and courier service.</p>

            <h4 className="mt-4 mb-3 text-color"><FaShippingFast  className="me-2" />2. Shipping Methods</h4>
            <p>
              We primarily use reputable shipping carriers such as Shiprocket for domestic and international shipments. The delivery time varies depending on the shipping method selected at checkout and the destination.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaRegClock  className="me-2" />3. Estimated Delivery Time</h4>
            <p>
              The estimated delivery time is based on the shipping carrier's standard delivery timeframe once the order has been shipped. This timeframe may vary depending on factors such as customs processing, delivery location, and peak periods (e.g., holidays).
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaMapMarkedAlt  className="me-2" />4. Tracking Information</h4>
            <p>
             Once your order has been shipped, you will receive a shipping confirmation email containing tracking information. You can track your package using the provided tracking number on the respective carrier's website.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaDollarSign  className="me-2" />5. Shipping Rates</h4>
            <p>
              Shipping rates are calculated at checkout based on the weight of the items ordered, the destination address, and the selected shipping method. We offer competitive shipping rates and occasionally run promotions with free shipping on orders over a certain amount. Any applicable shipping fees will be displayed during the checkout process.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaMoneyBillAlt  className="me-2" />6. Cash on Delivery (COD): </h4>
            <p>
              We offer Cash on Delivery (COD) as a payment option for eligible orders. With COD, you can pay for your order in cash upon delivery. Please note that COD availability may vary based on your location and order eligibility.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaGlobe  className="me-2" />7. International Shipping</h4>
            <p>
              We offer international shipping to select countries. Please note that international shipments may be subject to customs duties, taxes, and fees imposed by the destination country. These charges are typically the responsibility of the recipient and are not included in the shipping cost at checkout.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaSearchLocation  className="me-2" />8. Order Tracking</h4>
            <p>
              For updates on the status of your order, you can visit our website and enter your order number and email address in the Order Tracking section. Alternatively, you can contact our customer support team at [Your Contact Information] for assistance.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaHourglassHalf   className="me-2" />8. Shipping Delays</h4>
            <p>
              While we strive to ensure timely delivery of all orders, please understand that unforeseen circumstances such as weather delays or carrier operational issues may occasionally cause shipping delays beyond our control. In such cases, we will notify you promptly regarding any anticipated delays and work diligently to resolve any issues.
            </p>

            <h4 className="mt-4 mb-3 text-color"><FaQuestionCircle  className="me-2" />9. Questions</h4>
            <p>
              If you have any questions about our shipping policy, please feel free to contact us at spmathur56@gmail.com Our customer service team is available daily from 9:00 AM to 10:00 PM to assist you.
            </p>
          </div>
          <div className="card-footer text-center bg-light rounded-bottom py-3">
            <a href="/" className="btn btn-success btn-sm px-4">
              Back to Home
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
