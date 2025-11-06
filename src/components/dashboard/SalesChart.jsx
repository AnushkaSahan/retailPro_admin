import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import saleService from "../../services/saleService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const SalesChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const sales = await saleService.getTodaySales();

      // Process sales data for chart
      const salesByHour = {};
      sales.forEach((sale) => {
        const hour = new Date(sale.saleDate).getHours();
        salesByHour[hour] =
          (salesByHour[hour] || 0) + parseFloat(sale.totalAmount);
      });

      const labels = Object.keys(salesByHour)
        .sort((a, b) => a - b)
        .map((h) => `${h}:00`);
      const data = labels.map((label) => salesByHour[parseInt(label)] || 0);

      setChartData({
        labels: labels.length > 0 ? labels : ["No data"],
        datasets: [
          {
            label: "Sales Revenue",
            data: data.length > 0 ? data : [0],
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return "$" + value.toFixed(0);
          },
        },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
