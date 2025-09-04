import React, { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import RecipeList from "../../components/RecipeList/RecipeList";
import styles from "./Home.module.css";

const Home = () => {
  const { recipes, loading, error } = useContext(RecipeContext);

  if (loading) return <p className={styles.message}>Loading recipes...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>
      <RecipeList recipes={recipes} full={false} />
    </div>
  );
};

export default Home;
