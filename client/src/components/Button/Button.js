import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

const Button = ({ to, onClick, children, variant = "primary", type = "button" }) => {
  // If `to` is provided → render a react-router <Link>
  if (to) {
    return (
      <Link to={to} className={`${styles.button} ${styles[variant]}`}>
        {children}
      </Link>
    );
  }

  // Otherwise → render a normal <button>
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
