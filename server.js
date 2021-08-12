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

if (process.env.NODE_ENV === "production") {
  //make static folder
  app.use(express.static(path.join(__dirname, "/client/IonicBuild")));
  app.get("*", (req, res) =>
    // redirect to file
    res.sendFile(path.resolve(__dirname, "client", "IonicBuild", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.listen(port, () => {
  console.log(`Server listening at port ${port}.`);
});
