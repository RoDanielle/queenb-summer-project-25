import React from "react";
import styles from "./NewRecipe.module.css"; // optional for page-specific styles

function NewRecipe() {
  return (
    <div className={styles.container}>
      <h1>Create a New Recipe</h1>
      <p>This is where your recipe creation form will go.</p>
      {/* Later you can add a form to submit new recipes */}
    </div>
  );
}

export default NewRecipe;
