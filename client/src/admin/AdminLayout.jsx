import React from "react";
import "./AdminLayout.css";
import { NavLink, Outlet, Link } from "react-router-dom";
import { 
  PlusCircle, 
  ListOrdered, 
  PackageCheck, 
  LayoutDashboard, 
  ArrowLeft,
  ShieldCheck,
  User
} from "lucide-react";

const AdminLayout = () => {
  return (
    <div className="admin-root animate-fade-in">
      {/* Admin Top Navbar */}
      <header className="admin-navbar glass">
        <div className="admin-nav-left">
          <Link to="/" className="admin-brand">
            <span className="brand-icon">🍅</span>
            <div>
              <span className="brand-name">Tomato<span className="brand-dot">.</span></span>
              <span className="admin-badge">Admin Panel</span>
            </div>
          </Link>
        </div>

        <div className="admin-nav-right">
          <Link to="/" className="back-to-store-btn">
            <ArrowLeft size={16} />
            <span>Customer Store</span>
          </Link>

          <div className="admin-user-profile">
            <div className="admin-avatar">
              <ShieldCheck size={18} />
            </div>
            <div className="admin-profile-meta">
              <span className="admin-name">Admin Manager</span>
              <span className="admin-role">Superuser</span>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Body with Sidebar and Main Content Area */}
      <div className="admin-content-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-options">
            <NavLink 
              to="/admin" 
              end
              className={({ isActive }) => `admin-sidebar-option ${isActive ? "active" : ""}`}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/admin/add" 
              className={({ isActive }) => `admin-sidebar-option ${isActive ? "active" : ""}`}
            >
              <PlusCircle size={20} />
              <span>Add Food Item</span>
            </NavLink>

            <NavLink 
              to="/admin/list" 
              className={({ isActive }) => `admin-sidebar-option ${isActive ? "active" : ""}`}
            >
              <ListOrdered size={20} />
              <span>Food Inventory</span>
            </NavLink>

            <NavLink 
              to="/admin/orders" 
              className={({ isActive }) => `admin-sidebar-option ${isActive ? "active" : ""}`}
            >
              <PackageCheck size={20} />
              <span>Manage Orders</span>
            </NavLink>
          </div>
        </aside>

        <main className="admin-main-view">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
