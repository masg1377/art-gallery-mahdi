import "./AddressModal.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useAuth } from "../../../../contexts/AuthProvider.js";
import { addAddressService } from "../../../../services/address-services/addAddressService";
import { updateAddressService } from "../../../../services/address-services/updateAddressService";

export const AddressModal = () => {
  const { auth } = useAuth();
  const { dispatch } = useUserData();
  const {
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const dummyAddress = {
    name: "Aniket Saini",
    street: "66/6B Main Post Office",
    city: "Roorkee",
    state: "Uttarakhand",
    country: "India",
    pincode: "247667",
    phone: "963-906-0737",
  };

  const handleClose = () => {
    setShow(false);
     // Wait for the animation to complete before toggling the modal off
     setTimeout(() => setIsAddressModalOpen(false), 300); // Match this duration with your CSS transition
   };

  // Validation function: returns an error message if validation fails, or empty string if all good.
  const validateForm = () => {
    if (!addressForm.name.trim()) return "Name is required.";
    if (addressForm.name.trim().length < 3)
      return "Name must be at least 3 characters.";
    if (addressForm.street.trim().length < 5)
      return "Street address must be at least 5 characters.";
    if (!/^[A-Za-z\s]+$/.test(addressForm.city.trim()))
      return "City must contain only letters.";
    if (!/^[A-Za-z\s]+$/.test(addressForm.state.trim()))
      return "State must contain only letters.";
    if (!/^\d{5,6}$/.test(addressForm.pincode.trim()))
      return "ZIP Code must be 5 or 6 digits.";
    if (!/^\+?[0-9\s-]{8,15}$/.test(addressForm.phone.trim()))
      return "Invalid phone number format.";
    return "";
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform validation before submitting
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError)
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      const service = isEdit ? updateAddressService : addAddressService;
      const response = await service(addressForm, auth.token);

      // If editing, expect a 200 status code; if adding a new address, expect 201
      if (response.status === (isEdit ? 200 : 201)) {
        toast.success(`Address ${isEdit ? "updated" : "added"} successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
        handleClose();
        setIsEdit(false);
        
        // Reset form fields
        setAddressForm({
          name: "",
          street: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`address-modal-container ${show ? "fade-in" : "fade-out"}`}>
      <div
        className={`address-input-container ${show ? "slide-in" : "slide-out"}`}
      >
        <h1>Address Form</h1>
        {error && <p className="error-message">{error}</p>}

        {/* Address Form */}
        <form onSubmit={handleSubmit} className="input-container">
          {/* Name Field */}
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={addressForm.name}
              required
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
              placeholder="e.g., John Doe"
            />
          </div>

          {/* Street Field */}
          <div className="input-group">
            <label htmlFor="street">Street Address</label>
            <input
              id="street"
              name="street"
              value={addressForm.street}
              required
              onChange={(e) =>
                setAddressForm({ ...addressForm, street: e.target.value })
              }
              placeholder="e.g., 123 Main St, Apt 4B"
            />
          </div>

          {/* City & State (Side by Side) */}
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={addressForm.city}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, city: e.target.value })
                }
                placeholder="e.g., New York"
              />
            </div>
            <div className="input-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                value={addressForm.state}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, state: e.target.value })
                }
                placeholder="e.g., NY"
              />
            </div>
          </div>

          {/* Country & Pincode (Side by Side) */}
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                value={addressForm.country}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, country: e.target.value })
                }
                placeholder="e.g., United States"
              />
            </div>
            <div className="input-group">
              <label htmlFor="pincode">ZIP Code</label>
              <input
                id="pincode"
                name="pincode"
                value={addressForm.pincode}
                required
                onChange={(e) =>
                  setAddressForm({ ...addressForm, pincode: e.target.value })
                }
                placeholder="e.g., 10001"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              value={addressForm.phone}
              required
              minLength="8"
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
              placeholder="e.g., +1 555-123-4567"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        {/* Action buttons */}
        <div className="btn-container">
          <button onClick={() => handleClose()}>Cancel</button>
          <button
            onClick={() => {
              setAddressForm(dummyAddress);
            }}
          >
            Add Dummy Data
          </button>
        </div>
      </div>
    </div>
  );
};
