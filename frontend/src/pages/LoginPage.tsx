import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Label } from '@radix-ui/react-label';
import Layout from '@/components/Layout';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = await login({ username, password });
    if (!success) {
      setError('Invalid username or password');
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-[#F7FAFC] text-[#2D3748]">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D69E2E]"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D69E2E]"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-[#D69E2E] hover:bg-[#B7872A] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            >
              Login
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;