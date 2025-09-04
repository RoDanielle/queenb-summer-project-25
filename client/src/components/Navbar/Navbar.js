import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <Link to="/">
          <img src="/project-logo.png" alt="Logo" className={styles.logo} />
        </Link>      <div className={styles.centerNav}>
        <Link to="/new" className={styles.navLink}>New Recipe</Link>
      </div>
      <div className={styles.rightNav}></div> {/* optional for spacing */}
    </nav>
  );
};

export default Navbar;
