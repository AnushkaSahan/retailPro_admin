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
      console.log("Fetching reports...");
      const [dailyData, inventoryData, topSellingData] = await Promise.all([
        reportService.getDailySalesReport(),
        reportService.getInventorySummary(),
        reportService.getTopSellingProducts(),
      ]);

      console.log("Daily Sales Data:", dailyData);
      console.log("Inventory Data:", inventoryData);
      console.log("Top Selling Data:", topSellingData);

      setDailySales(dailyData);
      setInventory(inventoryData);
      setTopSelling(topSellingData);
    } catch (error) {
      console.error("Failed to load reports:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      dailySales: {
        date: dailySales?.date || new Date().toISOString().split("T")[0],
        totalSales: dailySales?.totalSales || 0,
        totalRevenue: dailySales?.totalRevenue || 0,
        avgSaleValue: dailySales?.avgSaleValue || 0,
        transactions: dailySales?.sales?.length || 0,
      },
      inventory: {
        totalProducts: inventory?.totalProducts || 0,
        totalStock: inventory?.totalStock || 0,
        totalValue: inventory?.totalValue || 0,
        lowStockCount: inventory?.lowStockProducts?.length || 0,
      },
      topSellingProducts: topSelling.map((item) => ({
        productName: item[0],
        quantitySold: item[1],
      })),
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pos-report-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Report exported successfully");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Safely get values with defaults
  const totalRevenue = dailySales?.totalRevenue || 0;
  const totalSales = dailySales?.totalSales || 0;
  const avgSaleValue = dailySales?.avgSaleValue || 0;
  const salesList = dailySales?.sales || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            View business insights and performance metrics
          </p>
        </div>
        <button
          onClick={exportReport}
          className="btn-primary flex items-center space-x-2"
        >
          <FiDownload className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Daily Sales Report */}

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
            {topSelling.slice(0, 10).map((item, index) => {
              const maxQuantity = topSelling[0]?.[1] || 1;
              const percentage = (item[1] / maxQuantity) * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item[0]}</p>
                      <p className="text-sm text-gray-600">
                        Total sold: {item[1]} units
                      </p>
                    </div>
                  </div>
                  <div className="w-32">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
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
