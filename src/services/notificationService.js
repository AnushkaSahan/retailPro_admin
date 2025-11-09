import api from "./api";

const notificationService = {
  getAllNotifications: async () => {
    const response = await api.get("/notifications");
    return response.data;
  },

  getUnreadNotifications: async () => {
    const response = await api.get("/notifications/unread");
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get("/notifications/unread/count");
    return response.data.count;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    await api.put("/notifications/read-all");
  },
};

export default notificationService;
