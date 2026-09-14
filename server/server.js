import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'token', 'Authorization']
}));

// Static files for uploaded food images
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Food Delivery API (Tomato Backend)',
    version: '1.0.0',
    endpoints: [
      '/api/food/list',
      '/api/food/add',
      '/api/user/register',
      '/api/user/login',
      '/api/cart/get',
      '/api/order/place',
      '/api/order/list'
    ]
  });
});

app.listen(port, () => {
  console.log(`🚀 Food Delivery Server running on http://localhost:${port}`);
});
