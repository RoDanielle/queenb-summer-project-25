import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Navbar.module.css";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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
        <img src="/navbarlogo4.png" alt="Logo" className={styles.logo} />
      </Link>

      {/* Center nav */}
      <div className={styles.centerNav}>
        {user && (
          <>
            <Button to="/new" variant="primary">
              New Recipe
            </Button>
            <Button to="/favorites" variant="primary">
              ❤️ Favorites
            </Button>
          </>
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
