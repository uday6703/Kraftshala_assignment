const meetingService = require("../service/meeting.service");
const { validateMeetingPayload, isValidDate } = require("../dto/meeting.dto");
const ApiError = require("../../../utils/apiError");

const createMeeting = async (req, res, next) => {
  try {
    validateMeetingPayload(req.body);
    const meeting = await meetingService.createMeeting(req.body);
    return res.status(201).json(meeting);
  } catch (error) {
    return next(error);
  }
};

const listMeetings = async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.userId) {
      filters.userId = req.query.userId;
    }

    if (req.query.startDate) {
      if (!isValidDate(req.query.startDate)) {
        throw new ApiError(400, "startDate must be a valid date");
      }
      filters.startDate = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      if (!isValidDate(req.query.endDate)) {
        throw new ApiError(400, "endDate must be a valid date");
      }
      filters.endDate = new Date(req.query.endDate);
    }

    const meetings = await meetingService.listMeetings(filters);
    return res.status(200).json(meetings);
  } catch (error) {
    return next(error);
  }
};

const getMeetingById = async (req, res, next) => {
  try {
    const meeting = await meetingService.getMeetingById(req.params.id);
    return res.status(200).json(meeting);
  } catch (error) {
    return next(error);
  }
};

const updateMeeting = async (req, res, next) => {
  try {
    const meeting = await meetingService.updateMeeting(req.params.id, req.body);

    return res.status(200).json(meeting);
  } catch (error) {
    return next(error);
  }
};

const deleteMeeting = async (req, res, next) => {
  try {
    await meetingService.deleteMeeting(req.params.id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createMeeting,
  listMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
