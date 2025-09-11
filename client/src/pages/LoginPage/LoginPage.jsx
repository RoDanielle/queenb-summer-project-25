import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { UserContext } from "../../context/UserContext"; // import context

const LoginPage = () => {
  const { login } = useContext(UserContext); // use login from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // ✅ Update context and localStorage at the same time
      login(data.user, data.token);

      navigate("/"); // redirect to homepage
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
