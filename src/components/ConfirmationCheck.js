// ConfirmationCheck.js
import React from "react";
import "../ConfirmationCheck.css"; // Make sure to import the correct CSS file

const ConfirmationCheck = () => {
  return (
    <div className="confirmation-container">
      <div className="confirmation-icon">
        <svg viewBox="0 0 52 52" className="checkmark">
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
        </svg>
      </div>
      <p className="confirmation-text">Confirmed!</p>
    </div>
  );
};

export default ConfirmationCheck;
