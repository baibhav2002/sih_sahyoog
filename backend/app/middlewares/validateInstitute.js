const db = require("../models");
const Institute = db.institute;
const z = require("zod");
const { fromZodError } = require("zod-validation-error");
const validateRegister = (req, res, next) => {
  const schema = z.object({
    name: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z ]+$/),
    password: z.string().min(6).max(20),
    email: z.string().email(),
    address: z.string().min(10).max(100),
    aisheCode: z.string(),
    spoc: z.object({
      name: z.string().min(3).max(30),
      email: z.string().email(),
      mobile: z
        .string()
        .length(10)
        .regex(/^[0-9]+$/),
      photo: z.string(),
      empId: z.string(),
    }),
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

const validateLogin = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
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
    const student = await Institute.findOne({ mobile });

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

const checkDuplicateMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const student = await Institute.findOne({ email });
    if (student) {
      if (student.verified) {
        return res.status(301).json({ message: "Email is already in use!" });
      }
      return res
        .status(400)
        .json({ message: "Email is not verified completely." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const sendOTP = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
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

const validOTP = (req, res, next) => {
  const schema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
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

// * Exports

const validateInstitute = {
  validateRegister,
  validateLogin,
  checkDuplicateMobile,
  checkDuplicateMail,
  sendOTP,
  validOTP,
};

module.exports = validateInstitute;
