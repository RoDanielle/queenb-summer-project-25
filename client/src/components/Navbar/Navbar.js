import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src="/project-logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.centerNav}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/new" className={styles.navLink}>New Recipe</Link>
      </div>
      <div className={styles.rightNav}></div> {/* optional for spacing */}
    </nav>
  );
};

export default Navbar;
