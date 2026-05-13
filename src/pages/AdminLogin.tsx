import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Mail, Key } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!auth) {
      toast.error('Firebase is not configured. Please set your environment variables.');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in');
      navigate('/admin');
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-2xl border border-border shadow-xl">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage products and services.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Admin Email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-medium bg-accent hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
