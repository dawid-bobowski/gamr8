import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';

import { useAuth } from '../auth/useAuth';

const PublicRoute: FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return <Outlet />;
};

export default PublicRoute;
