const controller = require("../controllers/project-request.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/project-request/all",
    [authJwt.verifyToken],
    [authJwt.isInstitute],
    controller.getProjectAddRequestAll
  );

  app.post(
    "/api/project-request/seen",
    [authJwt.verifyToken],
    [authJwt.isInstitute],
    controller.seenProject
  );

  app.post(
    "/api/project-request/one",
    [authJwt.verifyToken],
    [authJwt.isInstitute],
    controller.getOneProject
  );

  app.get("/api/project-request/search", controller.searchProject);

  app.get("/api/project/search", controller.getProjects);

  app.get("/api/project/id/:id", controller.getProjectById);

  app.post("/api/project/recommend", controller.getProjectRecommendation);
};
