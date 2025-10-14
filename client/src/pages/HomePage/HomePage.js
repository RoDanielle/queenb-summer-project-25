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

  // Fetch recipes from backend with filters
  const fetchFilteredRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTags.length > 0) params.tags = selectedTags.join(",");
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
    setSelectedCategory(e.target.value);
  };

  // Handle adding a tag to filter
  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
  };

  // Handle removing a tag from filter
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  // Handle filter search button click
  const handleSearch = () => {
    fetchFilteredRecipes();
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>

      <div className={styles.filters}>
        {/* Category Filter */}
        <label>
          Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        {/* Tags Filter */}
        <div className={styles.tagsFilter}>
          <span>Tags:</span>
          <input
            type="text"
            value={tagInput}
            placeholder="Enter a tag"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <button type="button" onClick={handleAddTag}>Add Tag</button>

          <div className={styles.selectedTags}>
            {selectedTags.map(tag => (
              <button
                key={tag}
                className={styles.tagButton + " " + styles.activeTag}
                type="button"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </button>
            ))}
          </div>
        </div>

        <button type="button" onClick={handleSearch}>Search</button>
      </div>

      {loading && <p className={styles.message}>Loading recipes...</p>}
      {error && <p className={styles.message}>{error}</p>}
      {!loading && !error && <RecipeList recipes={recipes} full={false} user={user} />}
    </div>
  );
};

export default Home;
