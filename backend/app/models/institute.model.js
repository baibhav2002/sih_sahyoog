const mongoose = require("mongoose");

const Institute = mongoose.model(
  "Institute",
  new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    referral: { type: String, required: true, unique: true },
    aisheCode: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    spoc: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      mobile: { type: String, required: true },
      photo: { type: String, required: true },
      empId: { type: String, required: true },
    },
    verified: { type: Boolean, default: false },
    password: { type: String, required: true },
    tempOTP: {
      otp: { type: String, default: null },
      createdAt: { type: Date, default: null },
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = Institute;
