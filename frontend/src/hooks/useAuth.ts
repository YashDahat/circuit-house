import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { login as authServiceLogin } from '@/services/authService';
import { AuthRequest } from '@/types/auth';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  const { isAuthenticated, login: contextLogin, logout: contextLogout } = context;

  const login = async (credentials: AuthRequest) => {
    try {
      const response = await authServiceLogin(credentials);
      if (response.token) {
        contextLogin(response.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    contextLogout();
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};