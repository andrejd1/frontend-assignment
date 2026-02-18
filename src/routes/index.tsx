import {createFileRoute, Navigate} from '@tanstack/react-router';
import {Welcome} from '../pages/Welcome';
import {useAuth} from '../context/AuthContext';

function HomeComponent() {
  const {isAuthenticated, isLoading} = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Welcome />;
}

export const Route = createFileRoute('/')({
  component: HomeComponent,
});
