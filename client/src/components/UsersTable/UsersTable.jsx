import React, { useEffect, useState, useContext } from "react";
import styles from "./UsersTable.module.css";
import { UserContext } from "../../context/UserContext";
import UserEditModal from "../UserEditModal/UserEditModal"; // 👈 we'll use the popup modal

const UsersTable = () => {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // store user being edited
  const [error, setError] = useState(""); // 👈 error state for email already in use

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

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setError(""); // clear any previous errors
  };

  // Save user changes
  const handleSave = async (updatedUser) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${updatedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update user"); // 👈 show backend message
        return;
      }

      setUsers((prev) =>
        prev.map((u) => (u._id === updatedUser._id ? data.user : u))
      );

      setEditingUser(null); // close modal
    } catch (err) {
      console.error(err);
      setError("Something went wrong while saving changes.");
    }
  };

  // Close modal
  const handleCancel = () => {
    setEditingUser(null);
    setError("");
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
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingUser && (
        <UserEditModal
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancel}
          error={error} // 👈 pass error message into modal
        />
      )}
    </div>
  );
};

export default UsersTable;
