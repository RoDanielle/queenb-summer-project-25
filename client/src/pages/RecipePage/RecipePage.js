import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../services/recipeService";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from "./RecipePage.module.css";

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
      <RecipeCard recipe={recipe} full={true} />
    </div>
  );
};

export default RecipeDetailPage;
