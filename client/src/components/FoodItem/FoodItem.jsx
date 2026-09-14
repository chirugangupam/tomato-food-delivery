import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
import { Plus, Minus, Star, Heart } from "lucide-react";

const FoodItem = ({ id, name, price, description, image, rating, category }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const itemCount = cartItems[id] || 0;

  // Resolve image url (uploaded file vs external unsplash URL)
  const imageSrc = image
    ? image.startsWith("http")
      ? image
      : `${url}/images/${image}`
    : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="food-item animate-fade-in">
      <div className="food-item-img-container">
        <img className="food-item-image" src={imageSrc} alt={name} loading="lazy" />
        
        {/* Category Pill */}
        {category && (
          <span className="food-item-category-tag">
            {category}
          </span>
        )}

        {/* Counter / Add to Cart Action */}
        {!itemCount ? (
          <button 
            className="food-item-add-btn" 
            onClick={() => addToCart(id, name)}
            title="Add to cart"
            aria-label={`Add ${name} to cart`}
          >
            <Plus size={18} />
          </button>
        ) : (
          <div className="food-item-counter animate-pop-in">
            <button 
              className="counter-btn minus" 
              onClick={() => removeFromCart(id, name)}
              aria-label="Decrease quantity"
            >
              <Minus size={15} />
            </button>
            <span className="counter-val">{itemCount}</span>
            <button 
              className="counter-btn plus" 
              onClick={() => addToCart(id, name)}
              aria-label="Increase quantity"
            >
              <Plus size={15} />
            </button>
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <h3 className="food-item-title">{name}</h3>
          <div className="food-item-rating">
            <Star size={14} className="star-icon" />
            <span>{rating ? rating.toFixed(1) : "4.8"}</span>
          </div>
        </div>
        <p className="food-item-desc">{description}</p>
        <div className="food-item-footer">
          <p className="food-item-price">₹{price}</p>
          <span className="food-item-calories">Fresh & Made to Order</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
