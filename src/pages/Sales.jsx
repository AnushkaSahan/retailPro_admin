import React, { useState, useEffect } from "react";
import {
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiTrash2,
  FiSearch,
} from "react-icons/fi";
import productService from "../services/productService";
import customerService from "../services/customerService";
import saleService from "../services/saleService";
import { formatCurrency } from "../utils/formatters";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentType, setPaymentType] = useState("CASH");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, customersData] = await Promise.all([
        productService.getAllProducts(),
        customerService.getAllCustomers(),
      ]);
      setProducts(
        productsData.filter((p) => p.status === "ACTIVE" && p.stockQty > 0)
      );
      setCustomers(customersData);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= product.stockQty) {
        toast.warning("Cannot add more than available stock");
        return;
      }
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { product, quantity: 1, price: product.unitPrice }]);
      toast.success(`${product.name} added to cart`);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = products.find((p) => p.id === productId);

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > product.stockQty) {
      toast.warning("Cannot exceed available stock");
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setSelectedCustomer("");
    setPaymentType("CASH");
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setProcessing(true);
    try {
      const saleData = {
        customerId: selectedCustomer ? parseInt(selectedCustomer) : null,
        paymentType: paymentType,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const result = await saleService.createSale(saleData);
      toast.success(`Sale completed! Invoice #${result.invoiceNumber}`);
      clearCart();
      fetchData(); // Refresh product stock
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to process sale");
    } finally {
      setProcessing(false);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.barcode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">New Sale</h1>
        <p className="text-gray-600 mt-1">Process a new transaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search */}
          <div className="card">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="card hover:shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-3">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stockQty}
                    </p>
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(product.unitPrice)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          {/* Cart Header */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <FiShoppingCart className="w-6 h-6" />
                <span>Cart ({cart.length})</span>
              </h2>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FiShoppingCart className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                  <p>Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="border border-gray-200 rounded-lg p-3"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Details */}
          {cart.length > 0 && (
            <div className="card">
              {/* Customer Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer (Optional)
                </label>
                <select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  className="input-field"
                >
                  <option value="">Walk-in Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["CASH", "CARD", "MOBILE_PAYMENT", "CREDIT"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setPaymentType(type)}
                      className={`py-2 px-4 rounded-lg border-2 transition-all ${
                        paymentType === type
                          ? "border-primary-600 bg-primary-50 text-primary-700 font-medium"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {type.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatCurrency(calculateTotal())}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full mt-4 btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Processing..." : "Complete Sale"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sales;
