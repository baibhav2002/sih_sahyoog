const mongoose = require("mongoose");

const Student = mongoose.model(
  "Student",
  new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    verified: { type: Boolean, default: false }, // * mobile verification
    referred: { type: String, default: null },
    regdNo: { type: String, required: true },
    photo: { type: String, required: false },
    enrollmentLetter: { type: String, required: false },
    password: { type: String, required: true },
    authorized: { type: Boolean, default: false }, // * true when a institute verifies its identity.
    group: { type: String, default: null }, // * from the referral code.
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

module.exports = Student;
