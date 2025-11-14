// src/routes/admin.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/admin/orders
// @desc    Get all customer orders
// @access  Private (Admin only)
router.get('/orders', protect, authorize('admin'), async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('customer', ['name', 'email'])
      .populate('items.menuItem', ['name', 'price']); 
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PATCH /api/admin/orders/:id
// @desc    Update order status (delivered or cancelled)
// @access  Private (Admin only)
router.patch('/orders/:id', protect, authorize('admin'), async (req, res) => {
  const { status } = req.body;
  if (!['delivered', 'cancelled'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status update value' });
  }

  try {
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status: status } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;