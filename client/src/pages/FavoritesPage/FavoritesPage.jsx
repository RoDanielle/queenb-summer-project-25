import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { token } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // track loading state

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        const populatedFavorites = Array.isArray(data.user.favorites)
          ? data.user.favorites.map((recipe) => ({
              _id: recipe._id || recipe,
              title: recipe.title || "Untitled Recipe",
              description: recipe.description || "No description",
              image: recipe.image || "",
              category: recipe.category || "",
              tags: recipe.tags || [],
              sections: recipe.sections || [],
            }))
          : [];

        setFavorites(populatedFavorites);
      } catch (err) {
        console.error("Failed to fetch favorites:", err.message);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <div className={styles.container}>
      <h1>Your Favorite Recipes</h1>

      {loading ? (
  <div className={styles.grid}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className={styles.skeletonCard}></div>
    ))}
  </div>
) : favorites.length > 0 ? (
  <div className={styles.grid}>
    {favorites.map((recipe) => (
      <RecipeCard key={recipe._id} recipe={recipe} />
    ))}
  </div>
) : (
  <p className={styles.noFavoritesMessage}>You haven't favorited any recipes yet.</p>
)}

    </div>
  );
};

export default FavoritesPage;
