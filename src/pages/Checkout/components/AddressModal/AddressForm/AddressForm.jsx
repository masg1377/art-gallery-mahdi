import React from "react";

export const AddressForm = ({
  handleSubmit,
  setAddressForm,
  addressForm,
  loading,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} className="input-container">
      {/* Name Field */}
      <div className="input-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={addressForm.name} // Binding the input value to the form state
          onChange={(e) =>
            // Updating the form state when the name field changes
            setAddressForm({ ...addressForm, name: e.target.value })
          }
          placeholder="e.g., John Doe"
        />
        {/* Displaying error message for the 'name' field if there's an error */}
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      {/* Street Field */}
      <div className="input-group">
        <label htmlFor="street">Street Address</label>
        <input
          id="street"
          name="street"
          value={addressForm.street} // Binding the street input value to the state
          onChange={(e) =>
            // Updating the form state when the street field changes
            setAddressForm({ ...addressForm, street: e.target.value })
          }
          placeholder="e.g., 123 Main St, Apt 4B"
        />
        {/* Displaying error message for the 'street' field if there's an error */}
        {errors.street && <p className="error-message">{errors.street}</p>}
      </div>

      {/* City & State Fields */}
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={addressForm.city} // Binding the city input value to the state
            onChange={(e) =>
              // Updating the form state when the city field changes
              setAddressForm({ ...addressForm, city: e.target.value })
            }
            placeholder="e.g., New York"
          />
          {/* Displaying error message for the 'city' field if there's an error */}
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={addressForm.state} // Binding the state input value to the state
            onChange={(e) =>
              // Updating the form state when the state field changes
              setAddressForm({ ...addressForm, state: e.target.value })
            }
            placeholder="e.g., NY"
          />
          {/* Displaying error message for the 'state' field if there's an error */}
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
      </div>

      {/* Country & Pincode Fields */}
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={addressForm.country} // Binding the country input value to the state
            onChange={(e) =>
              // Updating the form state when the country field changes
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
            value={addressForm.pincode} // Binding the pincode input value to the state
            onChange={(e) =>
              // Updating the form state when the pincode field changes
              setAddressForm({ ...addressForm, pincode: e.target.value })
            }
            placeholder="e.g., 10001"
          />
          {/* Displaying error message for the 'pincode' field if there's an error */}
          {errors.pincode && <p className="error-message">{errors.pincode}</p>}
        </div>
      </div>

      {/* Phone Field */}
      <div className="input-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          value={addressForm.phone} // Binding the phone input value to the state
          onChange={(e) =>
            // Updating the form state when the phone field changes
            setAddressForm({ ...addressForm, phone: e.target.value })
          }
          placeholder="e.g., +1 555-123-4567"
        />
        {/* Displaying error message for the 'phone' field if there's an error */}
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn" disabled={loading}>
        {/* Button text changes based on the loading state */}
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};
