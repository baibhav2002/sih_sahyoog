const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.institute = require("./institute.model");
db.student = require("./student.model");
db.role = require("./role.model");
db.project = require("./project.model");
db.projectRequest = require("./project-request.model");
db.ROLES = ["student", "admin", "institute"];

module.exports = db;
