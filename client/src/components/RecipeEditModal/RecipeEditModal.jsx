import React, { useState } from "react";
import styles from "./RecipeEditModal.module.css";

const RecipeEditModal = ({ recipe, categories, onSave, onClose }) => {
  const [form, setForm] = useState({
    _id: recipe._id,
    title: recipe.title || "",
    category: recipe.category || "",
    tags: (recipe.tags || []).join(", "),
    description: recipe.description || "",
    sections: recipe.sections || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...form.sections];
    updated[index][field] = value;
    setForm({ ...form, sections: updated });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [
        ...form.sections,
        { name: "", ingredients: [], instructions: [] },
      ],
    });
  };

  const removeSection = (index) => {
    const updated = [...form.sections];
    updated.splice(index, 1);
    setForm({ ...form, sections: updated });
  };

  const handleAddIngredient = (sIndex) => {
    const updated = [...form.sections];
    updated[sIndex].ingredients.push({ name: "", quantity: "" });
    setForm({ ...form, sections: updated });
  };

  const handleIngredientChange = (sIndex, iIndex, field, value) => {
    const updated = [...form.sections];
    updated[sIndex].ingredients[iIndex][field] = value;
    setForm({ ...form, sections: updated });
  };

  const handleAddInstruction = (sIndex) => {
    const updated = [...form.sections];
    updated[sIndex].instructions.push("");
    setForm({ ...form, sections: updated });
  };

  const handleInstructionChange = (sIndex, iIndex, value) => {
    const updated = [...form.sections];
    updated[sIndex].instructions[iIndex] = value;
    setForm({ ...form, sections: updated });
  };

  const handleSave = () => {
    const updated = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSave(updated);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Recipe</h2>

        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Tags</label>
        <input
          name="tags"
          placeholder="comma separated"
          value={form.tags}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <h3>Sections</h3>
        {form.sections.map((section, sIndex) => (
          <div key={sIndex} className={styles.section}>
            <input
              placeholder="Section name"
              value={section.name}
              onChange={(e) =>
                handleSectionChange(sIndex, "name", e.target.value)
              }
            />
            <button
              className={styles.removeBtn}
              onClick={() => removeSection(sIndex)}
            >
              Remove Section
            </button>

            <h4>Ingredients</h4>
            {section.ingredients.map((ing, iIndex) => (
              <div key={iIndex} className={styles.inlineGroup}>
                <input
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={(e) =>
                    handleIngredientChange(sIndex, iIndex, "quantity", e.target.value)
                  }
                />
                <input
                  placeholder="Ingredient name"
                  value={ing.name}
                  onChange={(e) =>
                    handleIngredientChange(sIndex, iIndex, "name", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              className={styles.smallBtn}
              onClick={() => handleAddIngredient(sIndex)}
            >
              + Add Ingredient
            </button>

            <h4>Instructions</h4>
            {section.instructions.map((instr, iIndex) => (
              <textarea
                key={iIndex}
                placeholder={`Step ${iIndex + 1}`}
                value={instr}
                onChange={(e) =>
                  handleInstructionChange(sIndex, iIndex, e.target.value)
                }
              />
            ))}
            <button
              className={styles.smallBtn}
              onClick={() => handleAddInstruction(sIndex)}
            >
              + Add Instruction
            </button>
          </div>
        ))}

        <button className={styles.addBtn} onClick={addSection}>
          + Add Section
        </button>

        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeEditModal;
