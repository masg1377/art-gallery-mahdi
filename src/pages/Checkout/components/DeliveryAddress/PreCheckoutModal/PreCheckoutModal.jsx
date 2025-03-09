import toast from "react-hot-toast";
import "./PreCheckoutModal.css";
import React, { useEffect, useState } from "react";

export const PreCheckoutModal = ({
  onToggle,
  startPayment,
  totalAmount,
  totalAmountWithDiscount,
  orderAddress,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
   setShow(false);
    // Wait for the animation to complete before toggling the modal off
    setTimeout(() => onToggle(false), 300); // Match this duration with your CSS transition
  };

  return (
    <div
      className={`pre-checkout-modal-overlay ${show ? "fade-in" : "fade-out"}`}
    >
      <div
        className={`pre-checkout-modal-content ${
          show ? "slide-in" : "slide-out"
        }`}
      >
        <h2>Confirm Your Order</h2>

        <div className="pre-checkout-price-details">
          <p>
            <strong>Original Price:</strong>{" "}
            <span className="total-amount-highlight">${totalAmount}</span>
          </p>
          <p>
            <strong>Discounted Price:</strong>{" "}
            <span className="total-with-discount-highlight">
              ${totalAmountWithDiscount}
            </span>
          </p>
        </div>

        {orderAddress && (
          <div className="address-details-pre-modal">
            <h3 className="pre-checkout-delivery-title">Delivering To:</h3>
            <p>
              <strong>Name:</strong> {orderAddress?.name}
            </p>
            <p>
              <strong>Address:</strong> {orderAddress?.street},{" "}
              {orderAddress?.city}, {orderAddress?.state},{" "}
              {orderAddress?.country}, {orderAddress?.pincode}
            </p>
            <p>
              <strong>Phone:</strong> {orderAddress?.phone}
            </p>
          </div>
        )}

        <div className="pre-checkout-modal-actions">
          <button
            onClick={() => handleClose()}
            className="pre-checkout-cancel-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (orderAddress) {
                startPayment();
                handleClose();
              } else toast.error("Please select an address first!");
            }}
            className="pre-checkout-confirm-btn"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};
