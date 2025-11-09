import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SalesPieChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["No Data"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["rgba(209, 213, 219, 0.5)"],
        borderColor: ["rgb(209, 213, 219)"],
        borderWidth: 2,
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMockSalesData();
  }, []);

  // ✅ Mock sales data
  const fetchMockSalesData = async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 🧩 Mock data array (like backend response)
      const sales = [
        { id: 1, paymentType: "CASH", totalAmount: 1500 },
        { id: 2, paymentType: "CARD", totalAmount: 2300 },
        { id: 3, paymentType: "MOBILE_PAYMENT", totalAmount: 800 },
        { id: 4, paymentType: "CREDIT", totalAmount: 1200 },
        { id: 5, paymentType: "CASH", totalAmount: 700 },
      ];

      // Group by payment type
      const paymentTypes = {};
      sales.forEach((sale) => {
        const type = sale.paymentType || "UNKNOWN";
        paymentTypes[type] =
          (paymentTypes[type] || 0) + parseFloat(sale.totalAmount || 0);
      });

      const labels = Object.keys(paymentTypes);
      const data = Object.values(paymentTypes);

      const backgroundColors = {
        CASH: "rgba(34, 197, 94, 0.8)",
        CARD: "rgba(59, 130, 246, 0.8)",
        MOBILE_PAYMENT: "rgba(168, 85, 247, 0.8)",
        CREDIT: "rgba(249, 115, 22, 0.8)",
        UNKNOWN: "rgba(156, 163, 175, 0.8)",
      };

      const borderColors = {
        CASH: "rgb(34, 197, 94)",
        CARD: "rgb(59, 130, 246)",
        MOBILE_PAYMENT: "rgb(168, 85, 247)",
        CREDIT: "rgb(249, 115, 22)",
        UNKNOWN: "rgb(156, 163, 175)",
      };

      setChartData({
        labels: labels.map((label) => label.replace("_", " ")),
        datasets: [
          {
            data: data,
            backgroundColor: labels.map(
              (label) => backgroundColors[label] || backgroundColors["UNKNOWN"]
            ),
            borderColor: labels.map(
              (label) => borderColors[label] || borderColors["UNKNOWN"]
            ),
            borderWidth: 2,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to load mock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          font: { size: 11, family: "Inter, system-ui, sans-serif" },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toFixed(2)} (${percentage}%)`;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading mock chart...</div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: "300px" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default SalesPieChart;
