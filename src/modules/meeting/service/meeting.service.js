const mongoose = require("mongoose");
const Meeting = require("../model/meeting.model");
const User = require("../../user/model/user.model");
const ApiError = require("../../../utils/apiError");
const { isValidDate } = require("../dto/meeting.dto");

const ensureUserExists = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
};

const hasConflict = async ({ userId, startTime, endTime, excludeId }) => {
  const query = {
    userId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return Meeting.findOne(query);
};

const createMeeting = async (data) => {
  await ensureUserExists(data.userId);

  const conflict = await hasConflict({
    userId: data.userId,
    startTime: data.startTime,
    endTime: data.endTime,
  });

  if (conflict) {
    throw new ApiError(400, "Time slot already booked");
  }

  return Meeting.create(data);
};

const listMeetings = async (filters) => {
  const where = {};

  if (filters.userId) {
    if (!mongoose.Types.ObjectId.isValid(filters.userId)) {
      throw new ApiError(400, "Invalid userId");
    }
    where.userId = filters.userId;
  }

  if (filters.startDate || filters.endDate) {
    where.startTime = {};
    if (filters.startDate) {
      where.startTime.$gte = filters.startDate;
    }
    if (filters.endDate) {
      where.startTime.$lte = filters.endDate;
    }
  }

  return Meeting.find(where).sort({ startTime: 1 });
};

const getMeetingById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid meetingId");
  }

  const meeting = await Meeting.findById(id);
  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }
  return meeting;
};

const updateMeeting = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid meetingId");
  }

  const meeting = await Meeting.findById(id);
  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }

  const updated = {
    userId: data.userId ?? meeting.userId,
    title: data.title ?? meeting.title,
    startTime: data.startTime ?? meeting.startTime,
    endTime: data.endTime ?? meeting.endTime,
  };

  if (!isValidDate(updated.startTime) || !isValidDate(updated.endTime)) {
    throw new ApiError(400, "startTime and endTime must be valid dates");
  }

  const start = new Date(updated.startTime);
  const end = new Date(updated.endTime);
  if (start >= end) {
    throw new ApiError(400, "startTime must be before endTime");
  }

  await ensureUserExists(updated.userId);

  const conflict = await hasConflict({
    userId: updated.userId,
    startTime: updated.startTime,
    endTime: updated.endTime,
    excludeId: id,
  });

  if (conflict) {
    throw new ApiError(400, "Time slot already booked");
  }

  Object.assign(meeting, updated);
  await meeting.save();
  return meeting;
};

const deleteMeeting = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid meetingId");
  }

  const meeting = await Meeting.findById(id);
  if (!meeting) {
    throw new ApiError(404, "Meeting not found");
  }
  await meeting.deleteOne();
};

module.exports = {
  createMeeting,
  listMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
