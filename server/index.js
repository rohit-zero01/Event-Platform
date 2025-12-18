const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
require("./config/cloudinary");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.get("/test", (req, res) => {
    res.send("Backend working");
  });
  

  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventRoutes);
  

  app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
  });
  

