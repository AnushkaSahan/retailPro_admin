import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 btn-primary"
        >
          <FiHome className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
