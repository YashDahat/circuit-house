import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';
import { Label } from '@radix-ui/react-label'; // Using Radix Label as shadcn does not provide it
import { Input } from '@radix-ui/react-input'; // Using Radix Input as shadcn does not provide it

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#2D3748]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <span className="font-medium text-[#D69E2E]">Circuit House Admin</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="username" className="sr-only">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#D69E2E] focus:border-[#D69E2E] focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#D69E2E] focus:border-[#D69E2E] focus:z-10 sm:text-sm transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-full text-white bg-[#D69E2E] hover:bg-[#B78826] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D69E2E] transition-all duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;