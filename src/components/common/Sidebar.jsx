import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
  FiGrid,
  FiBarChart2,
  FiPackage,
} from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/sales", icon: FiShoppingCart, label: "Sales" },
    { path: "/products", icon: FiPackage, label: "Products" },
    { path: "/categories", icon: FiGrid, label: "Categories" },
    { path: "/customers", icon: FiUsers, label: "Customers" },
    { path: "/reports", icon: FiBarChart2, label: "Reports" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-secondary-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-secondary-800">
        <div className="flex items-center space-x-3">
          <FiShoppingBag className="w-8 h-8 text-primary-400" />
          <div>
            <h1 className="text-xl font-bold">RetailPro</h1>
            <p className="text-xs text-secondary-400">Point of Sale</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-primary-600 text-white shadow-lg"
                  : "text-secondary-300 hover:bg-secondary-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-secondary-800">
        <p className="text-xs text-secondary-400 text-center">
          © 2025 RetailPro POS
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
