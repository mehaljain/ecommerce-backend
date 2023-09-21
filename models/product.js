const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number ,
  name: String,
  price: Number,
  // Add more fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
