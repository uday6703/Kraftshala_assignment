const ApiError = require("../utils/apiError");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err instanceof ApiError) {
    return res.status(statusCode).json({ message });
  }

  return res.status(statusCode).json({ message });
};
