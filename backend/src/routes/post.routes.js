const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

/**
 * @route   POST /api/posts
 * @desc    Create a new post
 */
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Get a single post by ID
 */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
