import api from "./api";

const productService = {
  getAllProducts: async () => {
    const response = await api.get("/products");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    await api.delete(`/products/${id}`);
  },

  getLowStockProducts: async (threshold = 10) => {
    const response = await api.get(
      `/products/low-stock?threshold=${threshold}`
    );
    return response.data;
  },
};

export default productService;
