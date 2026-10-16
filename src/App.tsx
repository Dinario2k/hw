import { useAuth } from '@/hooks/useAuth';
import Home from '@/pages/Home';
import Login from '@/pages/Login';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Загрузка...
      </div>
    );
  }

  return user ? <Home /> : <Login />;
}