const ApiError = require("../../../utils/apiError");

const isValidDate = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const validateMeetingPayload = (payload) => {
  const { userId, title, startTime, endTime } = payload;

  if (!userId) {
    throw new ApiError(400, "userId is required");
  }
  if (!title) {
    throw new ApiError(400, "title is required");
  }
  if (!startTime) {
    throw new ApiError(400, "startTime is required");
  }
  if (!endTime) {
    throw new ApiError(400, "endTime is required");
  }
  if (!isValidDate(startTime) || !isValidDate(endTime)) {
    throw new ApiError(400, "startTime and endTime must be valid dates");
  }

  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start >= end) {
    throw new ApiError(400, "startTime must be before endTime");
  }
};

module.exports = {
  validateMeetingPayload,
  isValidDate,
};
