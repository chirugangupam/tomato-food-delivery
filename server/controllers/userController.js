import { db } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'tomato_food_delivery_secret_jwt_key_2026', {
    expiresIn: '7d'
  });
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = db.data.users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ success: false, message: "User Doesn't Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Credentials' });
    }

    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Register user
export const registerUser = async (req, res) => {
  const { name, password, email, role } = req.body;
  try {
    // Checking if user already exists
    const exists = db.data.users.find(u => u.email === email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      _id: Date.now().toString(),
      name: name || 'Valued Customer',
      email,
      password: hashedPassword,
      role: role || (email.includes('admin') ? 'admin' : 'user'),
      cartData: {},
      createdAt: new Date().toISOString()
    };

    db.data.users.push(newUser);
    db.saveData();

    const token = createToken(newUser._id);
    res.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      message: 'Registration successful'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = db.data.users.find(u => u._id === userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Error fetching profile' });
  }
};
