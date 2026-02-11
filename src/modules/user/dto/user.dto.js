const ApiError = require("../../../utils/apiError");

const validateCreateUser = (payload) => {
  const { name, email } = payload;

  if (!name) {
    throw new ApiError(400, "name is required");
  }
  if (!email) {
    throw new ApiError(400, "email is required");
  }
};

module.exports = {
  validateCreateUser,
};
