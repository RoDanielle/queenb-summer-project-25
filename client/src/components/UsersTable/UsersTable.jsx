import React, { useEffect, useState, useContext } from "react";
import styles from "./UsersTable.module.css";
import { UserContext } from "../../context/UserContext";

const UsersTable = () => {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", isManager: false });

  // Fetch all users
  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Start editing a user
  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      isManager: user.isManager,
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
  };

  // Save changes
  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const data = await res.json();
      setUsers(users.map(u => u._id === id ? data.user : u));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className={styles.tableWrapper}>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Favorites</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                {editingId === user._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="isManager"
                          checked={editForm.isManager}
                          onChange={handleChange}
                        />{" "}
                        Admin
                      </label>
                    </td>
                    <td>{user.favorites ? user.favorites.length : 0}</td>
                    <td>
                      <button
                        className={styles.saveButton}
                        onClick={() => handleSave(user._id)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isManager ? "Admin" : "User"}</td>
                    <td>{user.favorites ? user.favorites.length : 0}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
