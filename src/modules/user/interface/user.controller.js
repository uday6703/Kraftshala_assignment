const { validateCreateUser } = require("../dto/user.dto");
const userService = require("../service/user.service");

const createUser = async (req, res, next) => {
  try {
    validateCreateUser(req.body);
    const user = await userService.createUser(req.body);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getUserById,
};
