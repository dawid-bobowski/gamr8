import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../auth/useAuth';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          GAMR8
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbarNav'
        >
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
              >
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
              >
                About
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                href='#'
              >
                Features
              </a>
            </li>
          </ul>
          <div className="d-flex">
            {!currentUser ? (
              <>
                <button className="btn btn-success me-2" onClick={handleLoginClick}>
                  Login
                </button>
                <button className="btn btn-primary">Register</button>
              </>
            ) : (
              <button className="btn btn-success me-2" onClick={handleLogoutClick}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
