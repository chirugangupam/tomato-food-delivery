import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { 
  Package, 
  RotateCw, 
  MapPin, 
  Phone, 
  CreditCard, 
  Banknote,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Orders = () => {
  const { url, addToast } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
      addToast("Failed to fetch orders from server.", "error");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    setUpdatingId(orderId);
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus
      });

      if (response.data.success) {
        await fetchAllOrders();
        addToast(`Order #${orderId} status updated to "${newStatus}"! 🚚`, "success");
      } else {
        addToast("Failed to update status", "error");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      addToast("Error communicating with server", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="admin-orders animate-fade-in">
      <div className="orders-page-header">
        <div>
          <h1>Customer Orders Management</h1>
          <p>Real-time order processing, dispatch status & delivery tracking</p>
        </div>
        <button 
          className="refresh-btn" 
          onClick={fetchAllOrders}
          disabled={loading}
        >
          <RotateCw size={15} className={loading ? "spin-icon" : ""} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty-state">
          <div className="empty-pkg-icon">
            <Package size={45} />
          </div>
          <h3>No Customer Orders Yet</h3>
          <p>Orders placed by customers will automatically appear here in real-time.</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => {
            const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
            const dateStr = order.date ? new Date(order.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) : "Recently";

            return (
              <div key={index} className="order-item-card animate-fade-in">
                <div className="order-item-icon-box">
                  <Package size={28} />
                </div>

                {/* Middle: Items Summary & Customer Address */}
                <div className="order-item-details">
                  <div className="order-id-date-row">
                    <span className="order-id-badge">#{order._id}</span>
                    <span className="order-timestamp">
                      <Clock size={12} /> {dateStr}
                    </span>
                  </div>

                  <p className="order-item-food-list">
                    {order.items.map((item, i) => {
                      if (i === order.items.length - 1) {
                        return `${item.name} x ${item.quantity}`;
                      } else {
                        return `${item.name} x ${item.quantity}, `;
                      }
                    })}
                  </p>

                  <div className="order-item-customer-info">
                    <p className="order-customer-name">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p className="order-customer-address">
                      <MapPin size={13} className="inline-icon" />
                      {order.address?.street}, {order.address?.city}, {order.address?.state} {order.address?.zipcode}, {order.address?.country}
                    </p>
                    <p className="order-customer-phone">
                      <Phone size={13} className="inline-icon" />
                      {order.address?.phone || "+1 555-0199"}
                    </p>
                  </div>
                </div>

                {/* Amount & Items count */}
                <div className="order-item-meta">
                  <div className="meta-sub">
                    <span className="meta-label">Items</span>
                    <span className="meta-count">{itemCount}</span>
                  </div>
                  <div className="meta-sub">
                    <span className="meta-label">Total Amount</span>
                    <span className="meta-price">₹{order.amount?.toFixed(2)}</span>
                  </div>
                  <div className="payment-status-badge">
                    {order.paymentMethod === "cod" ? (
                      <span className="badge-cod"><Banknote size={13} /> Cash on Delivery</span>
                    ) : (
                      <span className="badge-paid"><CreditCard size={13} /> Paid via Stripe</span>
                    )}
                  </div>
                </div>

                {/* Status Dropdown Controller */}
                <div className="order-item-status-control">
                  <label>Delivery Stage</label>
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    className={`status-select ${order.status.toLowerCase().replace(/\s+/g, '-')}`}
                    disabled={updatingId === order._id}
                  >
                    <option value="Food Processing">🔄 Food Processing</option>
                    <option value="Out for delivery">🚚 Out for delivery</option>
                    <option value="Delivered">✅ Delivered</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
