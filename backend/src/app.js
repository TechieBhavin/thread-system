const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/posts", postRoutes);  
app.use("/api/comments", commentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

module.exports = app;
