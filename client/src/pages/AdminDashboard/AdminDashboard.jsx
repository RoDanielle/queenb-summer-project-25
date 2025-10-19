import React, { useState } from "react";
import styles from "./AdminDashboard.module.css";
import UsersTable from "../../components/UsersTable/UsersTable";
import RecipesTable from "../../components/RecipesTable/RecipesTable";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>

      {/* Tab buttons */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "users" ? styles.active : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={activeTab === "recipes" ? styles.active : ""}
          onClick={() => setActiveTab("recipes")}
        >
          Recipes
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "users" && <UsersTable />}
        {activeTab === "recipes" && <RecipesTable />}
      </div>
    </div>
  );
};

export default AdminDashboard;
