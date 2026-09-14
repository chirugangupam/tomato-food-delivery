import { db } from '../config/db.js';

// Add items to user cart
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: 'Missing userId or itemId' });
    }

    if (!db.data.carts[userId]) {
      db.data.carts[userId] = {};
    }

    if (!db.data.carts[userId][itemId]) {
      db.data.carts[userId][itemId] = 1;
    } else {
      db.data.carts[userId][itemId] += 1;
    }

    // Also update in user object if present
    const user = db.data.users.find(u => u._id === userId);
    if (user) {
      user.cartData = db.data.carts[userId];
    }

    db.saveData();
    res.json({ success: true, message: 'Added To Cart', cartData: db.data.carts[userId] });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ success: false, message: 'Error adding to cart' });
  }
};

// Remove items from user cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: 'Missing userId or itemId' });
    }

    if (db.data.carts[userId] && db.data.carts[userId][itemId] > 0) {
      db.data.carts[userId][itemId] -= 1;
      if (db.data.carts[userId][itemId] === 0) {
        delete db.data.carts[userId][itemId];
      }
    }

    const user = db.data.users.find(u => u._id === userId);
    if (user) {
      user.cartData = db.data.carts[userId] || {};
    }

    db.saveData();
    res.json({ success: true, message: 'Removed From Cart', cartData: db.data.carts[userId] || {} });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ success: false, message: 'Error removing from cart' });
  }
};

// Fetch user cart data
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const cartData = (db.data.carts && db.data.carts[userId]) || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, message: 'Error fetching cart' });
  }
};
