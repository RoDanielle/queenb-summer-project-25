import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe, full = false }) => {
  return (
    <div className={styles.recipeCard}>
      {/* IMAGE */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className={styles.recipeImage}
        />
      )}

      {/* TITLE + DESCRIPTION */}
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      {/* EXTRA INFO only in full mode */}
      {full && (
  <>
    <p>
      <strong>Category:</strong> {recipe.category}
    </p>
    <p>
      <strong>Tags:</strong> {recipe.tags.join(', ')}
    </p>

    {/* ALL INGREDIENTS */}
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

    {/* ALL INSTRUCTIONS */}
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

      {/* VIEW BUTTON only if NOT full mode */}
      {!full && (
        <button className={styles.viewButton}>
          <Link to={`/recipes/${recipe._id}`} className={styles.link}>
            View Recipe
          </Link>
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
