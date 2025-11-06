import React, { useState, useEffect } from "react";
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from "../../utils/validators";

const CustomerForm = ({ customer, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || "",
        contact: customer.contact || "",
        email: customer.email || "",
        address: customer.address || "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = "Name is required";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.contact && !validatePhone(formData.contact)) {
      newErrors.contact = "Invalid phone format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="Enter customer name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contact Number
        </label>
        <input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className={`input-field ${errors.contact ? "border-red-500" : ""}`}
          placeholder="+1234567890"
        />
        {errors.contact && (
          <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`input-field ${errors.email ? "border-red-500" : ""}`}
          placeholder="customer@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows="3"
          className="input-field"
          placeholder="Enter customer address"
        />
      </div>

      <div className="flex items-center justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {customer ? "Update Customer" : "Create Customer"}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
