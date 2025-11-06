export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-()]+$/;
  return re.test(phone);
};

export const validateRequired = (value) => {
  return (
    value !== null && value !== undefined && value.toString().trim() !== ""
  );
};

export const validatePositiveNumber = (value) => {
  return !isNaN(value) && parseFloat(value) > 0;
};

export const validatePositiveInteger = (value) => {
  return Number.isInteger(Number(value)) && parseInt(value) > 0;
};

export const validatePrice = (price) => {
  return validatePositiveNumber(price) && parseFloat(price) < 1000000;
};

export const validateQuantity = (quantity) => {
  return validatePositiveInteger(quantity) && parseInt(quantity) < 100000;
};
