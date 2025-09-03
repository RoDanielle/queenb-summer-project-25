import React from 'react';
import { Link } from 'react-router-dom';

import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      {recipe.image && <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />}
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
      {recipe.sections.map((section, index) => (
        <div key={index} className={styles.section}>
          <h4>{section.name}</h4>
          <p>
            <strong>Ingredients:</strong> {section.ingredients.slice(0, 2).map(ing => `${ing.quantity} ${ing.name}`).join(', ')}
            {section.ingredients.length > 2 ? '...' : ''}
          </p>
        </div>
      ))}
      <button className={styles.viewButton}>
        <Link to={`/recipes/${recipe._id}`} className={styles.link}>
          View Recipe
        </Link>
      </button>
    </div>
  );
};

export default RecipeCard
