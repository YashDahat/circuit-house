import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // In a real application, you would decode the token or fetch user profile
      // to get user details. For this exercise, we'll assume a dummy user
      // or that the login function already provides the user object.
      // For now, we'll just set a placeholder user if a token exists.
      // The LoginPage will pass the actual user object on successful login.
      if (!user) {
        // This is a simplified approach. In a real app, you'd verify the token
        // and fetch user details from an API using the token.
        // For the scope of this exercise, we'll assume the user object is
        // always passed during login and not re-derived from local storage.
      }
    }
  }, [user]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};