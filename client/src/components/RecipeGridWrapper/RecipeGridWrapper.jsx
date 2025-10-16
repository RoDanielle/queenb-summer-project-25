import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipeGridWrapper.module.css";

const RecipeGridWrapper = ({ title, recipes, loading, user, setUser, full = false, noMessage }) => {
  return (
    <div className={styles.wrapper}>
      {title && <h1 className={styles.title}>{title}</h1>}

      {loading ? (
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={styles.skeletonCard}></div>
          ))}
        </div>
      ) : recipes && recipes.length > 0 ? (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              full={full}
              user={user}
              setUser={setUser}
            />
          ))}
        </div>
      ) : (
        <p className={styles.noMessage}>{noMessage || "No recipes found."}</p>
      )}
    </div>
  );
};

export default RecipeGridWrapper;
