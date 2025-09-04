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

          {recipe.sections.map((section, index) => (
            <div key={index} className={styles.section}>
              <h4>{section.name}</h4>
              <p>
                <strong>Ingredients:</strong>{' '}
                {section.ingredients
                  .map((ing) => `${ing.quantity} ${ing.name}`)
                  .join(', ')}
              </p>
              <ol>
                {section.instructions.map((step, k) => (
                  <li key={k}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
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
