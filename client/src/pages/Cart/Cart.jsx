import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Check
} from "lucide-react";

const Cart = () => {
  const { 
    cartItems, 
    food_list, 
    removeFromCart, 
    addToCart, 
    getTotalCartAmount, 
    url, 
    applyPromoCode,
    promoCode,
    discountPercent,
    discountAmount,
    calculatedDiscount,
    deliveryFee,
    finalTotal
  } = useContext(StoreContext);

  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  const subtotal = getTotalCartAmount();
  const cartItemEntries = Object.entries(cartItems).filter(([_, qty]) => qty > 0);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
    }
  };

  const handleQuickPromo = (code) => {
    setInputCode(code);
    applyPromoCode(code);
  };

  if (cartItemEntries.length === 0) {
    return (
      <div className="cart-empty-view animate-fade-in">
        <div className="cart-empty-illustration">
          <ShoppingBag size={55} />
        </div>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any appetizing dishes to your cart yet.</p>
        <button className="browse-menu-btn" onClick={() => navigate("/")}>
          <span>Explore Delicious Menu</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="cart animate-fade-in">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        <p className="cart-items-count">{cartItemEntries.length} items selected</p>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <div className="cart-items-section">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <div className="cart-items-divider"></div>

          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              const imageSrc = item.image.startsWith("http") 
                ? item.image 
                : `${url}/images/${item.image}`;
              const itemTotal = item.price * cartItems[item._id];

              return (
                <div key={item._id} className="cart-item-row animate-fade-in">
                  <div className="cart-item-img-cell">
                    <img src={imageSrc} alt={item.name} />
                  </div>
                  <div className="cart-item-title-cell">
                    <h4>{item.name}</h4>
                    <span className="item-cat-badge">{item.category}</span>
                  </div>
                  <div className="cart-item-price-cell">
                    ₹{item.price}
                  </div>
                  <div className="cart-item-quantity-cell">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => removeFromCart(item._id, item.name)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-val">{cartItems[item._id]}</span>
                      <button 
                        onClick={() => addToCart(item._id, item.name)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-total-cell">
                    ₹{itemTotal}
                  </div>
                  <div className="cart-item-action-cell">
                    <button 
                      onClick={() => {
                        // remove all quantities for this item
                        for (let i = 0; i < cartItems[item._id]; i++) {
                          removeFromCart(item._id);
                        }
                      }}
                      className="delete-item-btn"
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Right: Cart Summary & Promo */}
        <div className="cart-sidebar">
          {/* Order Summary Card */}
          <div className="cart-total-card">
            <h2>Order Summary</h2>
            
            <div className="cart-total-details">
              <div className="cart-total-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              {calculatedDiscount > 0 && (
                <div className="cart-total-line discount-line">
                  <span>
                    Promo Discount ({promoCode})
                  </span>
                  <span>-₹{calculatedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart-total-line">
                <span className="delivery-label">
                  <Truck size={15} /> Delivery Fee
                </span>
                <span>{deliveryFee === 0 ? <strong className="free-tag">FREE</strong> : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>

              <div className="cart-summary-divider"></div>

              <div className="cart-total-line final-total">
                <span>Total Due</span>
                <span className="final-price">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="checkout-btn" 
              onClick={() => navigate("/order")}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Promo Code Box */}
          <div className="promo-box">
            <div className="promo-box-title">
              <Tag size={16} className="tag-icon" />
              <span>Have a Promo Voucher?</span>
            </div>
            <form onSubmit={handleApplyPromo} className="promo-input-group">
              <input 
                type="text" 
                placeholder="Enter coupon code..." 
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <button type="submit">Apply</button>
            </form>

            {/* Quick Coupons List */}
            <div className="quick-coupons">
              <span className="quick-coupons-label">Click to apply:</span>
              <div className="coupon-chips">
                <button 
                  type="button" 
                  className={`coupon-chip ${promoCode === "GREATSTACK" ? "applied" : ""}`}
                  onClick={() => handleQuickPromo("GREATSTACK")}
                >
                  {promoCode === "GREATSTACK" && <Check size={12} />}
                  GREATSTACK (20% OFF)
                </button>
                <button 
                  type="button" 
                  className={`coupon-chip ${promoCode === "FOODIE50" ? "applied" : ""}`}
                  onClick={() => handleQuickPromo("FOODIE50")}
                >
                  {promoCode === "FOODIE50" && <Check size={12} />}
                  FOODIE50 (50% OFF)
                </button>
                <button 
                  type="button" 
                  className={`coupon-chip ${promoCode === "FREEDEL" ? "applied" : ""}`}
                  onClick={() => handleQuickPromo("FREEDEL")}
                >
                  {promoCode === "FREEDEL" && <Check size={12} />}
                  FREEDEL (Free Delivery)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
