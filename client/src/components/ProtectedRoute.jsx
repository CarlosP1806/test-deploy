import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { userData, loadingUser } = useUserData();

  if (loadingUser) return <h1>Loading...</h1>;
  if (!userData) return <Navigate to={"/login"}/>;

  return <>{children}</>
}

export default ProtectedRoute;
