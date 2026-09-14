import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [activeOrderTrack, setActiveOrderTrack] = useState(null);

  const url = "http://localhost:4000";

  // Toast Notification Trigger
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Add item to cart
  const addToCart = async (itemId, foodName = "") => {
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      return { ...prev, [itemId]: current + 1 };
    });

    if (foodName) {
      addToast(`Added "${foodName}" to cart! 🛒`, "success");
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId, foodName = "") => {
    setCartItems((prev) => {
      const current = prev[itemId] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      }
      return { ...prev, [itemId]: current - 1 };
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
  };

  // Calculate Total Cart Amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Calculate Total Quantity
  const getTotalCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  // Apply Coupon / Promo Code
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "GREATSTACK" || cleanCode === "GANESH2026") {
      setPromoCode(cleanCode);
      setDiscountPercent(20);
      setDiscountAmount(0);
      addToast(`🎉 Promo ${cleanCode} applied: 20% OFF!`, "success");
      return true;
    } else if (cleanCode === "FOODIE50") {
      setPromoCode("FOODIE50");
      setDiscountPercent(50);
      setDiscountAmount(0);
      addToast("🔥 Super Deal! 50% OFF applied!", "success");
      return true;
    } else if (cleanCode === "WELCOME10" || cleanCode === "WELCOME100") {
      setPromoCode(cleanCode);
      setDiscountPercent(0);
      setDiscountAmount(100);
      addToast("🎁 ₹100 Welcome Discount applied!", "success");
      return true;
    } else if (cleanCode === "FREEDEL") {
      setPromoCode("FREEDEL");
      setDiscountPercent(0);
      setDiscountAmount(0);
      addToast("🚚 Free Delivery voucher applied!", "success");
      return true;
    } else {
      addToast("❌ Invalid promo code. Try GREATSTACK or GANESH2026", "error");
      return false;
    }
  };

  // Fetch Food List from Backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (err) {
      console.error("Failed to load food list from backend:", err);
    }
  };

  // Fetch User Cart Data
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (err) {
      console.error("Failed to load cart data:", err);
    }
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    setCartItems({});
    addToast("Logged out successfully 👋", "info");
  };

  // Calculate Delivery Fee
  const subtotal = getTotalCartAmount();
  const deliveryFee =
    subtotal === 0 || promoCode === "FREEDEL" || subtotal >= 500 ? 0 : 40;

  // Calculate final total
  const calculatedDiscount =
    discountPercent > 0
      ? (subtotal * discountPercent) / 100
      : Math.min(discountAmount, subtotal);
  const finalTotal = Math.max(0, subtotal - calculatedDiscount + deliveryFee);

  // Initial Load
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error(e);
        }
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    setFoodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartCount,
    url,
    token,
    setToken,
    user,
    setUser,
    logout,
    fetchFoodList,
    toasts,
    addToast,
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    promoCode,
    discountPercent,
    discountAmount,
    calculatedDiscount,
    deliveryFee,
    finalTotal,
    applyPromoCode,
    activeOrderTrack,
    setActiveOrderTrack,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
