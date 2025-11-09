import api from "./api";

const profileService = {
  getProfile: async () => {
    const response = await api.get("/profile");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/profile", profileData);
    return response.data;
  },
};

export default profileService;
