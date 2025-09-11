import React, { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { UserContext } from "../../context/UserContext"; // <-- add this
import RecipeList from "../../components/RecipeList/RecipeList";
import styles from "./Home.module.css";

const Home = () => {
  const { recipes, loading, error } = useContext(RecipeContext);
  const { user, setUser } = useContext(UserContext); // <-- get user

  if (loading) return <p className={styles.message}>Loading recipes...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Let's get cooking</h1>
      {/* pass user and setUser to RecipeList */}
      <RecipeList recipes={recipes} full={false} user={user} setUser={setUser} />
    </div>
  );
};

export default Home;
