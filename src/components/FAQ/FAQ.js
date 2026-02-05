import React, { useState } from "react";
import "./FAQ.css";
import Header from '../Customer/Header/Header';
import Footer from '../Customer/Footer/Footer';

const faqData = [
 {
    id: 1,
    question: "What makes your masalas and pickles different from store-bought ones?",
    answer:
      "Our masalas and pickles are handcrafted in small batches using age-old family recipes passed down through generations. Unlike mass-produced products, each jar is made with love, care, and handpicked farm-fresh ingredients—ensuring both purity and authenticity.",
  },
  {
    id: 2,
    question: "Who makes your products?",
    answer:
      "Our products are proudly made by local women, many of whom are homemakers turned artisans. We provide them with fair wages, training, and a safe workspace, creating not just quality products but also empowering lives.",
  },
  {
    id: 3,
    question: "Are your ingredients natural and preservative-free?",
    answer:
      "Yes, absolutely. We source all our ingredients directly from trusted farms and use no artificial preservatives or additives. Every blend is pure, natural, and full of traditional flavor.",
  },
  {
    id: 4,
    question: "How do you ensure hygiene and consistency?",
    answer:
      "We follow strict hygiene practices during every step—from sourcing and preparation to packaging. Our team is trained to maintain cleanliness, quality control, and uniform taste in every batch.",
  },
  {
    id: 5,
    question: "Do you ship across India?",
    answer:
      "Yes, we deliver our products across India. Whether you're in a metro city or a small town, we ensure your order reaches you fresh and securely packed.",
  },
  {
    id: 6,
    question: "How can I support your mission?",
    answer:
      "By simply choosing our products, you’re already supporting a growing community of women entrepreneurs. You can also spread the word, leave reviews, and share your experience with friends and family.",
  },
  {
  id: 7,
  question: "Are your products suitable for people with dietary restrictions?",
  answer:
    "Yes. Many of our masalas are gluten-free, vegan, and made without common allergens. However, we recommend checking the individual product label or contacting us if you have specific dietary needs.",
},
{
  id: 8,
  question: "How long do your pickles and masalas stay fresh?",
  answer:
    "When stored properly in a cool, dry place, our masalas stay fresh for up to 12 months, and pickles can last up to 18 months. Always use a dry spoon and keep jars tightly sealed to maintain freshness.",
},
{
  id: 9,
  question: "Where are your products made?",
  answer:
    "All our products are made in our local facility located in a small village, where traditional methods and modern hygiene standards go hand in hand.",
},
{
  id: 10,
  question: "Can I customize an order or request bulk quantities?",
  answer:
    "Yes, we offer bulk orders for events, gifting, or retail. You can also request customization for certain products. Please reach out to us directly for more details.",
},
{
  id: 11,
  question: "Do you offer gift packs or festive hampers?",
  answer:
    "Absolutely! We curate beautiful gift hampers perfect for festivals, weddings, or corporate gifting. They include a mix of our best-selling masalas and pickles, packaged with love.",
},
{
  id: 12,
  question: "How can I contact you for feedback or suggestions?",
  answer:
    "We love hearing from our customers. You can reach out via our contact page, email us directly, or connect with us on social media. Your feedback helps us grow!",
},
];

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <>
      <Header />

      <div className="container FQA-heading text-center">
        <h2 className="mb-3 FAQ-title display-5 fw-bold">Frequently Asked Questions</h2>
         <p class="faq-subtitle">
    Find answers to common questions about our services, process, and support.
  </p>
        {faqData.map(({ id, question, answer }) => (
          <div className="row mb-3" key={id}>
            <div className="col-lg-1"></div>
            <div className="col-lg-10 col-md-12 col-sm-12">
              <div
                className={`question ${activeId === id ? "highlighted" : ""}`}
                onClick={() => toggleFAQ(id)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                <h6 className="d-inline">{question}</h6>
                <span className="float-end">
                  {activeId === id ? (
                    <button className="close-button">-</button>
                  ) : (
                    <button className="toggle-button">+</button>
                  )}
                </span>
              </div>
              <div className={`answer ${activeId === id ? "active" : ""}`}>
                {activeId === id && <p>{answer}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FAQ;
