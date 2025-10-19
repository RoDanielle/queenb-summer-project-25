// src/components/RecipesTable/RecipesTable.jsx
import React, { useEffect, useState, useContext } from "react";
import styles from "./RecipesTable.module.css";
import { UserContext } from "../../context/UserContext";
import categories from "../../data/categories";
import RecipeEditModal from "../RecipeEditModal/RecipeEditModal";

const RecipesTable = () => {
  const { token } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // Fetch all recipes
  const fetchRecipes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch recipes");
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [token]);

  // Delete recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete recipe");
      setRecipes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Save recipe after editing
  const handleSave = async (updatedRecipe) => {
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${updatedRecipe._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!res.ok) throw new Error("Failed to update recipe");

      const data = await res.json();
      setRecipes((prev) =>
        prev.map((r) => (r._id === updatedRecipe._id ? data.recipe : r))
      );
      setEditingRecipe(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className={styles.tableWrapper}>
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <table className={styles.recipesTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Sections</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe._id}>
                <td>{recipe.title}</td>
                <td>{recipe.category}</td>
                <td>{(recipe.tags || []).join(", ")}</td>
                <td>{(recipe.sections || []).length}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => setEditingRecipe(recipe)}
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

      {editingRecipe && (
        <RecipeEditModal
          recipe={editingRecipe}
          categories={categories}
          onSave={handleSave}
          onClose={() => setEditingRecipe(null)}
        />
      )}
    </div>
  );
};

export default RecipesTable;
