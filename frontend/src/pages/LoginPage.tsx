import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthRequest } from '@/types/auth';
import { login as authServiceLogin } from '@/services/authService';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/routes';
import { toast } from 'sonner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credentials: AuthRequest = { username, password };
      const response = await authServiceLogin(credentials);
      if (response.token) {
        // Assuming the backend returns a user object along with the token
        // For now, we'll just use a placeholder user object
        login(response.token, { id: 'admin', email: username, role: 'ADMIN', name: 'Admin User' });
        toast.success('Login successful!');
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        toast.error('Login failed: No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
        <div className="max-w-md w-full">
          <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
            <CardHeader className="text-center mb-6">
              <CardTitle className="text-3xl font-semibold text-[#2D3748]">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-[#D69E2E] focus:ring focus:ring-[#D69E2E] focus:ring-opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#D69E2E] hover:bg-[#B78726] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;