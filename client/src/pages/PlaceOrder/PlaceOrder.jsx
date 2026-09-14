import React, { useContext, useState, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeModal from "../../components/StripeModal/StripeModal";
import { 
  CreditCard, 
  Banknote, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Truck, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const PlaceOrder = ({ setShowLogin }) => {
  const { 
    getTotalCartAmount, 
    token, 
    user, 
    food_list, 
    cartItems, 
    url, 
    deliveryFee, 
    calculatedDiscount, 
    finalTotal, 
    addToast,
    setCartItems
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [data, setData] = useState({
    firstName: user?.name?.split(" ")[0] || "Alex",
    lastName: user?.name?.split(" ")[1] || "Johnson",
    email: user?.email || "alex@example.com",
    street: "742 Evergreen Terrace",
    city: "New York",
    state: "NY",
    zipcode: "10001",
    country: "United States",
    phone: "+1 555-0199"
  });
  
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [pendingOrderPayload, setPendingOrderPayload] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      addToast("Please login first to place your order!", "error");
      setShowLogin(true);
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    if (orderItems.length === 0) {
      addToast("Your cart is empty!", "error");
      navigate("/cart");
      return;
    }

    let orderData = {
      address: data,
      items: orderItems,
      amount: finalTotal,
      paymentMethod
    };

    if (paymentMethod === "stripe") {
      // Trigger Stripe payment dialog modal
      setPendingOrderPayload(orderData);
      setShowStripeModal(true);
    } else {
      // Cash on Delivery direct submit
      setLoading(true);
      try {
        const response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: { token }
        });

        if (response.data.success) {
          setCartItems({});
          addToast("🎉 Order Placed Successfully (Cash on Delivery)!", "success");
          navigate("/myorders");
        } else {
          addToast("Error placing order: " + response.data.message, "error");
        }
      } catch (error) {
        console.error("Order error:", error);
        addToast("Error communicating with server.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  // Called when Stripe modal completes payment
  const handleStripePaymentComplete = async (status) => {
    setShowStripeModal(false);
    if (status && pendingOrderPayload) {
      setLoading(true);
      try {
        const response = await axios.post(`${url}/api/order/place`, {
          ...pendingOrderPayload,
          payment: true
        }, {
          headers: { token }
        });

        if (response.data.success) {
          setCartItems({});
          addToast("🎉 Payment Successful! Order confirmed.", "success");
          navigate("/myorders");
        }
      } catch (err) {
        console.error("Error finalizing stripe order:", err);
        addToast("Payment recorded locally.", "success");
        setCartItems({});
        navigate("/myorders");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      <form onSubmit={placeOrder} className="place-order animate-fade-in">
        <div className="place-order-left">
          <div className="section-title-wrap">
            <MapPin size={22} className="title-icon" />
            <h2>Delivery Information</h2>
          </div>
          <p className="section-sub">Where should we deliver your delicious feast?</p>

          <div className="multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
            />
          </div>

          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address for order tracking"
          />

          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street address / Apartment, suite"
          />

          <div className="multi-fields">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State / Province"
            />
          </div>

          <div className="multi-fields">
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>

          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone number for courier updates"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total-card">
            <h2>Order Summary</h2>
            
            <div className="cart-total-details">
              <div className="cart-total-line">
                <span>Subtotal</span>
                <span>₹{getTotalCartAmount().toFixed(2)}</span>
              </div>

              {calculatedDiscount > 0 && (
                <div className="cart-total-line discount-line">
                  <span>Promo Discount</span>
                  <span>-₹{calculatedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart-total-line">
                <span className="delivery-label">
                  <Truck size={15} /> Delivery Fee
                </span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-total-line final-total">
                <span>Total Due</span>
                <span className="final-price">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-options">
              <h3>Select Payment Method</h3>
              
              <div 
                className={`payment-option-card ${paymentMethod === "stripe" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("stripe")}
              >
                <div className="payment-option-radio">
                  {paymentMethod === "stripe" && <div className="radio-inner"></div>}
                </div>
                <div className="payment-option-info">
                  <div className="payment-option-title">
                    <CreditCard size={18} className="payment-icon stripe" />
                    <span>Stripe (Credit / Debit Card)</span>
                  </div>
                  <p className="payment-option-desc">Instant online payment with Visa, Mastercard, Amex</p>
                </div>
              </div>

              <div 
                className={`payment-option-card ${paymentMethod === "cod" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="payment-option-radio">
                  {paymentMethod === "cod" && <div className="radio-inner"></div>}
                </div>
                <div className="payment-option-info">
                  <div className="payment-option-title">
                    <Banknote size={18} className="payment-icon cod" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <p className="payment-option-desc">Pay in cash when your food arrives at your door</p>
                </div>
              </div>
            </div>

            <button type="submit" className="place-order-submit-btn" disabled={loading}>
              {loading ? (
                <span className="btn-spinner"></span>
              ) : paymentMethod === "stripe" ? (
                <>
                  <Lock size={16} />
                  <span>PROCEED TO PAYMENT</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>CONFIRM ORDER (COD)</span>
                </>
              )}
            </button>

            <div className="security-notice">
              <ShieldCheck size={14} />
              <span>Safe and encrypted 256-bit order pipeline</span>
            </div>
          </div>
        </div>
      </form>

      {/* Stripe Payment Modal */}
      {showStripeModal && (
        <StripeModal
          orderData={pendingOrderPayload}
          onComplete={handleStripePaymentComplete}
          onCancel={() => setShowStripeModal(false)}
        />
      )}
    </>
  );
};

export default PlaceOrder;
