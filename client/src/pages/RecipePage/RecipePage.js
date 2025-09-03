import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/recipeService';
import styles from './RecipePage.module.css';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data); 
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className={styles.recipePage}>
      <h1>{recipe.title}</h1>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
      )}
      <p className={styles.recipeDescription}>{recipe.description}</p>

      {/* INGREDIENTS */}
      <div className={styles.section}>
        <h2>Ingredients</h2>
        {recipe.sections.map((section, i) => (
          <div key={i}>
            <h3>{section.name}</h3>
            <ul className={styles.ingredients}>
              {section.ingredients.map((ing, j) => (
                <li key={j}>{ing.quantity} {ing.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* INSTRUCTIONS */}
      <div className={styles.section}>
        <h2>Instructions</h2>
        {recipe.sections.map((section, i) => (
          <div key={i}>
            <h3>{section.name}</h3>
            <ol className={styles.instructions}>
              {section.instructions.map((step, k) => (
                <li key={k}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      {/* TAGS */}
      {recipe.tags && recipe.tags.length > 0 && (
        <div className={styles.tagList}>
          {recipe.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
