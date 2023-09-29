
import React from 'react';

const SuccessPopup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>Product added successfully!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
