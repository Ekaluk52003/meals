require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Get all Restaurants

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
