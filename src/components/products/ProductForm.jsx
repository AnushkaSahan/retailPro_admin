import React, { useState, useEffect } from "react";
import {
  validateRequired,
  validatePrice,
  validateQuantity,
} from "../../utils/validators";

const ProductForm = ({ product, categories, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    categoryId: "",
    unitPrice: "",
    stockQty: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        barcode: product.barcode || "",
        categoryId: product.category?.id || "",
        unitPrice: product.unitPrice || "",
        stockQty: product.stockQty || "",
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = "Product name is required";
    }

    if (!validateRequired(formData.categoryId)) {
      newErrors.categoryId = "Category is required";
    }

    if (!validatePrice(formData.unitPrice)) {
      newErrors.unitPrice = "Enter a valid price";
    }

    if (!validateQuantity(formData.stockQty)) {
      newErrors.stockQty = "Enter a valid quantity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        ...formData,
        categoryId: parseInt(formData.categoryId),
        unitPrice: parseFloat(formData.unitPrice),
        stockQty: parseInt(formData.stockQty),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`input-field ${errors.name ? "border-red-500" : ""}`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Barcode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Barcode
        </label>
        <input
          type="text"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter barcode (optional)"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`input-field ${errors.categoryId ? "border-red-500" : ""}`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
        )}
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit Price *
          </label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`input-field ${
              errors.unitPrice ? "border-red-500" : ""
            }`}
            placeholder="0.00"
          />
          {errors.unitPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.unitPrice}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stockQty"
            value={formData.stockQty}
            onChange={handleChange}
            min="0"
            className={`input-field ${errors.stockQty ? "border-red-500" : ""}`}
            placeholder="0"
          />
          {errors.stockQty && (
            <p className="text-red-500 text-xs mt-1">{errors.stockQty}</p>
          )}
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="input-field"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {product ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
