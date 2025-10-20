// src/components/RecipesTable/RecipesTable.jsx
import React, { useEffect, useState, useContext } from "react";
import styles from "./RecipesTable.module.css";
import { UserContext } from "../../context/UserContext";
import RecipeEditModal from "../RecipeEditModal/RecipeEditModal"; // ✅ Import the new modal

const RecipesTable = () => {
  const { token } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // ✅ Modal control

  // --- Fetch Recipes ---
  const fetchRecipes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      setRecipes(data.recipes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [token]);

  // --- Delete Recipe ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete recipe");
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // --- Edit Recipe (open modal) ---
  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe); // ✅ Opens the modal
  };

  // --- Save after editing ---
  const handleSave = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  };

  // --- Close modal ---
  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className={styles.tableWrapper}>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className={styles.noData}>No recipes available.</p>
      ) : (
        <table className={styles.recipesTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{(recipe.tags || []).join(", ")}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(recipe)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(recipe._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✅ Show modal when a recipe is selected */}
      {selectedRecipe && (
        <RecipeEditModal
          recipe={selectedRecipe}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default RecipesTable;
