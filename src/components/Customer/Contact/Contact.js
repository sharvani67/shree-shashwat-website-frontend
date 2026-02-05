import React, { useState } from "react";
import "./ContactUs.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import backgroundImg from "../../../assets/pic7.webp";
import WhatApp from "../../Customer/WhatsApp/WhatApp";
import baseURL from "../../Api/Api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "", // Changed from 'phone' to 'phone' to match your form
    email: "",
    additional_message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contact",
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({
          full_name: "",
          phone: "",
          email: "",
          additional_message: "",
        });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <>
      <Header />
      <WhatApp />
      <div className="contact-container container my-5">
        {/* Intro */}
        <div className="contact-intro text-center mb-5">
          <h1 className="main-heading">Contact Us</h1>
          <p className="main-heading-para lead">
            We'd love to hear from you! Reach out with questions, feedback, or
            just to say hello.
          </p>
        </div>

        <div className="row">
          {/* Contact Info */}
          <div className="col-md-6 mb-4">
            <h2 className="headings mb-4">Get in Touch</h2>

            <p className="paragraph">
              Email us or give us a call — we're here to help you with your
              inquiries.
            </p>

            <div className="row">
              <div className="col-md-6">
                <div className="contact-info-box shadow-sm p-3 mb-3 rounded d-flex align-items-start gap-3">
                  <i className="bi bi-telephone-fill fs-4 text-primary"></i>
                  <div>
                    <h6 className="mb-1 fw-bold">Phone</h6>
                    <p className="mb-1 fw-bold">
                      <a
                        href="tel:+918971607888"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                      >
                        8971607888
                      </a>{" "}
                      /
                      <a
                        href="tel:+916363900869"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                      >
                        6363900869
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="contact-info-box shadow-sm p-3 mb-3 rounded d-flex align-items-start gap-3">
                  <i className="bi bi-envelope-fill fs-4 text-success"></i>
                  <div>
                    <h6 className="mb-1 fw-bold">Email</h6>
                    <p className="mb-1 fw-bold">
                      <a
                        href="mailto:contact@southsutra.com"
                        className="text-dark text-decoration-none"
                      >
                        contact@southsutra.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="contact-info-box shadow-sm p-3 mb-3 rounded d-flex align-items-start gap-3">
                  <i className="bi bi-geo-alt-fill fs-4 text-danger"></i>
                  <div>
                    <h6 className="mb-1 fw-bold">Address</h6>
                    <p className="mb-1 fw-bold">
                      <a
                        href="https://www.google.com/maps/place/INFAB+AGRO+FOODS+Pvt+Ltd/@12.851496,77.427808,15z/data=!4m6!3m5!1s0x3bae470e75af475f:0xb22c3774f5b66a7b!8m2!3d12.8514961!4d77.4278077!16s%2Fg%2F11xyfjrctt?hl=en&entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-dark text-decoration-none"
                      >
                        INFAB AGRO FOODS Pvt Ltd #125/3 Kanminike Village
                        Hejjala Circle South Taluk Bangalore-562109
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="map-section position-relative">
                  {/* Overlay div to prevent accidental navigation */}
                  <div
                    className="map-overlay position-absolute top-0 start-0 w-100 h-100"
                    style={{ zIndex: 1, cursor: "pointer" }}
                    onClick={(e) => (e.currentTarget.style.display = "none")} // remove overlay on click
                  ></div>

                  <iframe
                    title="Google Map"
                    className="map-iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.8726438065314!2d77.42523277454477!3d12.85150131750107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae470e75af475f%3A0xb22c3774f5b66a7b!2sINFAB%20AGRO%20FOODS%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1757151274938!5m2!1sen!2sin"
                    width="100%"
                    height="240"
                    style={{ border: "0" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-md-6">
            <div
              className="contact-card-wrapper"
              style={{
                backgroundImage: `url(${backgroundImg})`,
              }}
            >
              <div className="card shadow-lg p-4 contact-card text-white">
                <h2 className="contact-heading">Send a Message</h2>

                {submissionStatus === "success" && (
                  <div className="alert alert-success">
                    Thank you! Your message has been submitted successfully.
                  </div>
                )}
                {submissionStatus === "error" && (
                  <div className="alert alert-danger">
                    There was an error submitting your form. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-white">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone Number"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-white">Message</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="additional_message"
                      value={formData.additional_message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="button"
                    style={{ backgroundColor: "#cc4b00", border: "none" }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="map-section">
              <h2 style={{ color: '#a36e29' }}>Get In Touch With Us Here</h2>
              <iframe
                title="Google Map"
                className="map-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4452412.0471640555!2d79.23834590865125!3d23.59475824073139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed570068927c97%3A0x9c1be088d416388d!2sFlavor%20Town%20%7C%20Multi%20Cuisine%20Restaurant!5e0!3m2!1sen!2sin!4v1748197174997!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default ContactUs;
