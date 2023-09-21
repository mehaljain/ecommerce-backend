const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  const { id, name, price } = req.body;
  try {
    // Create a new product instance
    const product = new Product({ id, name, price });

    // Save the product to the database
    const savedProduct = await product.save();

    return res.status(201).json({ message: 'Product created successfully', product: savedProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // Retrieve a list of products from the database
    const products = await Product.find();
    
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



