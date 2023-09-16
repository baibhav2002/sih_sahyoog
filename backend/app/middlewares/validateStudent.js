const db = require("../models");
const Student = db.student;
const z = require("zod");
const { fromZodError } = require("zod-validation-error");
const validateRegister = (req, res, next) => {
  const schema = z.object({
    name: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z ]+$/),
    mobile: z
      .string()
      .length(10)
      .regex(/^[0-9]+$/),
    password: z.string().min(6).max(20),
    referred: z.string().length(8).optional(),
    regdNo: z.string().min(3),
    photo: z.string().optional(),
    enrollmentLetter: z.string().optional(),
  });
  const result = schema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    console.log(result.error);
    res.status(400).send({
      message: String(fromZodError(result.error)),
    });
  }
};

const validateLogin = (req, res, next) => {
  const schema = z.object({
    mobile: z
      .string()
      .length(10)
      .regex(/^[0-9]+$/),
    password: z.string().min(6).max(20),
  });
  const result = schema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).send({
      message: String(fromZodError(result.error)),
    });
  }
};

const checkDuplicateMobile = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    const student = await Student.findOne({ mobile });

    if (student) {
      if (student.verified)
        return res
          .status(400)
          .json({ message: "Phone no. is already in use!" });
      else {
        return res.status(301).json({
          message: "Account already exists. Please verify your account.",
        });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const validateSendOTP = (req, res, next) => {
  const schema = z.object({
    mobile: z
      .string()
      .length(10)
      .regex(/^[0-9]+$/),
  });
  const result = schema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).send({
      message: String(fromZodError(result.error)),
    });
  }
};

const validateNumOTP = (req, res, next) => {
  const schema = z.object({
    mobile: z
      .string()
      .length(10)
      .regex(/^[0-9]+$/),
    otp: z
      .string()
      .length(8)
      .regex(/^[0-9]+$/),
  });
  const result = schema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    res.status(400).send({
      message: String(fromZodError(result.error)),
    });
  }
};

const validateForgetPassword = (req, res, next) => {
  const schema = z.object({
    mobile: z
      .string()
      .length(10)
      .regex(/^[0-9]+$/),
    otp: z
      .string()
      .length(8)
      .regex(/^[0-9]+$/),
  });

  const result = schema.safeParse(req.body);
  if (result.success) {
    next();
  } else {
    return res.status(400).send({
      message: String(fromZodError(result.error)),
    });
  }
};

// * Exports

const validateStudent = {
  validateRegister,
  validateLogin,
  checkDuplicateMobile,
  validateSendOTP,
  validateNumOTP,
  validateForgetPassword,
};

module.exports = validateStudent;
