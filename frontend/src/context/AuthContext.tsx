import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthRequest, AuthResponse } from '@/types/auth';
import { login as authServiceLogin } from '@/services/authService';

interface User {
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: AuthRequest) => Promise<void>;
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
      // In a real app, you'd decode the token to get user info or validate it
      // For this exercise, we'll just assume a valid token means an admin user
      setUser({ username: 'admin', roles: ['admin'] });
    }
  }, []);

  const login = async (credentials: AuthRequest) => {
    try {
      const response: AuthResponse = await authServiceLogin(credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        // Assuming a successful login implies an admin user for this context
        setUser({ username: credentials.username ?? 'admin', roles: ['admin'] });
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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