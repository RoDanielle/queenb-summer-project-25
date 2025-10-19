import React, { useState } from "react";
import RecipesTable from "../../components/RecipesTable/RecipesTable";
import UsersTable from "../../components/UsersTable/UsersTable";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes");

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "recipes" ? styles.active : ""}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </button>
        <button
          className={activeTab === "users" ? styles.active : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <div className={styles.tabContent}>
        {activeTab === "recipes" && <RecipesTable />}
        {activeTab === "users" && <UsersTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;