const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const productController = require('../controllers/product'); // Import your product controller

// Define routes for product operations (e.g., create, read, update, delete)
router.post('/add', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getProduct);
module.exports = router;
