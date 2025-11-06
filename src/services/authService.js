import api from "./api";

const authService = {
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    if (response.data.username) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("user");
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  checkStatus: async () => {
    const response = await api.get("/auth/status");
    return response.data;
  },
};

export default authService;
