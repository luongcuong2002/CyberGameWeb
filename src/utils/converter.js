const formatMoney = (value) => {
  if (!Number.isInteger(value)) {
    return "Unknown";
  }
  return `${value.toLocaleString("vi-VN")} VNĐ`;
};

function formatCurrency(number) {
  return number.toLocaleString('vi-VN');
}

const formatPath = (removedPath, originalPath) => {
  if (originalPath === removedPath) {
    return "/";
  }
  return originalPath.replace(removedPath, "");
};

const Converter = {
  formatMoney,
  formatCurrency,
  formatPath,
};

export default Converter;
