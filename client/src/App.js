import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages & components
import Home from "./pages/HomePage/HomePage";
import NewRecipe from "./pages/NewRecipe/NewRecipe"; 
import RecipePage from './pages/RecipePage/RecipePage';
import Navbar from "./components/Navbar/Navbar";
// styles
import styles from "./styles/App.module.css";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewRecipe />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
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
