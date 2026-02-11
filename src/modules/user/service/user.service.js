const mongoose = require("mongoose");
const User = require("../model/user.model");
const ApiError = require("../../../utils/apiError");

const createUser = async (data) => {
  return User.create(data);
};

const getUserById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid userId");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

module.exports = {
  createUser,
  getUserById,
};
