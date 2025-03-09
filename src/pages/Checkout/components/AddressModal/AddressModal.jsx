import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useAuth } from "../../../../contexts/AuthProvider.js";
import { addAddressService } from "../../../../services/address-services/addAddressService";
import { updateAddressService } from "../../../../services/address-services/updateAddressService";
import "./AddressModal.css";
import { AddressForm } from "./AddressForm/AddressForm.jsx";

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
  const [errors, setErrors] = useState({});

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
    setTimeout(() => setIsAddressModalOpen(false), 300);
  };

  // Validation function
  const validateForm = () => {
    let newErrors = {};
    if (!addressForm.name.trim()) newErrors.name = "Name is required.";
    else if (addressForm.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!addressForm.street.trim() || addressForm.street.trim().length < 5)
      newErrors.street = "Street must be at least 5 characters.";

    if (!/^[A-Za-z\s]+$/.test(addressForm.city.trim()))
      newErrors.city = "City must contain only letters.";

    if (!/^[A-Za-z\s]+$/.test(addressForm.state.trim()))
      newErrors.state = "State must contain only letters.";

    if (!/^\d{5,6}$/.test(addressForm.pincode.trim()))
      newErrors.pincode = "ZIP Code must be 5 or 6 digits.";

    if (!/^\+?[0-9\s-]{8,15}$/.test(addressForm.phone.trim()))
      newErrors.phone = "Invalid phone number format.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const service = isEdit ? updateAddressService : addAddressService;
      const response = await service(addressForm, auth.token);

      if (response.status === (isEdit ? 200 : 201)) {
        toast.success(`Address ${isEdit ? "updated" : "added"} successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
        handleClose();
        setIsEdit(false);

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
      toast.error("Something went wrong! Please try again.");
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

        {/* Address Form */}
        <AddressForm
          addressForm={addressForm}
          handleSubmit={handleSubmit}
          loading={loading}
          setAddressForm={setAddressForm}
          errors={errors}
        />

        {/* Action buttons */}
        <div className="btn-container">
          <button onClick={() => handleClose()}>Cancel</button>
          <button onClick={() => setAddressForm(dummyAddress)}>
            Add Dummy Data
          </button>
        </div>
      </div>
    </div>
  );
};
