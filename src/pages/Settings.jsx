import React, { useState, useEffect } from "react";
import { FiSave, FiRefreshCw } from "react-icons/fi";
import settingsService from "../services/settingsService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { toast } from "react-toastify";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "",
    storeAddress: "",
    storePhone: "",
    storeEmail: "",
    currency: "USD",
    taxRate: "0",
    lowStockThreshold: "10",
    receiptFooter: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await settingsService.getAllSettings();
      const settingsObj = {};
      data.forEach((setting) => {
        settingsObj[setting.settingKey] = setting.settingValue;
      });
      setSettings({ ...settings, ...settingsObj });
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) =>
          settingsService.updateSetting(key, value)
        )
      );
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Configure your POS system</p>
        </div>
        <button
          onClick={fetchSettings}
          className="btn-secondary flex items-center space-x-2"
        >
          <FiRefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Store Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="input-field"
                placeholder="RetailPro Store"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
                className="input-field"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
                className="input-field"
                placeholder="store@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="input-field"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="LKR">LKR - Sri Lankan Rupee</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                rows="2"
                className="input-field"
                placeholder="Store address"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Business Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="100"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Low Stock Threshold
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                value={settings.lowStockThreshold}
                onChange={handleChange}
                min="0"
                className="input-field"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receipt Footer
              </label>
              <textarea
                name="receiptFooter"
                value={settings.receiptFooter}
                onChange={handleChange}
                rows="3"
                className="input-field"
                placeholder="Thank you for your business!"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <FiSave className="w-5 h-5" />
            <span>{saving ? "Saving..." : "Save Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
