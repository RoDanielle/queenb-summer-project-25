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
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([
    { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }
  ]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!image) newErrors.image = "Recipe image is required";

    sections.forEach((section, sIndex) => {
      if (!section.name.trim())
        newErrors[`sectionName${sIndex}`] = "Section name is required";

      section.ingredients.forEach((ing, iIndex) => {
        if (!ing.name.trim() || !ing.quantity.trim()) {
          newErrors[`ingredient${sIndex}-${iIndex}`] =
            "Ingredient name and quantity are required";
        }
      });

      if (!section.instructions[0].trim()) {
        newErrors[`instruction${sIndex}-0`] = "Instruction is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handlers ---
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

  const handleInstructionChange = (secIndex, value) => {
    const newSections = [...sections];
    newSections[secIndex].instructions[0] = value;
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }
    ]);
  };

  const removeSection = (index) => {
    if (sections.length === 1) {
      alert("You must have at least one section.");
      return;
    }
    setSections(sections.filter((_, i) => i !== index));
  };

  const addIngredient = (secIndex) => {
    const newSections = [...sections];
    newSections[secIndex].ingredients.push({ name: "", quantity: "" });
    setSections(newSections);
  };

  const removeIngredient = (secIndex, ingIndex) => {
    const newSections = sections.map((section, i) => {
      if (i !== secIndex) return section;
      if (section.ingredients.length === 1) {
        alert("Each section must have at least one ingredient.");
        return section;
      }
      return {
        ...section,
        ingredients: section.ingredients.filter((_, j) => j !== ingIndex)
      };
    });
    setSections(newSections);
  };

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to create a recipe.");
      return;
    }

    if (!validateForm()) return;

    setSubmitting(true);
    setMessage("");
    setProgress(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("sections", JSON.stringify(sections));
    formData.append("category", category);
    formData.append(
      "tags",
      JSON.stringify(tags.split(",").map((tag) => tag.trim()))
    );
    if (image) formData.append("image", image);

    try {
      await createRecipe(formData, () => {}, token);
      setMessage("Uploading Recipe...");

      const duration = 60000;
      const startTime = Date.now();

      const progressUpdater = () => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / duration) * 100, 100);
        setProgress(percent);
        if (percent < 100) setTimeout(progressUpdater, 100);
        else setTimeout(() => setProgress(0), 1500);
      };

      progressUpdater();

      setTimeout(() => {
        setTitle("");
        setDescription("");
        setSections([
          { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }
        ]);
        setCategory("");
        setTags("");
        setImage(null);
        setErrors({});
        refreshRecipes();
      }, 500);

      setTimeout(() => navigate("/"), duration + 1500);
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

        {/* Title */}
        <div className={styles.fieldGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        {/* Description */}
        <div className={styles.fieldGroup}>
          <label>Short Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your recipe..."
            rows={3}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        {/* Category */}
        <div className={styles.fieldGroup}>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className={styles.error}>{errors.category}</span>}
        </div>

        {/* Tags */}
        <div className={styles.fieldGroup}>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Image */}
        <div className={styles.fieldGroup}>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image && <span className={styles.error}>{errors.image}</span>}
        </div>

        {/* Sections */}
        {sections.map((section, sIndex) => (
          <div key={sIndex} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Section {sIndex + 1}</h3>
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(sIndex)}
                  className={styles.removeSmallButton}
                  title="Remove section"
                >✖</button>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label>Section Name:</label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => handleSectionChange(sIndex, "name", e.target.value)}
              />
              {errors[`sectionName${sIndex}`] && (
                <span className={styles.error}>{errors[`sectionName${sIndex}`]}</span>
              )}
            </div>

            <h4>Ingredients:</h4>
            {section.ingredients.map((ing, iIndex) => (
              <div key={iIndex} className={styles.ingredientRow}>
                <div className={styles.fieldGroup}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) =>
                      handleIngredientChange(sIndex, iIndex, "name", e.target.value)
                    }
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ing.quantity}
                    onChange={(e) =>
                      handleIngredientChange(sIndex, iIndex, "quantity", e.target.value)
                    }
                  />
                </div>
                {section.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(sIndex, iIndex)}
                    className={styles.removeSmallButton}
                    title="Remove ingredient"
                  >✖</button>
                )}
                {errors[`ingredient${sIndex}-${iIndex}`] && (
                  <span className={styles.error}>
                    {errors[`ingredient${sIndex}-${iIndex}`]}
                  </span>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addIngredient(sIndex)} className={styles.addButton}>
              ➕ Add Ingredient
            </button>

            <div className={styles.fieldGroup}>
              <label>Instructions:</label>
              <textarea
                value={section.instructions[0]}
                onChange={(e) => handleInstructionChange(sIndex, e.target.value)}
              />
              {errors[`instruction${sIndex}-0`] && (
                <span className={styles.error}>
                  {errors[`instruction${sIndex}-0`]}
                </span>
              )}
            </div>
          </div>
        ))}

        <button type="button" onClick={addSection} className={styles.addButton}>
          + Add Section
        </button>

        <button type="submit" disabled={submitting} className={styles.submitButton}>
          {submitting ? "Uploading..." : "Submit Recipe"}
        </button>

        {progress > 0 && (
          <div className={styles.progressBar}>
            <div style={{ width: `${progress}%` }} />
            <span className={styles.progressLabel}>{Math.round(progress)}%</span>
          </div>
        )}

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default NewRecipe;
