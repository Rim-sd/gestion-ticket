import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (isAuthenticated && userRole && userName && userEmail) {
      setUser({
        role: userRole,
        name: userName,
        email: userEmail,
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, isAdmin = false) => {
    try {
      // Here you would typically make an API call to your backend
      // For demo purposes, we'll use hardcoded credentials
      if (isAdmin) {
        if (email === 'admin@example.com' && password === 'admin123') {
          const userData = {
            role: 'admin',
            name: 'Admin User',
            email: email,
          };
          setUser(userData);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userEmail', userData.email);
          return { success: true };
        }
      } else {
        // Regular user login logic
        if (email === 'user@example.com' && password === 'user123') {
          const userData = {
            role: 'user',
            name: 'Regular User',
            email: email,
          };
          setUser(userData);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userEmail', userData.email);
          return { success: true };
        }
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 