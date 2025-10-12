  import React, { useState, useContext } from "react";
  import { useNavigate } from "react-router-dom";
  import styles from "./NewRecipe.module.css";
  import { createRecipe } from "../../services/recipeService";
  import { UserContext } from "../../context/UserContext";
  import { RecipeContext } from "../../context/RecipeContext";

  function NewRecipe() {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const { refreshRecipes } = useContext(RecipeContext);

    const [title, setTitle] = useState("");
    const [sections, setSections] = useState([
      { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }
    ]);
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    // Section handlers
    const handleSectionChange = (index, field, value) => {
      const newSections = [...sections];
      newSections[index][field] = value;
      setSections(newSections);
    };

    const handleIngredientChange = (secIndex, ingIndex, field, value) => {
      const newSections = [...sections];
      newSections[secIndex].ingredients[ingIndex][field] = value;
      setSections(newSections);
    };

    const handleInstructionChange = (secIndex, instrIndex, value) => {
      const newSections = [...sections];
      newSections[secIndex].instructions[instrIndex] = value;
      setSections(newSections);
    };

    const addSection = () => {
      setSections([...sections, { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }]);
    };

    const addIngredient = (secIndex) => {
      const newSections = [...sections];
      newSections[secIndex].ingredients.push({ name: "", quantity: "" });
      setSections(newSections);
    };

    const addInstruction = (secIndex) => {
      const newSections = [...sections];
      newSections[secIndex].instructions.push("");
      setSections(newSections);
    };

    // Submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!token) {
    setMessage("You must be logged in to create a recipe.");
    return;
  }

  setSubmitting(true);
  setMessage("");
  setProgress(0);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("sections", JSON.stringify(sections));
  formData.append("category", category);
  formData.append("tags", JSON.stringify(tags.split(",").map(tag => tag.trim())));
  if (image) formData.append("image", image);

  try {
    const duration = 30000; // 30 seconds
    const intervalTime = 100; // update every 0.1s
    const increment = (intervalTime / duration) * 100;

    // start animation
    const animationPromise = new Promise((resolve) => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev + increment >= 100) {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => setProgress(0), 1500); // hide bar after 1.5s
            resolve(); // resolve promise when bar is done
            return 100;
          }
          return prev + increment;
        });
      }, intervalTime);
    });

    // start actual upload
    await createRecipe(formData, () => {}, token);
    setMessage("Uploading Recipe...");

    // reset form
    setTitle("");
    setSections([{ name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }]);
    setCategory("");
    setTags("");
    setImage(null);

    refreshRecipes();

    // wait for animation to finish before redirect
    await animationPromise;
    navigate("/");

  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Failed to upload recipe.");
    setProgress(0);
  } finally {
    setSubmitting(false);
  }
};

    return (
      <div className={styles.container}>
        <h1>Create a New Recipe</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>

          <label>
            Category:
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>

          <label>
            Tags (comma separated):
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>

          <label>
            Image:
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </label>

          {sections.map((section, secIndex) => (
            <div key={secIndex} className={styles.section}>
              <h3>Section {secIndex + 1}</h3>
              <input
                type="text"
                placeholder="Section Name"
                value={section.name}
                onChange={(e) => handleSectionChange(secIndex, "name", e.target.value)}
                required
              />

              <h4>Ingredients:</h4>
              {section.ingredients.map((ing, ingIndex) => (
                <div key={ingIndex}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(secIndex, ingIndex, "name", e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(secIndex, ingIndex, "quantity", e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={() => addIngredient(secIndex)}>Add Ingredient</button>

              <h4>Instructions:</h4>
              {section.instructions.map((instr, instrIndex) => (
                <textarea
                  key={instrIndex}
                  value={instr}
                  onChange={(e) => handleInstructionChange(secIndex, instrIndex, e.target.value)}
                  required
                />
              ))}
              <button type="button" onClick={() => addInstruction(secIndex)}>Add Instruction</button>
            </div>
          ))}

          <button type="button" onClick={addSection}>Add Section</button>
          <button type="submit" disabled={submitting}>
            {submitting ? "Uploading..." : "Submit Recipe"}
          </button>

          {progress > 0 && (
            <div className={styles.progressBar}>
              <div style={{ width: `${progress}%` }} />
              <span className={styles.progressLabel}>{Math.round(progress)}%</span>
            </div>
          )}

          {message && <p>{message}</p>}
        </form>
      </div>
    );
  }

  export default NewRecipe;
