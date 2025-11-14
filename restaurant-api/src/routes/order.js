
// src/routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { protect, authorize } = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private (Customer only)
router.post('/', protect, authorize('customer'), async (req, res) => {
  const { items } = req.body; 
  const customerId = req.user.id;

  try {
    let totalAmount = 0;
    const orderItems = [];
    const itemIds = items.map(item => item.menuItemId);
    const menuItems = await MenuItem.find({ _id: { $in: itemIds } });

    for (const item of items) {
      const menuItem = menuItems.find(m => m.id === item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ msg: `Item not found with ID: ${item.menuItemId}` });
      }
      totalAmount += menuItem.price * item.quantity;
      orderItems.push({ menuItem: menuItem._id, quantity: item.quantity });
    }

    const newOrder = new Order({
      customer: customerId,
      items: orderItems,
      totalAmount,
      status: 'ordered',
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/orders
// @desc    Get current user's order history
// @access  Private (Customer only)
router.get('/', protect, authorize('customer'), async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .sort({ createdAt: -1 })
      .populate('items.menuItem', ['name', 'price']); 
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;