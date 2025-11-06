import React, { useState } from "react";
import {
  FiBell,
  FiShoppingCart,
  FiAlertCircle,
  FiPackage,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { formatDate } from "../utils/formatters";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "sale",
      title: "New Sale Completed",
      message: "Sale #INV-000123 completed for $459.99",
      time: new Date().toISOString(),
      read: false,
      icon: FiShoppingCart,
      color: "blue",
    },
    {
      id: 2,
      type: "alert",
      title: "Low Stock Alert",
      message: "Wireless Mouse stock is running low (5 units remaining)",
      time: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      icon: FiAlertCircle,
      color: "red",
    },
    {
      id: 3,
      type: "product",
      title: "New Product Added",
      message: "USB-C Cable has been added to inventory",
      time: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      icon: FiPackage,
      color: "green",
    },
    {
      id: 4,
      type: "sale",
      title: "Sale Completed",
      message: "Sale #INV-000122 completed for $299.00",
      time: new Date(Date.now() - 10800000).toISOString(),
      read: true,
      icon: FiShoppingCart,
      color: "blue",
    },
    {
      id: 5,
      type: "alert",
      title: "Stock Updated",
      message: "Laptop HP stock updated to 20 units",
      time: new Date(Date.now() - 14400000).toISOString(),
      read: true,
      icon: FiCheckCircle,
      color: "green",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      red: "bg-red-100 text-red-600",
      green: "bg-green-100 text-green-600",
      yellow: "bg-yellow-100 text-yellow-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="btn-primary">
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "unread"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "read"
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="card text-center py-12">
            <FiBell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`card hover:shadow-md transition-shadow ${
                  !notification.read
                    ? "bg-blue-50 border-l-4 border-primary-600"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div
                      className={`p-3 rounded-full ${getColorClasses(
                        notification.color
                      )}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(notification.time)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-primary-600 hover:text-primary-700 p-2"
                        title="Mark as read"
                      >
                        <FiCheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      title="Delete"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
