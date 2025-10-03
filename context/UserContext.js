"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeJwt } from "jose";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = decodeJwt(token);
        setIsLoggedIn(true);
        setRole(decoded.role);
        setUser(decoded);
        console.log("Decoded JWT on mount:", decoded);
      } catch (err) {
        console.error("Invalid token:", err);
        setIsLoggedIn(false);
        setRole(null);
        setUser(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = decodeJwt(token);
    setIsLoggedIn(true);
    setRole(decoded.role);
    setUser(decoded);
    console.log("Decoded JWT on login:", decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // or localStorage.clear()
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
