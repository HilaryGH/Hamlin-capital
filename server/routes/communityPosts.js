const express = require("express");
const router = express.Router();
const CommunityPost = require("../models/CommunityPost");

// POST a new community post
router.post("/", async (req, res) => {
  try {
    const { name, message, location } = req.body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required." });
    }

    const newPost = new CommunityPost({ name, message, location });
    await newPost.save();

    res.status(201).json({ message: "Post submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error submitting post." });
  }
});

// GET all posts (latest first)
router.get("/", async (req, res) => {
  try {
    const posts = await CommunityPost.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
// UPDATE a post by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await CommunityPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Post not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CommunityPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});


module.exports = router;
