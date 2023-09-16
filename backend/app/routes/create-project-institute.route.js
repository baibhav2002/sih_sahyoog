const controller = require("../controllers/create-project-institute.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/institute/project/create-project",
    [authJwt.verifyToken],
    [authJwt.isInstitute],
    controller.createProject
  );
};
