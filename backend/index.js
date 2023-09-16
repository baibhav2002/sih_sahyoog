const express = require("express");
const app = express();
require("dotenv").config();

app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE",
  });
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Devverse Team (6)!",
  });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`TEAM 6 SERVER ACTIVE ON ${PORT}`);
});
