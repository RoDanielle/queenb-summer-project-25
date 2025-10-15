import React, { useContext, useState, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { UserContext } from "../../context/UserContext";
import RecipeList from "../../components/RecipeList/RecipeList";
import styles from "./Home.module.css";
import categories from "../../data/categories"; // centralized categories list
import { getAllRecipes } from "../../services/recipeService";

const Home = () => {
  const { user } = useContext(UserContext);
  const { refreshRecipes } = useContext(RecipeContext);

  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tagInput, setTagInput] = useState(""); // input box for tags
  const [selectedTags, setSelectedTags] = useState([]); // active tags filter
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipes with filters
  const fetchFilteredRecipes = async (category = selectedCategory, tags = selectedTags) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (category) params.category = category;
      if (tags.length > 0) params.tags = tags.join(",");
      const data = await getAllRecipes(params);
      setRecipes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchFilteredRecipes();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    fetchFilteredRecipes(value, selectedTags); // immediately fetch
  };

  // Handle adding a tag to filter
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      fetchFilteredRecipes(selectedCategory, newTags); // immediately fetch
    }
    setTagInput("");
  };

  // Handle removing a tag from filter
  const handleRemoveTag = (tag) => {
    const newTags = selectedTags.filter(t => t !== tag);
    setSelectedTags(newTags);
    fetchFilteredRecipes(selectedCategory, newTags); // immediately fetch
  };

  // Handle clear filters
  const handleClear = () => {
    const clearedCategory = "";
    const clearedTags = [];
    setSelectedCategory(clearedCategory);
    setSelectedTags(clearedTags);
    fetchFilteredRecipes(clearedCategory, clearedTags); // immediately fetch
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>

      <div className={styles.filters}>
        {/* 🔹 Top row: category select, tag input, clear button */}
        <div className={styles.filtersTop}>
          <label>
            Category:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>

          <div className={styles.tagsFilter}>
            <input
              type="text"
              value={tagInput}
              placeholder="Enter a tag and press Enter"
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            />
          </div>

          <button type="button" onClick={handleClear} className={styles.clearButton}>
            Clear
          </button>
        </div>

        {/* 🔹 Tags row below top row */}
        <div className={styles.selectedTags}>
          {selectedTags.map(tag => (
            <button
              key={tag}
              className={`${styles.tagButton} ${styles.activeTag}`}
              type="button"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag} ×
            </button>
          ))}
        </div>
      </div>

      {loading && <p className={styles.message}>Loading recipes...</p>}
      {error && <p className={styles.message}>{error}</p>}
      {!loading && !error && <RecipeList recipes={recipes} full={false} user={user} />}
    </div>
  );
};

export default Home;
