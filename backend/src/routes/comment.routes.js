const express = require("express");
const Comment = require("../models/Comment");
const buildCommentTree = require("../utils/buildCommentTree");

const router = express.Router();

/**
 * Add comment or reply
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
 * Get nested comments for a post
 */
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId
    }).sort({ createdAt: 1 });

    const nestedComments = buildCommentTree(comments);

    res.json(nestedComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
