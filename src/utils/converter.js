const formatMoney = (value) => {
  if (!Number.isInteger(value)) {
    return "Unknown";
  }
  return `${value.toLocaleString("vi-VN")} VNĐ`;
};

const formatPath = (removedPath, originalPath) => {
  if (originalPath === removedPath) {
    return "/";
  }
  return originalPath.replace(removedPath, "");
};

const Converter = {
  formatMoney,
  formatPath,
};

export default Converter;
