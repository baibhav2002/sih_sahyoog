const controller = require("../controllers/create-project-student.controller");
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
    "/api/student/project/create-project",
    [authJwt.verifyToken],
    controller.createProject
  );

  app.get("/api/students", controller.getStudents);
};
