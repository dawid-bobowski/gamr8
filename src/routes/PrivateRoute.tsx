import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/useAuth';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return <Outlet />;
}

export default PrivateRoute;