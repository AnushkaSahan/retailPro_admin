import api from "./api";

const saleService = {
  getAllSales: async () => {
    const response = await api.get("/sales");
    return response.data;
  },

  getSaleById: async (id) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  createSale: async (saleData) => {
    const response = await api.post("/sales", saleData);
    return response.data;
  },

  getTodaySales: async () => {
    const response = await api.get("/sales/today");
    return response.data;
  },
};

export default saleService;
