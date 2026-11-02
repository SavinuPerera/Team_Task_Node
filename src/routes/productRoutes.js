const express = require('express');
const router = express.Router();
const productService = require('../services/productService');

router.get('/', (req, res) => {
  const { category } = req.query;
  const result = productService.getAllProducts(category);

  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    data: result,
  });
});

router.get('/low-stock', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Low stock products fetched successfully',
    data: productService.getLowStockProducts(),
  });
});

router.get('/:id', (req, res) => {
  const product = productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product ${req.params.id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    data: product,
  });
});

module.exports = router;