const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

/**
 * @route   POST /api/comments
 * @desc    Add a comment or reply
 */
router.post("/", async (req, res) => {
  try {
    const { postId, content, parentComment } = req.body;

    const comment = await Comment.create({
      postId,
      content,
      parentComment: parentComment || null
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/comments/:postId
 * @desc    Get all comments for a post (flat)
 */
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
