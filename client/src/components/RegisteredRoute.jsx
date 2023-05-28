import { Navigate } from 'react-router-dom';
import { useUserData } from '../context/UserContext';

function RegisteredRoute({ children }) {
  const { userData, userLoading } = useUserData();

  if (userLoading) return <h1>Loading...</h1>;
  if (!userData) return <>{children}</>;
  return <Navigate to="/"/>
}

export default RegisteredRoute;
