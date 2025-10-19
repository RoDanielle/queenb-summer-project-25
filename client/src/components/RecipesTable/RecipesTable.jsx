import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import styles from "./RecipesTable.module.css";

const RecipesTable = () => {
  const { token } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editData, setEditData] = useState({ title: "", category: "", description: "" });

  // Fetch all recipes
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/recipes/");
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
  }, []);

  // Delete a recipe
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
    }
  };

  // Start editing a recipe
  const startEdit = (recipe) => {
    setEditingRecipe(recipe._id);
    setEditData({
      title: recipe.title,
      description: recipe.description || "",
      category: recipe.category || "",
    });
  };

  // Cancel edit
  const cancelEdit = () => setEditingRecipe(null);

  // Save edit
  const saveEdit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${editingRecipe}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!res.ok) throw new Error("Failed to update recipe");
      const data = await res.json();

      setRecipes(recipes.map((r) => (r._id === editingRecipe ? data.recipe : r)));
      setEditingRecipe(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div className={styles.tableWrapper}>
      <h2>All Recipes</h2>
      <table className={styles.recipesTable}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe._id}>
              <td>
                {editingRecipe === recipe._id ? (
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                ) : (
                  recipe.title
                )}
              </td>
              <td>
                {editingRecipe === recipe._id ? (
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  />
                ) : (
                  recipe.category
                )}
              </td>
              <td>
                {editingRecipe === recipe._id ? (
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                ) : (
                  recipe.description || "No description"
                )}
              </td>
              <td>
                {editingRecipe === recipe._id ? (
                  <>
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(recipe)}>Edit</button>
                    <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipesTable;
