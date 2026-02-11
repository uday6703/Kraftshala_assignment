const User = require("./user/model/user.model");
const Meeting = require("./meeting/model/meeting.model");

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Meeting,
};
