import React, { useContext, useState } from "react";
import "./Add.css";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { Upload, CheckCircle2, Image as ImageIcon, Sparkles } from "lucide-react";

const Add = () => {
  const { url, addToast, fetchFoodList } = useContext(StoreContext);
  
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    } else {
      // Default high quality food image
      formData.append("image", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80");
    }

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad"
        });
        setImage(false);
        await fetchFoodList();
        addToast(`✅ "${data.name}" added to menu successfully!`, "success");
      } else {
        addToast(response.data.message || "Failed to add food", "error");
      }
    } catch (error) {
      console.error("Error adding food item:", error);
      addToast("Server connection error while adding food.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add animate-fade-in">
      <div className="add-page-header">
        <h1>Add New Food Item</h1>
        <p>Fill out the details below to add a new dish to your restaurant menu.</p>
      </div>

      <form className="add-form" onSubmit={onSubmitHandler}>
        {/* Image Upload Area */}
        <div className="add-img-upload-field">
          <label htmlFor="image">
            <span className="upload-label">Upload Dish Image</span>
            <div className="image-preview-container">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Upload preview"
                  className="uploaded-preview-img"
                />
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon-circle">
                    <Upload size={24} />
                  </div>
                  <p className="upload-main-text">Click or drag image to upload</p>
                  <p className="upload-sub-text">PNG, JPG, WEBP (Max 5MB)</p>
                </div>
              )}
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            accept="image/*"
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name-field">
          <label htmlFor="product-name">Dish Name</label>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            id="product-name"
            name="name"
            placeholder="e.g. Truffle Mushroom Risotto"
            required
          />
        </div>

        {/* Product Description */}
        <div className="add-product-desc-field">
          <label htmlFor="product-desc">Dish Description</label>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id="product-desc"
            rows="4"
            placeholder="Write ingredients, cooking method, flavor profiles..."
            required
          ></textarea>
        </div>

        {/* Category & Price Row */}
        <div className="add-category-price-row">
          <div className="add-category-field">
            <label htmlFor="category">Category</label>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
              id="category"
            >
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

          <div className="add-price-field">
            <label htmlFor="price">Price (₹)</label>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              id="price"
              placeholder="e.g. 180"
              min="1"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-submit-btn" disabled={loading}>
          {loading ? (
            <span className="btn-spinner"></span>
          ) : (
            <span>ADD FOOD ITEM</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Add;
