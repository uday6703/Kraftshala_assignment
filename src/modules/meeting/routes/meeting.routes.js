const express = require("express");
const meetingController = require("../interface/meeting.controller");

const router = express.Router();

router.post("/", meetingController.createMeeting);
router.get("/", meetingController.listMeetings);
router.get("/:id", meetingController.getMeetingById);
router.put("/:id", meetingController.updateMeeting);
router.delete("/:id", meetingController.deleteMeeting);

module.exports = router;
