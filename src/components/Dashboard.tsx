import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Dummy check for authentication. Replace with your actual logic.
  const isAuthenticated = true; // Change this value to test redirects
  
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div>
      {/* Dashboard content here */}
      Welcome to the Dashboard!
    </div>
  );
}

export default Dashboard;