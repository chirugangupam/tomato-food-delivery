import React, { useContext } from "react";
import "./ExploreMenu.css";
import { StoreContext } from "../../context/StoreContext";

export const menu_list = [
  {
    menu_name: "Biryani",
    menu_image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Pizza",
    menu_image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Burger",
    menu_image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "South Indian",
    menu_image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "North Indian",
    menu_image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Chinese",
    menu_image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Beverages",
    menu_image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Salad",
    menu_image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Rolls",
    menu_image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Deserts",
    menu_image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Sandwich",
    menu_image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Cake",
    menu_image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Pure Veg",
    menu_image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Pasta",
    menu_image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=300&q=80"
  },
  {
    menu_name: "Noodles",
    menu_image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80"
  }
];

const ExploreMenu = () => {
  const { category, setCategory } = useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="explore-menu-header">
        <h2 className="explore-menu-title">Explore our delicious menu</h2>
        <p className="explore-menu-text">
          Choose from a diverse selection of handcrafted recipes, featuring aromatic biryanis,
          oven-fresh pizzas, juicy burgers, authentic South & North Indian classics, rolls, pasta, and delectable desserts.
        </p>
      </div>

      <div className="explore-menu-list">
        {/* All items category chip */}
        <div 
          onClick={() => setCategory("All")}
          className={`explore-menu-list-item ${category === "All" ? "active" : ""}`}
        >
          <div className="category-img-wrapper all-chip">
            <span className="all-icon">🍽️</span>
          </div>
          <p>All Dishes</p>
        </div>

        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className={`explore-menu-list-item ${isActive ? "active" : ""}`}
            >
              <div className="category-img-wrapper">
                <img 
                  src={item.menu_image} 
                  alt={item.menu_name}
                  loading="lazy" 
                />
              </div>
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="menu-divider" />
    </div>
  );
};

export default ExploreMenu;
