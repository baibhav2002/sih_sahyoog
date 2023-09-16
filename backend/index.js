const express = require("express");
const app = express();
require("dotenv").config();

// * Cors

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE",
  });
  next();
});

// * receive JSON parsed body

app.use(express.json());

// * creating clusters to utilize CPUs.

const db = require("./app/models");
const Role = db.role;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Sambandh!",
  });
});

// * creating student role

const createRoles = async () => {
  Role.estimatedDocumentCount().then((count) => {
    if (count === 0) {
      new Role({
        name: "admin",
      })
        .save()
        .then((resp) => {
          console.log("--> ADMIN CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING ADMIN");
        });

      new Role({
        name: "institute",
      })
        .save()
        .then((resp) => {
          console.log("--> INST. CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING MODERATOR");
        });

      new Role({
        name: "student",
      })
        .save()
        .then((resp) => {
          console.log("--> USER CREATED");
        })
        .catch((err) => {
          console.log("ERROR WHILE CREATING USER");
        });
    } else {
      console.log("--> Roles already created");
    }
  });
};

// * connection to database

db.mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("--> Connected to database");
    createRoles();
  })
  .catch((err) => {
    console.log("--> Error connecting to database", err);
    process.exit();
  });

// * routes

require("./app/routes/institute-auth.route")(app);
require("./app/routes/student-auth.route")(app);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`--> SERVER ACTIVE ON ${PORT} PID: @${process.pid} `);
});
