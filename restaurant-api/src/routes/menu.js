const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// @route   GET api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/menu
// @desc    Add a new menu item
// @access  Private/Admin
// We use the helper here to ensure 'auth' and 'admin' are functions before passing them to router.post
router.post('/', async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            category,
        });

        const menuItem = await newMenuItem.save();
        res.json(menuItem);
    } catch (err) {
        console.error(err.message);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Validation failed. Check your data types and required fields.' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/menu/:id
// @desc    Update a menu item
// @access  Private/Admin
router.put('/:id', async (req, res) => {
    const { name, description, price, category } = req.body;
    // ... (rest of the PUT logic)
    try {
        let menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }
        
        menuItem = await MenuItem.findByIdAndUpdate(
            req.params.id, 
            { $set: { name, description, price, category } }, 
            { new: true, runValidators: true }
        );
        res.json(menuItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/menu/:id
// @desc    Delete a menu item
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' });
        }
        
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Menu item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;