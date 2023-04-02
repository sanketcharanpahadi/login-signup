require("dotenv").config();
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const userRouter = require("./routes/userRoute");
const cors = require("cors");

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
app.use(notFound);
app.use(errorHandler);

module.exports = app;
