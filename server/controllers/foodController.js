import { db } from '../config/db.js';
import fs from 'fs';
import path from 'path';

// Add food item
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category, rating } = req.body;

    let image_filename = '';
    if (req.file) {
      image_filename = `${req.file.filename}`;
    } else if (req.body.image) {
      image_filename = req.body.image;
    } else {
      image_filename = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
    }

    const newFood = {
      _id: Date.now().toString(),
      name: name || 'Delicious Dish',
      description: description || 'Freshly prepared delicious food with premium ingredients.',
      price: Number(price) || 15,
      category: category || 'Salad',
      image: image_filename,
      rating: Number(rating) || 4.8
    };

    db.data.foods.push(newFood);
    db.saveData();

    res.json({ success: true, message: 'Food Added Successfully', data: newFood });
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ success: false, message: 'Error adding food item' });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    res.json({ success: true, data: db.data.foods });
  } catch (error) {
    console.error('Error listing foods:', error);
    res.status(500).json({ success: false, message: 'Error fetching food items' });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    const foodIndex = db.data.foods.findIndex(f => f._id === id);

    if (foodIndex === -1) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    const food = db.data.foods[foodIndex];
    // If it was a locally uploaded file, remove it
    if (food.image && !food.image.startsWith('http')) {
      const imgPath = path.join('uploads', food.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    db.data.foods.splice(foodIndex, 1);
    db.saveData();

    res.json({ success: true, message: 'Food Removed Successfully' });
  } catch (error) {
    console.error('Error removing food:', error);
    res.status(500).json({ success: false, message: 'Error removing food item' });
  }
};
