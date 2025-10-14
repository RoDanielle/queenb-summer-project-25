import React, { useContext, useState, useMemo } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { UserContext } from "../../context/UserContext";
import RecipeList from "../../components/RecipeList/RecipeList";
import styles from "./Home.module.css";
import categories from "../../data/categories"; // centralized categories list

const Home = () => {
  const { recipes, loading, error } = useContext(RecipeContext);
  const { user, setUser } = useContext(UserContext);

  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ useMemo always called before early returns
  const filteredRecipes = useMemo(() => {
    if (!selectedCategory) return recipes;
    return recipes.filter((recipe) => recipe.category === selectedCategory);
  }, [recipes, selectedCategory]);

  if (loading) return <p className={styles.message}>Loading recipes...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>

      <label className={styles.filterLabel}>
        Filter by category:{" "}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      <RecipeList
        recipes={filteredRecipes}
        full={false}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default Home;
