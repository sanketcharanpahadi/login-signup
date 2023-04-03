require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const userRouter = require("./routes/userRoute");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("unable to connect", error);
  });

app.use("/api/users", userRouter);

// Deployment
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
