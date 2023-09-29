const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.post('/api/register', async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;
    console.log(req.body);
    // Validate input data (e.g., check for empty fields, validate password complexity)

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ fullname });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user document and save it to the database
    const newUser = new User({ fullname, email, password, confirmpassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});;


7
// Define your authentication routes (login)
router.post('/login', async (req, res) => {
  try {
    // Find the user by their email in the database
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      // User not found
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the provided password matches the user's password
    if (req.body.password === user.password) {
      // Successful login
      res.json({ message: 'Login successful' });
    } else {
      // Invalid password
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;



