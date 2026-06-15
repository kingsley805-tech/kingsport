import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate('/admin');
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error('Enter your email first.');
      return;
    }

    setResetting(true);
    const { error } = await resetPassword(email);
    setResetting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Password reset email sent. Check your inbox.');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="glass-card rounded-xl p-8 w-full max-w-md">
        <h1 className="font-display text-2xl font-bold mb-2 text-center">Admin Login</h1>
        <p className="text-muted-foreground text-sm text-center mb-8">Sign in to manage your portfolio</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-secondary/50 border-border"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-secondary/50 border-border"
          />
          <Button type="submit" disabled={loading} className="w-full gradient-amber text-primary-foreground font-semibold">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={resetting}
            onClick={handleResetPassword}
            className="w-full text-muted-foreground"
          >
            {resetting ? 'Sending reset link...' : 'Forgot password?'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
