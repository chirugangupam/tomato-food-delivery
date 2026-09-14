import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Toast from "./components/Toast/Toast";
import TrackOrderModal from "./components/TrackOrderModal/TrackOrderModal";

// Customer Pages
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

// Admin Panel
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard/Dashboard";
import Add from "./admin/pages/Add/Add";
import List from "./admin/pages/List/List";
import Orders from "./admin/pages/Orders/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Toast />
      <TrackOrderModal />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      {isAdminRoute ? (
        // Admin Portal
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      ) : (
        // Customer App Layout
        <div className="app">
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder setShowLogin={setShowLogin} />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/myorders" element={<MyOrders setShowLogin={setShowLogin} />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
