import api from "./api";

const settingsService = {
  getAllSettings: async () => {
    const response = await api.get("/settings");
    return response.data;
  },

  getSetting: async (key) => {
    const response = await api.get(`/settings/${key}`);
    return response.data;
  },

  updateSetting: async (key, value) => {
    const response = await api.put(`/settings/${key}`, { value });
    return response.data;
  },
};

export default settingsService;
