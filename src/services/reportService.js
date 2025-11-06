import api from "./api";

const reportService = {
  getDailySalesReport: async () => {
    const response = await api.get("/reports/daily-sales");
    return response.data;
  },

  getInventorySummary: async () => {
    const response = await api.get("/reports/inventory-summary");
    return response.data;
  },

  getTopSellingProducts: async () => {
    const response = await api.get("/reports/top-selling");
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
};

export default reportService;
