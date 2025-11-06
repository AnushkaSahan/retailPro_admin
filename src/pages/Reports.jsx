import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiPackage,
  FiTrendingUp,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";
import reportService from "../services/reportService";
import {
  formatCurrency,
  formatDateOnly,
  formatNumber,
} from "../utils/formatters";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { toast } from "react-toastify";

const Reports = () => {
  const [dailySales, setDailySales] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [dailyData, inventoryData, topSellingData] = await Promise.all([
        reportService.getDailySalesReport(),
        reportService.getInventorySummary(),
        reportService.getTopSellingProducts(),
      ]);
      setDailySales(dailyData);
      setInventory(inventoryData);
      setTopSelling(topSellingData);
    } catch (error) {
      toast.error("Failed to load reports");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            View business insights and performance metrics
          </p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FiDownload className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Daily Sales Report */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <FiCalendar className="w-6 h-6 text-primary-600" />
            <span>Daily Sales Report</span>
          </h2>
          <span className="text-sm text-gray-600">
            {formatDateOnly(dailySales?.date)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-green-900">
                  {formatCurrency(dailySales?.totalRevenue || 0)}
                </p>
              </div>
              <FiDollarSign className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Total Sales</p>
                <p className="text-3xl font-bold text-blue-900">
                  {formatNumber(dailySales?.totalSales || 0)}
                </p>
              </div>
              <FiTrendingUp className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-700 mb-1">Avg. Sale Value</p>
                <p className="text-3xl font-bold text-purple-900">
                  {formatCurrency(
                    dailySales?.totalSales > 0
                      ? dailySales.totalRevenue / dailySales.totalSales
                      : 0
                  )}
                </p>
              </div>
              <FiDollarSign className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        {dailySales?.sales && dailySales.sales.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Transactions
            </h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-header">Invoice</th>
                    <th className="table-header">Customer</th>
                    <th className="table-header">Payment</th>
                    <th className="table-header">Amount</th>
                    <th className="table-header">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dailySales.sales.slice(0, 5).map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="table-cell font-medium text-primary-600">
                        {sale.invoiceNumber}
                      </td>
                      <td className="table-cell">
                        {sale.customer?.name || "Walk-in"}
                      </td>
                      <td className="table-cell">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {sale.paymentType}
                        </span>
                      </td>
                      <td className="table-cell font-semibold">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                      <td className="table-cell text-gray-500 text-sm">
                        {new Date(sale.saleDate).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Inventory Summary */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <FiPackage className="w-6 h-6 text-primary-600" />
          <span>Inventory Summary</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(inventory?.totalProducts || 0)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Stock</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(inventory?.totalStock || 0)} units
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Inventory Value</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(inventory?.totalValue || 0)}
            </p>
          </div>
        </div>

        {/* Low Stock Products */}
        {inventory?.lowStockProducts &&
          inventory.lowStockProducts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Low Stock Alert</span>
              </h3>
              <div className="space-y-2">
                {inventory.lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Category: {product.category?.name || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">
                        {product.stockQty} units
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {formatCurrency(product.unitPrice)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Top Selling Products */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
          <FiTrendingUp className="w-6 h-6 text-primary-600" />
          <span>Top Selling Products</span>
        </h2>

        {topSelling && topSelling.length > 0 ? (
          <div className="space-y-4">
            {topSelling.slice(0, 10).map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item[0]}</p>
                    <p className="text-sm text-gray-600">
                      Total sold: {item[1]} units
                    </p>
                  </div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{
                      width: `${(item[1] / topSelling[0][1]) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No sales data available yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
