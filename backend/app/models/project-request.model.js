const mongoose = require("mongoose");

const ProjectRequest = mongoose.model(
  "ProjectRequest",
  new mongoose.Schema({
    date: { type: Date, required: true },
    data: { type: Object, required: true },
    accepted: { type: Boolean, default: false },
    seen: { type: Boolean, default: false },
    referral: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    senderMobile: { type: String, required: true },
  })
);

module.exports = ProjectRequest;
