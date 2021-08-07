require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const port = process.env.PORT || "3001";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

//make static folder
app.use(express.static(path.join(__dirname, "/client/build")));
// app.use(express.static(path.join(__dirname, "client", "build")));

// redirect to file
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);

// Get all Restaurants

// const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
