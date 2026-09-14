import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { UtensilsCrossed } from "lucide-react";

const FoodDisplay = () => {
  const { food_list, category, searchTerm } = useContext(StoreContext);

  const filteredFoods = food_list.filter((item) => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch =
      !searchTerm ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <div>
          <h2 className="food-display-title">Top dishes near you</h2>
          <p className="food-display-subtitle">
            {searchTerm
              ? `Search results for "${searchTerm}" (${filteredFoods.length} items)`
              : category === "All"
              ? `Showing all delicious dishes (${filteredFoods.length})`
              : `Showing ${category} selection (${filteredFoods.length})`}
          </p>
        </div>
      </div>

      {filteredFoods.length === 0 ? (
        <div className="food-empty-state">
          <div className="empty-icon-wrap">
            <UtensilsCrossed size={40} />
          </div>
          <h3>No matching dishes found</h3>
          <p>Try searching for a different keyword or explore another category.</p>
        </div>
      ) : (
        <div className="food-display-list">
          {filteredFoods.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              rating={item.rating}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
