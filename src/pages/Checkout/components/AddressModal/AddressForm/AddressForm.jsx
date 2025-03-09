import React from 'react'

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
          value={addressForm.name}
          onChange={(e) =>
            setAddressForm({ ...addressForm, name: e.target.value })
          }
          placeholder="e.g., John Doe"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      {/* Street Field */}
      <div className="input-group">
        <label htmlFor="street">Street Address</label>
        <input
          id="street"
          name="street"
          value={addressForm.street}
          onChange={(e) =>
            setAddressForm({ ...addressForm, street: e.target.value })
          }
          placeholder="e.g., 123 Main St, Apt 4B"
        />
        {errors.street && <p className="error-message">{errors.street}</p>}
      </div>

      {/* City & State */}
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={addressForm.city}
            onChange={(e) =>
              setAddressForm({ ...addressForm, city: e.target.value })
            }
            placeholder="e.g., New York"
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="state">State</label>
          <input
            id="state"
            name="state"
            value={addressForm.state}
            onChange={(e) =>
              setAddressForm({ ...addressForm, state: e.target.value })
            }
            placeholder="e.g., NY"
          />
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
      </div>

      {/* Country & Pincode */}
      <div className="input-row">
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            value={addressForm.country}
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
            onChange={(e) =>
              setAddressForm({ ...addressForm, pincode: e.target.value })
            }
            placeholder="e.g., 10001"
          />
          {errors.pincode && <p className="error-message">{errors.pincode}</p>}
        </div>
      </div>

      {/* Phone Field */}
      <div className="input-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          value={addressForm.phone}
          onChange={(e) =>
            setAddressForm({ ...addressForm, phone: e.target.value })
          }
          placeholder="e.g., +1 555-123-4567"
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

