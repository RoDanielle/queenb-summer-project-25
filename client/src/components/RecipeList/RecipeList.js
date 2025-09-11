import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipeList.module.css";

const RecipeList = ({ recipes, full = false, user, setUser }) => {
  if (!recipes || recipes.length === 0) {
    return <p className={styles.noRecipes}>No recipes found.</p>;
  }

  return (
    <div className={styles.recipeList}>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          full={full}
          user={user}        // pass user
          setUser={setUser}  // pass setUser
        />
      ))}
    </div>
  );
};

export default RecipeList;
