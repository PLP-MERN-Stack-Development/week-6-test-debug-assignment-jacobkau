const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateToken } = require('../utils/auth');

router.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check for existing user
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const user = await User.create(req.body);
    const token = generateToken(user);
    
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;