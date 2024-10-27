// userRoutes.js file

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user
router.post('/users', async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const user = new User({name, email, password});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// export it
module.exports = router;