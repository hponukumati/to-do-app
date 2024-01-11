import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state with values from local storage
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    userid: localStorage.getItem('userId') || null
  });

  // Update the state when local storage changes (e.g., on page refresh)
  useEffect(() => {
    setAuth({
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username'),
      userid: localStorage.getItem('userId')
    });
  }, []);

  const login = (token, username, userid) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('userId', userid);
    setAuth({ token, username, userid });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setAuth({ token: null, username: null, userid: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
