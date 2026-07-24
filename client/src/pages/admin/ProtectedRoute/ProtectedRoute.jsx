import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Spinner from '../../../components/ui/Spinner';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <Spinner label="Checking session..." />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
