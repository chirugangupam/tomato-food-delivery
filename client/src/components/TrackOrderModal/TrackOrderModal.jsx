import React, { useContext } from "react";
import "./TrackOrderModal.css";
import { StoreContext } from "../../context/StoreContext";
import { 
  CheckCircle2, 
  ChefHat, 
  Bike, 
  Home, 
  X, 
  MapPin, 
  Clock, 
  Phone,
  Package
} from "lucide-react";

const TrackOrderModal = () => {
  const { activeOrderTrack, setActiveOrderTrack } = useContext(StoreContext);

  if (!activeOrderTrack) return null;

  const getStepIndex = (status) => {
    switch (status) {
      case "Food Processing":
        return 1;
      case "Out for delivery":
      case "Out for Delivery":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStepIndex(activeOrderTrack.status);

  const steps = [
    { title: "Order Placed", desc: "Received by restaurant", icon: CheckCircle2 },
    { title: "Food Processing", desc: "Kitchen is preparing your meal", icon: ChefHat },
    { title: "Out for Delivery", desc: "Rider is heading to your location", icon: Bike },
    { title: "Delivered", desc: "Enjoy your meal!", icon: Home },
  ];

  return (
    <div className="track-modal-overlay">
      <div className="track-backdrop" onClick={() => setActiveOrderTrack(null)}></div>

      <div className="track-card animate-pop-in">
        <div className="track-header">
          <div>
            <span className="track-badge">Live Tracker</span>
            <h3>Order #{activeOrderTrack._id}</h3>
          </div>
          <button className="track-close" onClick={() => setActiveOrderTrack(null)}>
            <X size={20} />
          </button>
        </div>

        {/* Status Banner */}
        <div className="track-status-banner">
          <div className="eta-block">
            <Clock size={20} className="eta-icon" />
            <div>
              <p className="eta-label">Estimated Delivery</p>
              <h4 className="eta-time">
                {activeOrderTrack.status === "Delivered" ? "Delivered Just Now" : "25 - 35 mins"}
              </h4>
            </div>
          </div>
          <div className={`status-pill ${activeOrderTrack.status.toLowerCase().replace(/\s+/g, '-')}`}>
            <span className="status-dot"></span>
            <span>{activeOrderTrack.status}</span>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="track-stepper">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className={`step-node ${isCompleted ? "completed" : ""} ${isCurrent ? "current" : ""}`}>
                <div className="step-icon-box">
                  <Icon size={18} />
                </div>
                <div className="step-info">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`step-connector ${idx < currentStep ? "completed" : ""}`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Delivery Address & Order Summary */}
        <div className="track-details-grid">
          <div className="track-sub-card">
            <div className="sub-card-title">
              <MapPin size={16} />
              <span>Delivery Address</span>
            </div>
            <p className="recipient-name">
              {activeOrderTrack.address?.firstName} {activeOrderTrack.address?.lastName}
            </p>
            <p className="address-line">
              {activeOrderTrack.address?.street}, {activeOrderTrack.address?.city}, {activeOrderTrack.address?.state} {activeOrderTrack.address?.zipcode}
            </p>
            <p className="phone-line">
              <Phone size={13} /> {activeOrderTrack.address?.phone || "+1 555-0199"}
            </p>
          </div>

          <div className="track-sub-card">
            <div className="sub-card-title">
              <Package size={16} />
              <span>Items in Order ({activeOrderTrack.items?.length || 0})</span>
            </div>
            <div className="items-mini-list">
              {activeOrderTrack.items?.map((item, i) => (
                <div key={i} className="item-mini-row">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="item-mini-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="track-total-row">
              <span>Total Paid:</span>
              <span className="bold-price">₹{activeOrderTrack.amount?.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
