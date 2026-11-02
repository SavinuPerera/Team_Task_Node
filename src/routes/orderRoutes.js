const express = require('express');
const router = express.Router();
const orderService = require('../Services/orderService');

// Order ekak create karanawa
router.post('/', (req, res) => {
  const result = orderService.createOrder(req.body);

  if (!result.success) {
    return res.status(result.status).json({
      success: false,
      message: result.message,
    });
  }

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: result.data,
  });
});

// Orders okkoma gannawa
router.get('/', (_req, res) => {
  const orders = orderService.getAllOrders();

  res.status(200).json({
    success: true,
    message: 'Orders fetched successfully',
    data: orders,
  });
});

// ID eken order eka hoyanawa
router.get('/:id', (req, res) => {
  const order = orderService.getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order ${req.params.id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

// Order status eka update karanawa
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const result = orderService.updateOrderStatus(req.params.id, status);

  if (!result.success) {
    return res.status(result.status).json({
      success: false,
      message: result.message,
    });
  }

  res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    data: result.data,
  });
});

module.exports = router;
