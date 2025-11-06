import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FiShoppingBag, FiLock, FiUser } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(formData.username, formData.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 px-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <FiShoppingBag className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">RetailPro POS</h1>
          <p className="text-primary-100">Point of Sale System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center font-medium mb-2">
              Demo Credentials:
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <strong>Admin:</strong> admin / admin123
              </p>
              <p>
                <strong>Cashier:</strong> cashier / cashier123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-primary-100 mt-8 text-sm">
          © 2025 RetailPro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
