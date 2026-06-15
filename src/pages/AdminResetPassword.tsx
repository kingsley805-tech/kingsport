import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isRecoverySession = useMemo(() => {
    const hash = window.location.hash;
    return hash.includes('type=recovery');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error('Use at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Password updated. You can sign in now.');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="glass-card rounded-xl p-8 w-full max-w-md">
        <h1 className="font-display text-2xl font-bold mb-2 text-center">Reset Password</h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          {isRecoverySession ? 'Enter a new password for your admin account.' : 'Open this page from the password reset email.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-secondary/50 border-border"
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-secondary/50 border-border"
          />
          <Button type="submit" disabled={loading || !isRecoverySession} className="w-full gradient-amber text-primary-foreground font-semibold">
            {loading ? 'Updating password...' : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;