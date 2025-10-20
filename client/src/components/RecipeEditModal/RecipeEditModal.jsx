import React, { useState, useContext, useRef } from "react";
import styles from "./RecipeEditModal.module.css";
import categories from "../../data/categories";
import { UserContext } from "../../context/UserContext";

const RecipeEditModal = ({ recipe, onClose, onSave }) => {
  const { token } = useContext(UserContext);
  const formRef = useRef(null);

  const [title, setTitle] = useState(recipe.title || "");
  const [description, setDescription] = useState(recipe.description || "");
  const [category, setCategory] = useState(recipe.category || "");
  const [tags, setTags] = useState((recipe.tags || []).join(", "));
  const [sections, setSections] = useState(
    recipe.sections && recipe.sections.length
      ? recipe.sections
      : [{ name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] }]
  );

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!category.trim()) newErrors.category = "Category is required";
    if (!tags.trim()) newErrors.tags = "Tags are required";

    sections.forEach((section, sIndex) => {
      if (!section.name.trim())
        newErrors[`sectionName${sIndex}`] = "Section name is required";

      section.ingredients.forEach((ing, iIndex) => {
        if (!ing.name.trim())
          newErrors[`ingredientName${sIndex}-${iIndex}`] = "Ingredient name is required";
        if (!ing.quantity.trim())
          newErrors[`ingredientQty${sIndex}-${iIndex}`] = "Quantity is required";
      });

      if (!section.instructions[0]?.trim()) {
        newErrors[`instruction${sIndex}-0`] = "Instruction is required";
      }
    });

    setErrors(newErrors);

    // Scroll to first invalid input for better UX
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = formRef.current.querySelector(
        `.${styles.errorInput}`
      );
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }

    return true;
  };

  // --- Section / Ingredient Handlers ---
  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleIngredientChange = (secIndex, ingIndex, field, value) => {
    const updated = [...sections];
    updated[secIndex].ingredients[ingIndex][field] = value;
    setSections(updated);
  };

  const handleInstructionChange = (secIndex, value) => {
    const updated = [...sections];
    updated[secIndex].instructions[0] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([
      ...sections,
      { name: "", ingredients: [{ name: "", quantity: "" }], instructions: [""] },
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
    const updated = [...sections];
    updated[secIndex].ingredients.push({ name: "", quantity: "" });
    setSections(updated);
  };

  const removeIngredient = (secIndex, ingIndex) => {
    const updated = [...sections];
    if (updated[secIndex].ingredients.length === 1) {
      alert("Each section must have at least one ingredient.");
      return;
    }
    updated[secIndex].ingredients.splice(ingIndex, 1);
    setSections(updated);
  };

  // --- Save handler ---
  const handleSave = async () => {
    if (!validateForm()) return;
    setSaving(true);
    setMessage("");

    try {
      const body = {
        title,
        description,
        category,
        tags: tags.split(",").map((t) => t.trim()),
        sections,
      };

      const res = await fetch(`http://localhost:5000/api/recipes/${recipe._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update recipe");
      const data = await res.json();
      onSave(data.recipe);
      onClose();
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={formRef}>
        <div className={styles.modalHeader}>
          <h2>Edit Recipe</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div className={styles.modalBody}>
          {/* Title */}
          <div className={styles.fieldGroup}>
            <label>Title:</label>
            <input
              className={errors.title ? styles.errorInput : ""}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>

          {/* Description */}
          <div className={styles.fieldGroup}>
            <label>Description:</label>
            <textarea
              className={errors.description ? styles.errorInput : ""}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            {errors.description && <span className={styles.error}>{errors.description}</span>}
          </div>

          {/* Category */}
          <div className={styles.fieldGroup}>
            <label>Category:</label>
            <select
              className={errors.category ? styles.errorInput : ""}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
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
              className={errors.tags ? styles.errorInput : ""}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            {errors.tags && <span className={styles.error}>{errors.tags}</span>}
          </div>

          {/* Sections */}
          {sections.map((section, sIndex) => (
            <div key={sIndex} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h4>Section {sIndex + 1}</h4>
                {sections.length > 1 && (
                  <button type="button" onClick={() => removeSection(sIndex)} className={styles.removeSmallButton}>✖</button>
                )}
              </div>

              <input
                type="text"
                placeholder="Section name"
                value={section.name}
                className={errors[`sectionName${sIndex}`] ? styles.errorInput : ""}
                onChange={(e) => handleSectionChange(sIndex, "name", e.target.value)}
              />
              {errors[`sectionName${sIndex}`] && <span className={styles.error}>{errors[`sectionName${sIndex}`]}</span>}

              <h5>Ingredients:</h5>
{section.ingredients.map((ing, iIndex) => (
  <div key={iIndex} className={styles.ingredientBlock}>
    <div className={styles.ingredientRow}>
      <input
        type="text"
        placeholder="Ingredient"
        value={ing.name}
        className={errors[`ingredientName${sIndex}-${iIndex}`] ? styles.errorInput : ""}
        onChange={(e) => handleIngredientChange(sIndex, iIndex, "name", e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantity"
        value={ing.quantity}
        className={errors[`ingredientQty${sIndex}-${iIndex}`] ? styles.errorInput : ""}
        onChange={(e) => handleIngredientChange(sIndex, iIndex, "quantity", e.target.value)}
      />
      {section.ingredients.length > 1 && (
        <button
          type="button"
          onClick={() => removeIngredient(sIndex, iIndex)}
          className={styles.removeSmallButton}
        >
          ✖
        </button>
      )}
    </div>

    {/* Ingredient error messages */}
    {(errors[`ingredientName${sIndex}-${iIndex}`] ||
      errors[`ingredientQty${sIndex}-${iIndex}`]) && (
      <div className={styles.errorGroup}>
        {errors[`ingredientName${sIndex}-${iIndex}`] && (
          <span className={styles.error}>
            {errors[`ingredientName${sIndex}-${iIndex}`]}
          </span>
        )}
        {errors[`ingredientQty${sIndex}-${iIndex}`] && (
          <span className={styles.error}>
            {errors[`ingredientQty${sIndex}-${iIndex}`]}
          </span>
        )}
      </div>
    )}
  </div>
))}
<button
  type="button"
  onClick={() => addIngredient(sIndex)}
  className={styles.addButton}
>
  ➕ Add Ingredient
</button>

              <h5>Instructions:</h5>
              <textarea
                className={errors[`instruction${sIndex}-0`] ? styles.errorInput : ""}
                value={section.instructions[0]}
                onChange={(e) => handleInstructionChange(sIndex, e.target.value)}
                rows={3}
              />
              {errors[`instruction${sIndex}-0`] && <span className={styles.error}>{errors[`instruction${sIndex}-0`]}</span>}
            </div>
          ))}

          <button type="button" onClick={addSection} className={styles.addButton}>+ Add Section</button>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default RecipeEditModal;
