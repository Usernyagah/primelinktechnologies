import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};
