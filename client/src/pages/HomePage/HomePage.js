import React, { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import RecipeGridWrapper from "../../components/RecipeGridWrapper/RecipeGridWrapper";
import styles from "./Home.module.css";
import categories from "../../data/categories";
import { getAllRecipes } from "../../services/recipeService";

const Home = () => {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Load initial filters from URL or localStorage
  const savedCategory = localStorage.getItem("homeCategory") || "";
  const savedTags = JSON.parse(localStorage.getItem("homeTags") || "[]");

  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || savedCategory
  );
  const [selectedTags, setSelectedTags] = useState(savedTags);
  const [tagInput, setTagInput] = useState("");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipes
  const fetchFilteredRecipes = async (
    category = selectedCategory,
    tags = selectedTags,
    sortValue = sort
  ) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (category) params.category = category;
      if (tags.length > 0) params.tags = tags.join(",");
      if (sortValue) params.sort = sortValue;

      const data = await getAllRecipes(params);
      setRecipes(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchFilteredRecipes();
  }, []);

  // Save filters + sort to localStorage & URL
  useEffect(() => {
    localStorage.setItem("homeCategory", selectedCategory);
    localStorage.setItem("homeTags", JSON.stringify(selectedTags));

    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedTags.length > 0) params.tags = selectedTags.join(",");
    if (sort) params.sort = sort;
    setSearchParams(params);
  }, [selectedCategory, selectedTags, sort]);

  // Handlers
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    fetchFilteredRecipes(value, selectedTags, sort);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      fetchFilteredRecipes(selectedCategory, newTags, sort);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tag) => {
    const newTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(newTags);
    fetchFilteredRecipes(selectedCategory, newTags, sort);
  };

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedTags([]);
    setTagInput("");
    setSort("newest");
    fetchFilteredRecipes("", [], "newest");
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    fetchFilteredRecipes(selectedCategory, selectedTags, newSort);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>

      {/* Filters section */}
      <div className={styles.filters}>
        <div className={styles.filtersTop}>
          <label>
            Category:
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
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

          {/* 🧭 Sort dropdown */}
          <label>
            Sort:
            <select value={sort} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </label>

          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
          >
            Clear
          </button>
        </div>

        <div className={styles.selectedTags}>
          {selectedTags.map((tag) => (
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

      {/* Recipe grid */}
      <RecipeGridWrapper
        title=""
        recipes={recipes}
        loading={loading}
        user={user}
        full={false}
        noMessage={error || "No recipes found."}
      />
    </div>
  );
};

export default Home;
