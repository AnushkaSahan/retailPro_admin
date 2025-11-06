import React, { useState, useEffect } from "react";
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ProductForm from "../components/products/ProductForm";
import { formatCurrency } from "../utils/formatters";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAllProducts(),
        categoryService.getAllCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await productService.deleteProduct(productToDelete.id);
      toast.success("Product deleted successfully");
      fetchData();
      setShowDeleteDialog(false);
      setProductToDelete(null);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, formData);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(formData);
        toast.success("Product created successfully");
      }
      setShowModal(false);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (quantity) => {
    if (quantity === 0)
      return { text: "Out of Stock", color: "text-red-600 bg-red-100" };
    if (quantity < 10)
      return { text: "Low Stock", color: "text-yellow-600 bg-yellow-100" };
    return { text: "In Stock", color: "text-green-600 bg-green-100" };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.stockQty);
          return (
            <div
              key={product.id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.barcode && (
                      <p className="text-xs text-gray-500 mt-1">
                        {product.barcode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600">
                    {formatCurrency(product.unitPrice)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                  >
                    {stockStatus.text}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  Stock: <span className="font-medium">{product.stockQty}</span>{" "}
                  units
                </p>

                {product.category && (
                  <p className="text-xs text-gray-500">
                    Category: {product.category.name}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                  >
                    <FiEdit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="flex-1 btn-danger text-sm py-2 flex items-center justify-center space-x-1"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        size="md"
      >
        <ProductForm
          product={selectedProduct}
          categories={categories}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Products;
