const config = require("../config/auth.config");
const db = require("../models");
const Student = db.student;
const Role = db.role;
const Institute = db.institute;
const otpGenerator = require("otp-generator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const sendSMS = async (mobile, otp) => {
  try {
    const headersList = {
      "Cache-Control": "no-cache",
    };

    const endPoint = `https://www.fast2sms.com/dev/bulkV2?authorization=${
      process.env.FAST_2_SMS_API_KEY
    }&variables_values=${otp}&route=otp&numbers=${Number(mobile)}`;

    // ! TESTING:
    console.log("OTP: ", otp);
    return 200;

    const response = await fetch(endPoint, {
      method: "GET",
      headers: headersList,
    });

    const data = await response.json();

    console.log(data);

    if (data.return === false) {
      return 400;
    } else {
      return 200;
    }
  } catch (error) {
    console.log(error);
    return 400;
  }
};

exports.studentRegister = async (req, res) => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const { name, mobile, referred, regdNo, photo, enrollmentLetter, password } =
    req.body;
  const student = new Student({
    name,
    mobile,
    regdNo,
    photo,
    enrollmentLetter,
    password: bcrypt.hashSync(password, 8),
    verified: false,
    enrollmentLetter,
    tempOTP: {
      otp: null,
      createdAt: null,
    },
  });

  try {
    const roles = await Role.find({
      name: { $in: "student" }, // ! Caution : "student" should not be changed.
    });
    student.roles = roles.map((role) => role._id);

    if (referred) {
      const refers = await Institute.findOne({ referral: referred }).select(
        "name"
      );
      if (!refers)
        return res.status(404).send({ message: "Invalid referral code" });
      student.group = refers.name;
    }
    await student.save();
    return res.status(200).send({ message: "Student registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.studentLogin = async (req, res) => {
  console.log("LOGIN..");
  try {
    const student = await Student.findOne({
      mobile: req.body.mobile,
    }).populate("roles", "-__v");

    if (student) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        student.password
      );

      if (!student.verified) {
        return res.status(301).send({
          accessToken: null,
          message: "Account not verified!",
        });
      }

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: student.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < student.roles.length; i++) {
        authorities.push("ROLE_" + student.roles[i].name.toUpperCase());
      }
      res.setHeader("Set-Cookie", `x-access-token=${token}`);
      res.status(200).send({
        name: student.name,
        mobile: student.mobile,
        roles: authorities,
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "Student not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.verifyStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      mobile: req.body.mobile,
    });

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    if (student.verified) {
      return res.status(400).send({ message: "Student already verified" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.otp,
      student.tempOTP.otp
    );

    if (!passwordIsValid) {
      // student.tempOTP.otp = null;
      // await student.save();
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const timeDiff = Math.abs(
      new Date().getTime() - student.tempOTP.createdAt.getTime()
    );
    const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
    if (diffMinutes > 5) {
      return res.status(400).send({
        message: "OTP expired. Please resend OTP again",
      });
    }

    student.verified = true;
    student.tempOTP.otp = null;
    await student.save();
    const token = jwt.sign({ id: student.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    return res.send({
      message: "Student verified successfully",
      accessToken: token,
      mobile: student.mobile,
      name: student.name,
      roles: ["ROLE_STUDENT"],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.sendOTPStudent = async (req, res) => {
  try {
    const student = await Student.findOne({
      mobile: req.body.mobile,
    });

    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    if (student.tempOTP.otp) {
      const timeDiff = Math.abs(
        new Date().getTime() - student.tempOTP.createdAt.getTime()
      );
      const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
      if (diffMinutes < 5) {
        res.status(400).send({
          message: "SMS already sent. Please try again after 5 minutes",
          diffMinutes: 5 - diffMinutes,
        });
        return;
      }
    }

    // const OTP = otpGenerator.generate(8, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets: false,
    //   digits: true,
    // });

    const OTP = "99999999";

    student.tempOTP.otp = bcrypt.hashSync(OTP, 8);
    student.tempOTP.createdAt = new Date();
    await student.save();

    const smsResp = await sendSMS(
      student.mobile,

      OTP
    );

    if (smsResp === 400) {
      res.status(500).send({ message: "Error sending OTP" });
      return;
    } else {
      res.status(200).send({
        message: "SMS sent successfully. Please check your inbox",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

exports.forgetPasswordStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ mobile: req.body.mobile });
    if (!student) {
      res.status(404).send({ message: "Student not found" });
      return;
    }

    if (!student.tempOTP.otp) {
      res.status(400).send({ message: "OTP not sent. Please send OTP first" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.otp,
      student.tempOTP.otp
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const timeDiff = Math.abs(
      new Date().getTime() - student.tempOTP.createdAt.getTime()
    );
    const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
    if (diffMinutes > 5) {
      return res.status(400).send({
        message: "OTP expired. Please resend OTP again",
      });
    }

    student.tempOTP.otp = null;
    student.tempOTP.createdAt = null;
    student.password = bcrypt.hashSync(req.body.password, 8);
    await student.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.changePasswordStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user);
    if (!student) {
      res.status(404).send({ message: "Student not found" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      student.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid old password" });
    }

    student.password = bcrypt.hashSync(req.body.newPassword, 8);
    await student.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};
