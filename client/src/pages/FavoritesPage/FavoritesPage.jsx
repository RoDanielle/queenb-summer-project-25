import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import RecipeGridWrapper from "../../components/RecipeGridWrapper/RecipeGridWrapper";

const FavoritesPage = () => {
  const { token, user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();
        setFavorites(Array.isArray(data.user.favorites) ? data.user.favorites : []);
      } catch (err) {
        console.error("Failed to fetch favorites:", err.message);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  return (
    <RecipeGridWrapper
      title="Your Favorite Recipes"
      recipes={favorites}
      loading={loading}
      user={user}    
      full={false}   // always compact
      noMessage="You haven't favorited any recipes yet."
    />
  );
};

export default FavoritesPage;
