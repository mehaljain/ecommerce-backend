const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      // Validate input data (e.g., check for empty fields, validate password complexity)
  
      // Check if the user already exists in the database
      const existingContact = await Contact.findOne({ name });
      if (existingContact) {
        return res.status(409).json({ message: 'contact already exists' });
      }
  
      // Create a new user document and save it to the database
      const newContact = new Contact({ name, email, message });
      await newContact.save();
  
      res.status(201).json({ message: 'contact successful' });
    } catch (error) {
      console.error('contact error:', error);
      res.status(500).json({ message: 'contact failed' });
    }
  });;
  
  
module.exports = router;



