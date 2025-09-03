import React, { useContext } from 'react'; // ✅ import useContext
import styles from './Home.module.css';
import { RecipeContext } from '../../context/RecipeContext';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const Home = () => {
  const { recipes, loading, error } = useContext(RecipeContext);

  if (loading) return <p className={styles.message}>Loading recipes...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>
      <div className={styles.recipes}>
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
