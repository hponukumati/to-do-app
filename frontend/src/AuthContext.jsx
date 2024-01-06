// AuthContext.js

import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    username: null
  });

  // Save token and username on login
  const login = (token, username) => {
    localStorage.setItem('token', token); // Store token in local storage
    setAuth({ token, username });
  };

  // Clear token and username on logout
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setAuth({ token: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
