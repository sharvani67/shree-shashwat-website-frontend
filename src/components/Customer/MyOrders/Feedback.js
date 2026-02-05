import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar } from "react-icons/fa";

function FeedbackForm({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [isComplaint, setIsComplaint] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      rating,
      comment,
      isComplaint,
    };
    console.log("Feedback Submitted:", data);
    alert("Thank you for your feedback!");
    onClose?.(); // Close modal after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Star Rating */}
      <div className="mb-3">
        <label className="form-label">Your Rating</label>
        <div>
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                  style={{ display: "none" }}
                />
                <FaStar
                  size={24}
                  color={currentRating <= (hover || rating) ? "#ff8800" : "#ccc"}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Comment Box */}
      <div className="mb-3">
        <label htmlFor="comments" className="form-label">Your Comments</label>
        <textarea
          id="comments"
          className="form-control"
          placeholder="Tell us about your experience..."
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-outline-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-warning text-white">
          Submit Feedback
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
