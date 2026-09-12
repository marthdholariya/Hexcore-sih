import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedSession = localStorage.getItem("maha_user_session");
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        localStorage.removeItem("maha_user_session");
      }
    }
    setLoading(false);
  }, []);

  const login = (sessionData) => {
    setUser(sessionData);
    localStorage.setItem("maha_user_session", JSON.stringify(sessionData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("maha_user_session"); // Clears saved session
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}