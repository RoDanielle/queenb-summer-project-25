import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
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
      {/* Logo */}
      <Link to="/">
        <img src="/project-logo.png" alt="Logo" className={styles.logo} />
      </Link>

      {/* Center nav */}
      <div className={styles.centerNav}>
        {user && (
          <Button to="/new" variant="primary">
            New Recipe
          </Button>
        )}
      </div>

      {/* Right nav */}
      <div className={styles.rightNav}>
        {!user ? (
          <>
            <Button to="/login" variant="primary">
              Login
            </Button>
            <Button to="/register" variant="secondary">
              Register
            </Button>
          </>
        ) : (
          <div className={styles.userContainer}>
            <span className={styles.navUser}>Hello, {user.name}</span>
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
