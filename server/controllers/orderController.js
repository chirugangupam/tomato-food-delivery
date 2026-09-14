import { db } from '../config/db.js';

// Placing user order for frontend
export const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      _id: orderId,
      userId,
      items,
      amount,
      address,
      status: 'Food Processing',
      date: new Date().toISOString(),
      payment: paymentMethod === 'cod' ? false : true,
      paymentMethod: paymentMethod || 'stripe',
      createdAt: new Date().toISOString()
    };

    db.data.orders.unshift(newOrder);

    // Clear user cart
    db.data.carts[userId] = {};
    const user = db.data.users.find(u => u._id === userId);
    if (user) {
      user.cartData = {};
    }

    db.saveData();

    // Simulated Stripe checkout session URL
    const session_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;

    res.json({
      success: true,
      session_url,
      order: newOrder,
      message: 'Order Placed Successfully'
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Error placing order' });
  }
};

// Verify order payment
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    const order = db.data.orders.find(o => o._id === orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (success === 'true' || success === true) {
      order.payment = true;
      db.saveData();
      res.json({ success: true, message: 'Payment Verified & Order Confirmed' });
    } else {
      // If payment failed, we mark or cancel
      order.status = 'Payment Failed';
      db.saveData();
      res.json({ success: false, message: 'Payment Not Verified' });
    }
  } catch (error) {
    console.error('Error verifying order:', error);
    res.status(500).json({ success: false, message: 'Error verifying order' });
  }
};

// User orders for customer portal
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = db.data.orders.filter(order => order.userId === userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

// Admin: Listing all orders
export const listOrders = async (req, res) => {
  try {
    res.json({ success: true, data: db.data.orders });
  } catch (error) {
    console.error('Error listing all orders:', error);
    res.status(500).json({ success: false, message: 'Error listing orders' });
  }
};

// Admin: Updating order delivery status
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = db.data.orders.find(o => o._id === orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    order.status = status;
    db.saveData();

    res.json({ success: true, message: 'Status Updated Successfully', data: order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Error updating order status' });
  }
};
