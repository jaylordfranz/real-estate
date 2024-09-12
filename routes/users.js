const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create User
router.post('/users', async (req, res) => {
  const { username, email, password, role, profileInfo } = req.body;
  try {
    const user = new User({ username, email, password, role, profileInfo });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read Users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update User
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, profileInfo } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (password) user.password = password;  // Password will be hashed in the model

    user.username = username;
    user.email = email;
    user.role = role;
    user.profileInfo = profileInfo;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete User
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
