import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';

import { useAuth } from '../auth/useAuth';

const PrivateRoute: FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
