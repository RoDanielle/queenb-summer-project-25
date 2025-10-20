import React, { useState, useEffect } from "react";
import styles from "./UserEditModal.module.css";

const UserEditModal = ({ user, onSave, onCancel, error }) => {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    isManager: user.isManager,
  });

  useEffect(() => {
    setForm({
      name: user.name,
      email: user.email,
      isManager: user.isManager,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...form });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Edit User</h3>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>
            <input
              type="checkbox"
              name="isManager"
              checked={form.isManager}
              onChange={handleChange}
            />
            Admin
          </label>

          <div className={styles.actions}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
