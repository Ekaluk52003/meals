"use strict";

// require("dotenv").config();
var express = require("express");

var path = require("path");

var cors = require("cors");

var fs = require("fs");

var morgan = require("morgan"); // const { PORT = 3000 } = process.env;


var port = process.env.PORT || "3046"; // app.set("port", port);

var app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
fs.readdirSync("./routes").map(function (r) {
  return app.use("/api", require("./routes/".concat(r)));
}); //make static folder

app.use(express["static"](path.join(__dirname, "/client/build"))); // app.use(express.static(path.join(__dirname, "client", "build")));
// redirect to file

app.get("*", function (req, res) {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
}); // Get all Restaurants
// const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log("Server listening at port ".concat(port, "."));
});
