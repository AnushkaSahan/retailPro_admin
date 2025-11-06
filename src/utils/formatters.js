export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const formatDateOnly = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const getStatusColor = (status) => {
  const colors = {
    ACTIVE: "bg-green-100 text-green-800",
    INACTIVE: "bg-red-100 text-red-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    REFUNDED: "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

export const getPaymentTypeColor = (type) => {
  const colors = {
    CASH: "bg-green-100 text-green-800",
    CARD: "bg-blue-100 text-blue-800",
    MOBILE_PAYMENT: "bg-purple-100 text-purple-800",
    CREDIT: "bg-orange-100 text-orange-800",
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};
