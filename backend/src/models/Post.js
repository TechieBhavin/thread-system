const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // creates createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Post", postSchema);
