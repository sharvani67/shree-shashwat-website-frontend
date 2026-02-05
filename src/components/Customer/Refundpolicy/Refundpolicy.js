import React from 'react';
import {
  FaUndo, FaEnvelope, FaTruck, FaExclamationCircle, FaTimesCircle,
  FaRegCheckCircle, FaSyncAlt, FaMoneyBillWave
} from 'react-icons/fa';
import './Refundpolicy.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Refundpolicy = () => {
  return (
    <>
    <Header/>
    <div className="Refundpolicy-container container my-5" style={{ maxWidth: '900px', marginTop: '100px' }}>
      <div className="Refundpolicy-card shadow-lg rounded-4 border-0">
        <div className="policy-card-header text-white rounded-top p-4">
          <h1 className="mb-0">Refund Policy</h1>
          <small className="fst-italic">South Sutra - Authentic Masala & Chili Powders</small>
        </div>

        <div className="Refundpolicy-body p-4" style={{ backgroundColor: '#f8f9fa', backgroundImage: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)' }}>
          <p className="lead">
            We have a <strong>7-day return policy</strong>, which means you have 7 days after receiving your item to request a return.
          </p>

          <h4 className="mt-4 mb-3 text-color"><FaUndo className="me-2" />Return Eligibility Requirements:</h4>
          <ul>
            <li>The item must be in the same condition as when you received it.</li>
            <li>It must be unused.</li>
            <li>It should be in its original, unopened packaging.</li>
            <li>You need to provide the receipt or proof of purchase.</li>
          </ul>

          <h4 className="mt-4 mb-3 text-color"><FaExclamationCircle className="me-2" />Additional Requirements for Returns:</h4>
          <ul>
            <li>If the package has been opened, you must provide:</li>
            <ul>
              <li>A video or images of all angles of the unopened package as received.</li>
              <li>A video of the opening process and displaying the product.</li>
              <li>These videos must be unedited, a single video.</li>
            </ul>
          </ul>

          <h4 className="mt-4 mb-3 text-color"><FaTimesCircle className="me-2" />Non-Returnable Circumstances:</h4>
          <ul>
            <li>Returns will not be processed if the product was ordered correctly but was mistakenly ordered by the client.</li>
            <li>However, you can still request assistance and the company will offer support as best as they can.</li>
          </ul>

          <h4 className="mt-4 mb-3 text-color"><FaEnvelope className="me-2" />To start a return:</h4>
          <p>
            You can contact us at <a href="mailto:contact@southsutra.com" className="text-color text-decoration-underline">contact@southsutra.com</a>. Please note that returns will need to be sent to the following address:
          </p>
          <p>
            <strong>INFAB AGRO FOODS pvt ltd #125/3 Kanminike Village Hejjala Circle South Taluk Bangalore-562109</strong>
          </p>

          
          <p>
            If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package.
            Items sent back to us without first requesting a return will not be accepted.
          </p>
          <p>
            You can always contact us for any return process questions at <a href="mailto:contact@southsutra.com" className="text-color text-decoration-underline">contact@southsutra.com</a>.
          </p>

          <h4 className="mt-4 mb-3 text-color"><FaRegCheckCircle className="me-2" />Damages and Issues:</h4>
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item,
            so that we can evaluate the issue and make it right.
          </p>

          <h4 className="mt-4 mb-3 text-color"><FaExclamationCircle className="me-2" />Exceptions / Non-returnable Items:</h4>
          <p>
            Certain types of items cannot be returned, such as custom products (such as special orders or personalized items) etc.
            We also do not accept returns for hazardous materials, flammable liquids, or gases.
            Please get in touch if you have questions or concerns about your specific item.
          </p>
          <p>
            Unfortunately, we cannot accept returns on discounted items, sale items, items purchased with coupon/s or gift cards.
          </p>

          <h4 className="mt-4 mb-3 text-color"><FaSyncAlt className="me-2" />Exchanges:</h4>
          <p>
           The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
           
          </p>
           <p> Please note that the exchange or replacement product will be delivered within 7 to 10 business days after the return is approved.</p>

          <h4 className="mt-4 mb-3 text-color"><FaMoneyBillWave className="me-2" />Refunds:</h4>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not.
            If approved, you’ll be automatically credited on your original payment method within 10 business days.
            Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
          <p>
            If more than 15 business days have passed since we’ve approved your return,
            please contact us at <a href="mailto:contact@southsutra.com" className="text-color text-decoration-underline">contact@southsutra.com</a>.
          </p>
        </div>

        <div className="Refundpolicy-footer text-center bg-light rounded-bottom py-3">
          <a href="/" className="btn btn-success btn-sm px-4">
            Back to Home
          </a>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Refundpolicy;
