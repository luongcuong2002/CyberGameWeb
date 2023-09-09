const formatMoney = (value) => {
  if (!Number.isInteger(value)) {
    return "Unknown";
  }
  return `${value.toLocaleString("vi-VN")} VNĐ`;
};

const Converter = {
  formatMoney,
};

export default Converter;
