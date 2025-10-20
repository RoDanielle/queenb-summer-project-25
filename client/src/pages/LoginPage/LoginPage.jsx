import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { UserContext } from "../../context/UserContext";

const LoginPage = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // error message for invalid credentials
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error on submit

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed"); // inline error
        return;
      }

      // ✅ Login successful
      login(data.user, data.token);
      navigate("/"); // redirect to homepage
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        {/* Inline error message */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
