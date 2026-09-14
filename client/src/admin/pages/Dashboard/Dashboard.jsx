import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { 
  IndianRupee, 
  ShoppingBag, 
  UtensilsCrossed, 
  Truck, 
  TrendingUp, 
  ArrowRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { url, food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.amount || 0), 0);
  const activeOrders = orders.filter(ord => ord.status !== "Delivered");
  const deliveredOrders = orders.filter(ord => ord.status === "Delivered");

  return (
    <div className="admin-dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Executive Dashboard</h1>
          <p className="dashboard-sub">Store analytics, revenue summaries & quick actions</p>
        </div>
        <Link to="/admin/add" className="quick-add-btn">
          <span>+ Add New Dish</span>
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrap revenue">
            <IndianRupee size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Revenue</span>
            <h3 className="metric-val">₹{totalRevenue.toFixed(2)}</h3>
            <span className="metric-trend positive">
              <TrendingUp size={13} /> +18.4% this week
            </span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap orders">
            <ShoppingBag size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Total Orders</span>
            <h3 className="metric-val">{orders.length}</h3>
            <span className="metric-sub-text">{deliveredOrders.length} Completed</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap active-del">
            <Truck size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Deliveries</span>
            <h3 className="metric-val">{activeOrders.length}</h3>
            <span className="metric-sub-text">In processing / on way</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap inventory">
            <UtensilsCrossed size={24} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Menu Dishes</span>
            <h3 className="metric-val">{food_list.length}</h3>
            <span className="metric-sub-text">Across 8 categories</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="dashboard-recent-orders-card">
        <div className="recent-orders-header">
          <h2>Recent Customer Orders</h2>
          <Link to="/admin/orders" className="view-all-link">
            <span>View All Orders</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="no-orders-msg">No orders placed yet. Place a test order from the customer store!</p>
        ) : (
          <div className="recent-orders-table-wrap">
            <table className="recent-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((ord, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="ord-id-code">#{ord._id}</span>
                    </td>
                    <td>
                      <span className="cust-name">
                        {ord.address?.firstName} {ord.address?.lastName}
                      </span>
                    </td>
                    <td>{ord.items?.length || 0} items</td>
                    <td>
                      <strong>₹{ord.amount?.toFixed(2)}</strong>
                    </td>
                    <td>
                      <span className={`table-status-pill ${ord.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {ord.status}
                      </span>
                    </td>
                    <td>
                      <span className="table-pay-badge">
                        {ord.paymentMethod === "cod" ? "COD" : "Paid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
