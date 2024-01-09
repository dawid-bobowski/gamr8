import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Recommendations from '../components/Recommendations';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../auth/useAuth';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <SearchBar />
      <Recommendations />
      {/* Other components like GameReviewSection... */}
    </div>
  );
};

export default Dashboard;
