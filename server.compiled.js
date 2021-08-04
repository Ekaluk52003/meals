"use strict";

require("dotenv").config();

var express = require("express");

var path = require("path");

var cors = require("cors");

var fs = require("fs");

var morgan = require("morgan");

var cookieParser = require("cookie-parser");

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 3000 : _process$env$PORT;
var app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
fs.readdirSync("./routes").map(function (r) {
  return app.use("/api", require("./routes/".concat(r)));
}); //make static folder
// app.use(express.static(path.join(__dirname, "/client/build")));

app.use(express["static"](path.join(__dirname, 'client', 'build'))); // redirect to file

app.get("*", function (req, res) {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); // Get all Restaurants
// const port = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log("Server listening at port ".concat(PORT, "."));
});
