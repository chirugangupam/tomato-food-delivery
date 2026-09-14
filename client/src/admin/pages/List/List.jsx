import React, { useContext, useState } from "react";
import "./List.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { Trash2, Search, Filter, Star, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const List = () => {
  const { url, food_list, fetchFoodList, addToast } = useContext(StoreContext);
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const removeFood = async (foodId, foodName) => {
    if (!window.confirm(`Are you sure you want to remove "${foodName}" from the menu?`)) {
      return;
    }

    setDeletingId(foodId);
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        await fetchFoodList();
        addToast(`🗑️ "${foodName}" removed from menu.`, "info");
      } else {
        addToast("Error removing food: " + response.data.message, "error");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      addToast("Failed to connect to server.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredFoods = food_list.filter((item) => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesSearch =
      !searchFilter ||
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.category.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-list animate-fade-in">
      <div className="list-page-header">
        <div>
          <h1>Food Inventory & Menu Items</h1>
          <p>Manage all dishes listed across customer menus ({food_list.length} total items)</p>
        </div>
        <Link to="/admin/add" className="add-item-link-btn">
          <Plus size={16} />
          <span>Add New Dish</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="list-controls-bar">
        <div className="list-search-input">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search dish by name or category..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        <div className="list-category-filter">
          <Filter size={16} className="filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Biryani">Biryani</option>
            <option value="Pizza">Pizza</option>
            <option value="Burger">Burger</option>
            <option value="South Indian">South Indian</option>
            <option value="North Indian">North Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Beverages">Beverages</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pure Veg">Pure Veg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="list-table-container">
        <div className="list-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Rating</span>
          <span>Action</span>
        </div>

        {filteredFoods.length === 0 ? (
          <div className="no-items-placeholder">
            <p>No food items match your filter criteria.</p>
          </div>
        ) : (
          filteredFoods.map((item) => {
            const imageSrc = item.image.startsWith("http")
              ? item.image
              : `${url}/images/${item.image}`;

            return (
              <div key={item._id} className="list-table-row animate-fade-in">
                <div className="list-img-cell">
                  <img src={imageSrc} alt={item.name} />
                </div>
                <div className="list-name-cell">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <div className="list-category-cell">
                  <span className="cat-pill">{item.category}</span>
                </div>
                <div className="list-price-cell">
                  ₹{item.price}
                </div>
                <div className="list-rating-cell">
                  <Star size={13} className="star-yellow" />
                  <span>{item.rating ? item.rating.toFixed(1) : "4.8"}</span>
                </div>
                <div className="list-action-cell">
                  <button
                    onClick={() => removeFood(item._id, item.name)}
                    className="delete-food-btn"
                    disabled={deletingId === item._id}
                    title="Delete item"
                    aria-label={`Delete ${item.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default List;
