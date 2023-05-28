import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserContext';

function RegisteredRoute({ children }) {
  const { userData, loadingUser } = useUserData();

  if (loadingUser) return <h1>Loading...</h1>;
  if (!userData) return <>{children}</>;
  return <Navigate to="/"/>
}

export default RegisteredRoute;
