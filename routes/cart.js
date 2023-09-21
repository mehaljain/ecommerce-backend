const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/userSchema');
const Cart = require('../models/cart');




router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
 
  router.post('/api/insert', async (req, res) => {
    try {
      const { productId, quantity, userId } = req.body;
 
      const product = await Product.findById(productId);
      if (!product) {
        console.log("dfnaf")
        return res.status(404).json({ error: 'Product not found' });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Create or update a cart item for the user
      const cart = await Cart.findOneAndUpdate(
        { productId, userId }, // You should replace req.user._id with the actual user ID from authentication
        { quantity }, // Increment or decrement quantity
        { new: true, upsert: true }
      );
  
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Define a route to remove an item from the cart
  router.delete('/api/delete/:cartId/:productId', async (req, res) => {
    try {
      const {cartId, productId} = req.params;
  
      // Remove the cart item
      await Cart.deleteMany({ _id: cartId, productId: productId });
  
      res.json({ message: 'Item removed from cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;