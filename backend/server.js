const moment = require("moment");
const express = require("express");
const bodyParse = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");

const API_production = require("./api/production_tasks");
const API_executing = require("./api/executing_tasks");
const API_worker = require("./api/workers");
const API_productivity = require("./api/productivity");

const InitiateMongoServer = require("./config/db");

const API_user = require("./api/user.js");

// Create a new Express application.
const app = express();

app.use(cookieParser());

// ANCHOR DEV
if (process.env["NODE_ENV"] === "development") {
  console.warn("dev mode!");
  app.use(cors());
}

// Moment
app.use(bodyParse.urlencoded({ extended: false }));
moment.locale("en-us");
app.locals.moment = moment;

// Database connection
InitiateMongoServer();

app.get("/", async (req, res) => {
  res.json({ message: "API working" });
});

// User signup
app.use("/api/user", API_user);

// Define api routes
app.use("/api/task", API_production);
app.use("/api/executing", API_executing);
app.use("/api/worker", API_worker);
app.use("/api/productivity", API_productivity);

// ANCHOR DEV
console.log("\n\nprocess.env['NODE_ENV'] ===", process.env["NODE_ENV"], "\n\n");
const port = process.env["NODE_ENV"] === "development" ? 5000 : 80;

app.listen(port, () => {
  console.warn(`Server listening on port ${port}`);
});
