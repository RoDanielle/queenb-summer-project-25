import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <img src="/project-logo.png" alt="Logo" className={styles.logo} />
      </Link>

      <div className={styles.centerNav}>
        {user && (
          <Link to="/new" className={styles.navLink}>
            New Recipe
          </Link>
        )}
      </div>

      <div className={styles.rightNav}>
        {!user ? (
          <>
            <Link to="/login" className={styles.navButton}>Login</Link>
            <Link to="/register" className={styles.navButton}>Register</Link>
          </>
        ) : (
          <div className={styles.userContainer}>
            <span className={styles.navUser}>Hello, {user.name}</span>
            <button onClick={handleLogout} className={styles.navButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
