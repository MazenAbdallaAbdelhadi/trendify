const path = require("path");
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const errors = require("./utils/response/errors");
const responseHandler = require("./utils/response/responseHandler");

const app = express();

// GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// RESPONSE HANDLER
app.use(responseHandler);

// ROUTES
app.use(require("./routes"));

// NOTFOUND HANLER
app.all("*", (req, res, next) => {
  next(errors.routeNotFound());
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
