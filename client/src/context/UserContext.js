import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return {
        ...parsedUser,
        favorites: Array.isArray(parsedUser.favorites) ? parsedUser.favorites : [],
      };
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const login = (newUser, newToken) => {
    setUser({
      ...newUser,
      favorites: Array.isArray(newUser.favorites) ? newUser.favorites : [],
    });
    setToken(newToken);

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
