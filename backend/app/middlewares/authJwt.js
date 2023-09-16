const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Institute = db.institute;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isInstitute = (req, res, next) => {
  Institute.findById(req.userId)
    .then((student) => {
      if (student) {
        Role.find({ _id: { $in: student.roles } })
          .then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "institute") {
                next();
                return;
              }
            }

            res
              .status(403)
              .send({ message: "You are not allowed, require Institute role" });
            return;
          })
          .catch((err) => {
            res.status(500).send({ message: err });
            return;
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
      return;
    });
};

const authJwt = {
  verifyToken,
  isInstitute,
};
module.exports = authJwt;
