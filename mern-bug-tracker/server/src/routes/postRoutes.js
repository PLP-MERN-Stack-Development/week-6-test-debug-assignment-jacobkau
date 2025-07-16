const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const authenticate = require('../middleware/auth');

// Create a post
router.post('/', authenticate, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.userId
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const query = category ? { category } : {};
    
    const posts = await Post.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.userId },
      req.body,
      { new: true }
    );
    
    if (!post) return res.status(403).json({ error: 'Not authorized' });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.userId
    });
    
    if (!post) return res.status(403).json({ error: 'Not authorized' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;