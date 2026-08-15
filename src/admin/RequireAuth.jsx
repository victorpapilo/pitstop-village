import { Navigate } from 'react-router-dom';
import { auth } from '../lib/api';

export default function RequireAuth({ children }) {
  if (!auth.isLoggedIn()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
