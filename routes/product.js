const express = require('express');
const Product = require('../models/Product');
const { authenticateJWT, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', authenticateJWT, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add a new product (admin only)
router.post('/', authenticateJWT, authorizeAdmin, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: 'Product added successfully!' });
});

// Update product (admin only)
router.put('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Product updated successfully!' });
});

// Delete product (admin only)
router.delete('/:id', authenticateJWT, authorizeAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  // res.json({ message: 'Product deleted successfully!' });
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
