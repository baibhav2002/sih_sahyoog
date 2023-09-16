const { validateInstitute } = require("../middlewares");
const controller = require("../controllers/institute-auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // * define routes here. This route should accessible through locally.
  app.post(
    "/api/institute/auth/register",
    [validateInstitute.validateRegister],
    [validateInstitute.checkDuplicateMail],
    // [validateInstitute.checkDuplicateMobile],
    controller.instituteRegister
  );

  app.post(
    "/api/institute/auth/login",
    [validateInstitute.validateLogin],
    controller.instituteLogin
  );

  app.post(
    "/api/institute/auth/send-otp",
    [validateInstitute.sendOTP],
    controller.sendOTPInstitute
  );

  app.post(
    "/api/institute/auth/verify",
    [validateInstitute.validOTP],
    controller.verifyInstitute
  );
};
