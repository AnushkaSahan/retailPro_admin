import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiShoppingCart,
  FiPackage,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";
import reportService from "../services/reportService";
import { formatCurrency, formatNumber } from "../utils/formatters";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { toast } from "react-toastify";
import DashboardStats from "../components/dashboard/DashboardStats";
import SalesChart from "../components/dashboard/SalesChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await reportService.getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Today's Revenue",
      value: formatCurrency(stats?.todayRevenue || 0),
      icon: FiDollarSign,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "Today's Sales",
      value: formatNumber(stats?.todaySales || 0),
      icon: FiShoppingCart,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Total Products",
      value: formatNumber(stats?.totalProducts || 0),
      icon: FiPackage,
      color: "bg-purple-500",
      textColor: "text-purple-600",
    },
    {
      title: "Low Stock Items",
      value: formatNumber(stats?.lowStockProducts || 0),
      icon: FiAlertCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-full`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales Overview
          </h3>
          <SalesChart />
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/sales"
              className="block p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-primary-900">New Sale</p>
                  <p className="text-sm text-primary-700">
                    Process a new transaction
                  </p>
                </div>
                <FiShoppingCart className="w-6 h-6 text-primary-600" />
              </div>
            </a>

            <a
              href="/products"
              className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-purple-900">Manage Products</p>
                  <p className="text-sm text-purple-700">
                    View and edit inventory
                  </p>
                </div>
                <FiPackage className="w-6 h-6 text-purple-600" />
              </div>
            </a>

            <a
              href="/reports"
              className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-green-900">View Reports</p>
                  <p className="text-sm text-green-700">
                    Analytics and insights
                  </p>
                </div>
                <FiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats?.lowStockProducts > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex items-center">
            <FiAlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                Low Stock Alert
              </p>
              <p className="text-sm text-yellow-700">
                {stats.lowStockProducts} product
                {stats.lowStockProducts > 1 ? "s" : ""} running low on stock.
                <a href="/products" className="font-medium underline ml-1">
                  View products
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
