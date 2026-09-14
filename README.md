# 🍅 Tomato — Fresh & Delicious Food Delivery

A modern and responsive food delivery web application built with React, designed to provide a smooth and engaging food-ordering experience.

🔗 **Live Demo:** https://tomato-food-delivery-fawn.vercel.app/

---

## 📌 Overview

**Tomato** is a frontend food delivery application that allows users to explore food categories, browse dishes, manage their cart, and navigate through a clean and responsive user interface.

The project focuses on creating a professional, user-friendly, and responsive food ordering experience using modern frontend technologies.

---

## ✨ Features

- 🏠 Modern and responsive home page
- 🍕 Browse food items by category
- 🔎 Explore available food items
- 🛒 Add and remove items from the cart
- ➕ Increase or decrease item quantities
- 💰 Dynamic cart total calculation
- 📱 Fully responsive design
- 🎨 Clean and modern UI
- ⚡ Fast React application
- 🔄 Interactive navigation
- 📦 Reusable React components

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite

### Development Tools

- Git
- GitHub
- VS Code

### Deployment

- Vercel

---

## 🏗️ Project Structure

```text
tomato-food-delivery/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── package.json
└── README.md

## 🚀 Quick Start

### 1. Install Dependencies
```bash
# In the root directory:
npm run server # or cd server && npm install
npm run client # or cd client && npm install
```
## 📸 Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./screenshots/homepage.png" alt="Tomato Food Delivery Home Page" width="100%">
</p>

> A modern and responsive food delivery interface featuring food discovery, category navigation, promotional offers, and a streamlined ordering experience.

---

## 🌐 Live Demo

<p align="center">
  <a href="https://tomato-food-delivery-fawn.vercel.app/">
    <strong>🚀 View Live Website</strong>
  </a>
</p>

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
