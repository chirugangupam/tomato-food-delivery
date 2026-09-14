import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { 
  Package, 
  RotateCw, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight,
  ChevronRight,
  CreditCard,
  Banknote
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrders = ({ setShowLogin }) => {
  const { url, token, setActiveOrderTrack } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.error("Error loading user orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="orders-login-prompt animate-fade-in">
        <div className="prompt-icon-wrap">
          <Package size={50} />
        </div>
        <h2>Sign In to View Your Orders</h2>
        <p>You need to be logged in to view your past orders and live delivery tracking.</p>
        <button className="prompt-login-btn" onClick={() => setShowLogin(true)}>
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return (
    <div className="my-orders animate-fade-in">
      <div className="my-orders-header">
        <div>
          <h1>My Orders</h1>
          <p className="orders-subtitle">Track your current deliveries and order history</p>
        </div>
        <button 
          className="refresh-orders-btn" 
          onClick={fetchOrders} 
          disabled={loading}
          title="Refresh orders"
        >
          <RotateCw size={16} className={loading ? "spin-icon" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="orders-empty-card">
          <div className="empty-box-icon">
            <ShoppingBag size={45} />
          </div>
          <h3>No Orders Placed Yet</h3>
          <p>You haven't placed any orders yet. Browse our menu to treat yourself!</p>
          <button className="browse-btn" onClick={() => navigate("/")}>
            <span>Explore Menu</span>
            <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="orders-list-container">
          {data.map((order, index) => {
            const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);
            const dateStr = order.date ? new Date(order.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) : "Recently";

            return (
              <div key={index} className="my-orders-card animate-fade-in">
                <div className="order-main-info">
                  <div className="parcel-icon-wrap">
                    <Package size={26} />
                  </div>

                  <div className="order-items-summary">
                    <div className="order-id-meta">
                      <span className="order-id-tag">#{order._id}</span>
                      <span className="order-date-tag">
                        <Clock size={12} /> {dateStr}
                      </span>
                    </div>

                    <p className="items-text">
                      {order.items.map((item, i) => {
                        if (i === order.items.length - 1) {
                          return `${item.name} x ${item.quantity}`;
                        } else {
                          return `${item.name} x ${item.quantity}, `;
                        }
                      })}
                    </p>

                    <div className="order-details-pills">
                      <span className="pill-badge items-pill">
                        {itemCount} {itemCount === 1 ? "Item" : "Items"}
                      </span>
                      <span className="pill-badge payment-pill">
                        {order.paymentMethod === "cod" ? (
                          <><Banknote size={13} /> Cash on Delivery</>
                        ) : (
                          <><CreditCard size={13} /> Paid via Stripe</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="order-amount-block">
                  <p className="amount-label">Total Amount</p>
                  <h3 className="order-amount-val">₹{order.amount?.toFixed(2)}</h3>
                </div>

                <div className="order-status-block">
                  <div className={`status-badge-indicator ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    <span className="bullet-dot"></span>
                    <span>{order.status}</span>
                  </div>

                  <button 
                    className="track-action-btn"
                    onClick={() => setActiveOrderTrack(order)}
                  >
                    <span>Track Order</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
