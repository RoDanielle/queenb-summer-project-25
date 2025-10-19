import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/HomePage/HomePage";
import NewRecipe from "./pages/NewRecipe/NewRecipe"; 
import RecipePage from './pages/RecipePage/RecipePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
// routes
import AuthRoute from "./routes/AuthRoute";
import AdminRoute from "./routes/AdminRoute";
// styles
import styles from "./styles/App.module.css";

function App() {
  // User state for logged-in user
  const [user, setUser] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar user={user} setUser={setUser} />
        <main className={styles.main}>
          <Routes>
  <Route path="/" element={<Home user={user} setUser={setUser} />} />
  <Route path="/new" element={
    <AuthRoute>
      <NewRecipe />
    </AuthRoute>
  } />
  <Route path="/recipes/:id" element={<RecipePage />} />
  <Route path="/login" element={<LoginPage setUser={setUser} />} />
  <Route path="/register" element={<RegisterPage setUser={setUser} />} />
  <Route path="/favorites" element={
    <AuthRoute>
      <FavoritesPage />
    </AuthRoute>
  } />
  <Route path="/admin" element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  } />
</Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2025 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
