# 🍅 Tomato Food Delivery - Full Stack Web Application

A modern and responsive food delivery web application built with **React**, **Node.js / Express**, featuring a UI for browsing food items, exploring categorized menus, managing carts, placing orders, and an Admin Management Dashboard.

---

## ✨ Features

- 🍽️ **Explore Menu**: Browse through 15+ curated food categories (Biryani, Pizza, Burgers, South Indian, North Indian, Chinese, Beverages, etc.) with 60+ dishes.
- 🛒 **Cart & Checkout**: Real-time cart calculations, coupon discounts, delivery fee estimations, and Stripe payment integration.
- 🚚 **Order Tracking**: Interactive live order tracking status step-by-step.
- 🛡️ **Authentication**: User and Admin authentication with JWT.
- 📊 **Admin Dashboard**: Comprehensive admin portal to add new food items, manage inventory, and track customer orders in real-time.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# In the root directory:
npm run server # or cd server && npm install
npm run client # or cd client && npm install
```

### 2. Environment Setup
Create a `.env` file in the `server` directory:
```env
PORT=4000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

### 3. Run the App
To run both client and server concurrently:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
