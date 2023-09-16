const config = require("../config/auth.config");
const db = require("../models");
const Institute = db.institute;
const Role = db.role;
const otpGenerator = require("otp-generator");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "subhransuchoudhury00@gmail.com",
    pass: "0Zc2YJzmh7bFUEHI",
  },
});

const sendMail = async (to, subject, otp) => {
  try {
    console.log("The OTP is ", otp);
    const info = await transporter.sendMail({
      from: "' Sambandh <subhransuchoudhury00@gmail.com>'", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: `${otp}`, // plain text body
      html: `<b>${subject} is: <h3 style="color:green;">${otp}</h3>NOTE: This should kept with safety.</b>`, // html body
    });
    console.log("Message sent:", info.messageId);
    return 200;
  } catch (error) {
    console.log(error);
    return 400;
  }
};

const sendSMS = async (mobile, msg, otp) => {
  // ! TEST:

  return 200;

  try {
    const headersList = {
      "Cache-Control": "no-cache",
    };

    const response = await fetch(
      `https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST_2_SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${mobile}`,
      {
        method: "GET",
        headers: headersList,
      }
    );

    const data = await response.json();

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

exports.instituteRegister = async (req, res) => {
  const referralCode = otpGenerator.generate(8, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  const OTP = otpGenerator.generate(8, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    digits: true,
  });

  const institute = new Institute({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    referral: referralCode,
    address: req.body.address,
    aisheCode: req.body.aisheCode,
    spoc: req.body.spoc,
    verified: false,
    tempOTP: {
      otp: null,
      createdAt: null,
    },
  });

  try {
    const roles = await Role.find({
      name: { $in: "institute" },
    });
    institute.roles = roles.map((role) => role._id);
    const resData = await institute.save();
    return res.status(200).send({
      message: "Institute registered successfully",
      data: {
        name: resData.name,
        referral: resData.referral,
        aisheCode: resData.aisheCode,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.instituteLogin = async (req, res) => {
  try {
    const institute = await Institute.findOne({
      email: req.body.email,
    }).populate("roles", "-__v");

    if (institute) {
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        institute.password
      );

      if (!institute.verified) {
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

      const token = jwt.sign({ id: institute.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < institute.roles.length; i++) {
        authorities.push("ROLE_" + institute.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        name: institute.name,
        email: institute.email,
        roles: authorities,
        referral: institute.referral,
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

exports.verifyInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({
      email: req.body.email,
    });

    if (!institute) {
      return res.status(404).send({ message: "Institute not found" });
    }

    if (institute.verified) {
      return res.status(400).send({ message: "Institute already verified" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.otp,
      institute.tempOTP.otp
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const timeDiff = Math.abs(
      new Date().getTime() - institute.tempOTP.createdAt.getTime()
    );
    const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
    if (diffMinutes > 5) {
      return res.status(400).send({
        message: "OTP expired. Please resend OTP again",
      });
    }

    institute.verified = true;
    institute.tempOTP.otp = null;
    await institute.save();
    if (!institute)
      return res.status(404).send({ message: "Retry OTP verification" });
    const token = jwt.sign({ id: institute.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    return res.send({ message: "Institute verified successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.sendOTPInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({
      email: req.body.email,
    });

    if (!institute) {
      return res.status(404).send({ message: "Institute not found" });
    }

    if (institute.tempOTP.otp) {
      const timeDiff = Math.abs(
        new Date().getTime() - institute.tempOTP.createdAt.getTime()
      );
      const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
      if (diffMinutes < 5) {
        res.status(400).send({
          message: "OTP already sent. Please try again after 5 minutes",
        });
        return;
      }
    }

    const OTP = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    institute.tempOTP.otp = bcrypt.hashSync(OTP, 8);
    institute.tempOTP.createdAt = new Date();
    await institute.save();

    const mailResp = await sendMail(institute.email, "Your OTP is : ", OTP);

    if (mailResp === 400) {
      res.status(500).send({ message: "Error sending OTP" });
      return;
    } else {
      res.status(200).send({
        message: "Mail sent successfully. Please check your mail",
      });
    }
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

exports.forgetPasswordInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne({ email: req.body.email });
    if (!institute) {
      res.status(404).send({ message: "Institute not found" });
      return;
    }

    if (!institute.tempOTP.otp) {
      res.status(400).send({ message: "OTP not sent. Please send OTP first" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.otp,
      institute.tempOTP.otp
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const timeDiff = Math.abs(
      new Date().getTime() - institute.tempOTP.createdAt.getTime()
    );
    const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
    if (diffMinutes > 5) {
      return res.status(400).send({
        message: "OTP expired. Please resend OTP again",
      });
    }

    institute.tempOTP.otp = null;
    institute.tempOTP.createdAt = null;
    institute.password = bcrypt.hashSync(req.body.password, 8);
    await institute.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};

exports.changePasswordInstitute = async (req, res) => {
  try {
    const institute = await Institute.findById(req.collegeId);
    if (!institute) {
      res.status(404).send({ message: "Institute not found" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      institute.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid old password" });
    }

    institute.password = bcrypt.hashSync(req.body.newPassword, 8);
    await institute.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
    return;
  }
};
