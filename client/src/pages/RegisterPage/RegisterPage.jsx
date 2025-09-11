import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { UserContext } from "../../context/UserContext"; // import context

const RegisterPage = () => {
  const { login } = useContext(UserContext); // use login from context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Update context and localStorage
      login(data.user, data.token);

      navigate("/"); // redirect to homepage
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
