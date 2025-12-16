import { createContext, useContext, useState, useEffect } from 'react';
import { USERS, loginSimulation } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Ambil data dari local storage saat refresh
    const savedUser = localStorage.getItem('erp_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await loginSimulation(username, password);
      setUser(loggedInUser);
      localStorage.setItem('erp_user', JSON.stringify(loggedInUser));
      return loggedInUser;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('erp_user');
    // Opsional: Redirect manual jika perlu
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);