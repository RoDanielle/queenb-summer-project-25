import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewRecipe.module.css";
import { createRecipe } from "../../services/recipeService";
import { UserContext } from "../../context/UserContext";
import { RecipeContext } from "../../context/RecipeContext";
import categories from "../../data/categories";

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
  const [errors, setErrors] = useState({}); // store inline errors

  // --- Form validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Recipe image is required";

    sections.forEach((section, sIndex) => {
      if (!section.name.trim()) newErrors[`sectionName${sIndex}`] = "Section name is required";

      section.ingredients.forEach((ing, iIndex) => {
        if (!ing.name.trim() || !ing.quantity.trim()) {
          newErrors[`ingredient${sIndex}-${iIndex}`] = "Ingredient name and quantity are required";
        }
      });

      section.instructions.forEach((instr, instrIndex) => {
        if (!instr.trim()) {
          newErrors[`instruction${sIndex}-${instrIndex}`] = "Instruction is required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Section/ingredient/instruction handlers ---
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

  // --- Submit handler ---
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!token) {
    setMessage("You must be logged in to create a recipe.");
    return;
  }

  if (!validateForm()) return; // stop if validation fails

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
    // 1️⃣ Try uploading first
    await createRecipe(formData, () => {}, token);

    setMessage("Uploading Recipe...");

    // 2️⃣ Start smooth 1-minute progress using wall-clock time
    const duration = 60000; // 1 minute
    const startTime = Date.now();

    const progressUpdater = () => {
      const elapsed = Date.now() - startTime; // real elapsed time
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        setTimeout(progressUpdater, 100); // update every 100ms
      } else {
        setTimeout(() => setProgress(0), 1500); // hide bar after completion
      }
    };

    progressUpdater(); // start the progress

    // 3️⃣ Reset form after starting animation (does not interfere)
    setTimeout(() => {
      setTitle("");
      setSections([{ name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }]);
      setCategory("");
      setTags("");
      setImage(null);
      setErrors({});
      refreshRecipes();
    }, 500); // small delay to allow animation to start

    // 4️⃣ Redirect after the full progress duration
    setTimeout(() => navigate("/"), duration + 1500);

  } catch (err) {
    console.error(err);
    if (err.response?.status === 401 || err.response?.status === 403) {
      setMessage("Unauthorized. Please log in.");
    } else {
      setMessage(err.response?.data?.message || "Failed to upload recipe.");
    }
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
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </label>

        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className={styles.error}>{errors.category}</span>}
        </label>

        <label>
          Tags (comma separated):
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>

        <label>
          Image:
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </label>

        {sections.map((section, sIndex) => (
          <div key={sIndex} className={styles.section}>
            <h3>Section {sIndex + 1}</h3>
            <input
              type="text"
              placeholder="Section Name"
              value={section.name}
              onChange={(e) => handleSectionChange(sIndex, "name", e.target.value)}
            />
            {errors[`sectionName${sIndex}`] && <span className={styles.error}>{errors[`sectionName${sIndex}`]}</span>}

            <h4>Ingredients:</h4>
            {section.ingredients.map((ing, iIndex) => (
              <div key={iIndex}>
                <input
                  type="text"
                  placeholder="Name"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(sIndex, iIndex, "name", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(sIndex, iIndex, "quantity", e.target.value)}
                />
                {errors[`ingredient${sIndex}-${iIndex}`] && (
                  <span className={styles.error}>{errors[`ingredient${sIndex}-${iIndex}`]}</span>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addIngredient(sIndex)}>Add Ingredient</button>

            <h4>Instructions:</h4>
            {section.instructions.map((instr, instrIndex) => (
              <div key={instrIndex}>
                <textarea
                  value={instr}
                  onChange={(e) => handleInstructionChange(sIndex, instrIndex, e.target.value)}
                />
                {errors[`instruction${sIndex}-${instrIndex}`] && (
                  <span className={styles.error}>{errors[`instruction${sIndex}-${instrIndex}`]}</span>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addInstruction(sIndex)}>Add Instruction</button>
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
