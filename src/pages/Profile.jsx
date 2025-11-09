import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCamera } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import profileService from "../services/profileService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    phone: "",
    email: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileService.updateProfile(profile);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your personal information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card text-center">
          <div className="relative inline-block mb-4">
            <div className="w-32 h-32 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-4xl mx-auto">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100">
              <FiCamera className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user?.username}</h2>
          <p className="text-gray-600 mt-1">Cashier</p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">Member since</p>
            <p className="font-medium text-gray-900">January 2025</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Personal Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={user?.username || ""}
                    disabled
                    className="input-field pl-10 bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value="Cashier"
                  disabled
                  className="input-field bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FiMapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  rows="3"
                  className="input-field pl-10"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button type="button" className="btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="btn-primary disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
