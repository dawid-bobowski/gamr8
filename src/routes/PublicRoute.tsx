import { useNavigate } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';

import { useAuth } from '../auth/useAuth';

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return <>{children}</>;
};

export default PublicRoute;
