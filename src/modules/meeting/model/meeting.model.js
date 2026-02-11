const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

meetingSchema.index({ userId: 1, startTime: 1 });
meetingSchema.index({ startTime: 1, endTime: 1 });

module.exports = mongoose.model("Meeting", meetingSchema);
