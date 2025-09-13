import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import styles from "./RecipeCard.module.css";
import { UserContext } from "../../context/UserContext";

const RecipeCard = ({ recipe, full = false }) => {
  const { user, token, login } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  // Update heart color whenever user or recipe changes
  useEffect(() => {
    if (user && Array.isArray(user.favorites)) {
      setIsFavorite(
        user.favorites.map(f => f.toString()).includes(recipe._id.toString())
      );
    } else {
      setIsFavorite(false);
    }
  }, [user, recipe._id]);

  const handleToggleFavorite = async () => {
    if (!user || !token) {
      alert("You must be logged in to favorite recipes.");
      return;
    }

    // Optimistic UI: toggle heart immediately
    const previousFavorite = isFavorite;
    setIsFavorite(!isFavorite);
    setLoadingFav(true);

    //console.log("User:", user);
    //console.log("Token:", token);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/favorites/${recipe._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 403) throw new Error("Unauthorized. Token may be invalid.");
        throw new Error("Failed to update favorites");
      }

      const data = await res.json();
      const favorites = Array.isArray(data.favorites) ? data.favorites : [];

      // Update user context with new favorites
      login({ ...user, favorites }, token);

      // Ensure heart state matches actual favorites
      setIsFavorite(favorites.map(f => f.toString()).includes(recipe._id.toString()));
    } catch (err) {
      console.error(err);
      alert(err.message);
      // Revert heart if server failed
      setIsFavorite(previousFavorite);
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <div className={`${styles.recipeCard} ${full ? styles.full : styles.compact}`}>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
      )}

      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      {full && (
        <>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Tags:</strong> {recipe.tags.join(", ")}</p>

          <div className={styles.section}>
            <h3>Ingredients:</h3>
            {recipe.sections.map((section, i) => (
              <div key={i}>
                <h4>{section.name}:</h4>
                {section.ingredients.map((ing, j) => (
                  <p key={j}>{ing.quantity} {ing.name}</p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.section}>
            <h3>Instructions:</h3>
            {recipe.sections.map((section, i) => (
              <div key={i}>
                <h4>{section.name}:</h4>
                {section.instructions.map((step, k) => (
                  <p key={k}>{step}</p>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Favorite button */}
      {user && (
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favActive : ""}`}
          onClick={handleToggleFavorite}
          disabled={loadingFav}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      )}

      {/* View button (compact mode only) */}
      {!full && (
        <Button to={`/recipes/${recipe._id}`} variant="secondary">
          View Recipe
        </Button>
      )}
    </div>
  );
};

export default RecipeCard;
