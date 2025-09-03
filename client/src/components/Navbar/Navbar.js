import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // scroll down → hide
      setShow(false);
    } else {
      // scroll up → show
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={styles.navbar}
      style={{ top: show ? "0" : "-100px" }} // moves navbar out of view
    >
      <img src="/project-logo.png" alt="Logo" className={styles.logo} />
      <div className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/new" className={styles.navLink}>New Recipe</Link>
      </div>
    </nav>
  );
};

export default Navbar;
