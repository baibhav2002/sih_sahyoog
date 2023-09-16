const { validateStudent } = require("../middlewares");
const controller = require("../controllers/student-auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // * define routes here.
  app.post(
    "/api/student/auth/register",
    [validateStudent.validateRegister],
    [validateStudent.checkDuplicateMobile],
    controller.studentRegister
  );

  app.post(
    "/api/student/send-otp",
    [validateStudent.validateSendOTP],
    controller.sendOTPStudent
  );

  app.post(
    "/api/student/verify",
    [validateStudent.validateNumOTP],
    controller.verifyStudent
  );

  app.post(
    "/api/student/auth/login",
    [validateStudent.validateLogin],
    controller.studentLogin
  );

  app.post(
    "/api/student/auth/forget-password",
    [validateStudent.validateForgetPassword],
    controller.forgetPasswordStudent
  );
};
