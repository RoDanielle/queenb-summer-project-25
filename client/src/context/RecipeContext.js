// src/context/RecipeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getAllRecipes } from '../services/recipeService';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // move fetch logic to a named function so we can call it later
  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const data = await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
        refreshRecipes: fetchRecipes, // 👈 expose this to children
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider };
