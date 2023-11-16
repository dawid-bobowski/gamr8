import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import { useAuth } from '../auth/useAuth';
import { Image } from 'react-bootstrap';
import DefaultProfilePic from '../assets/default-user.png';

type BootstrapWindow = {
  bootstrap: {
    Collapse: new (element: HTMLElement, options?: { toggle: boolean }) => BootstrapCollapse;
  };
} & typeof window;

interface BootstrapCollapse {
  hide: () => void;
}

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const navbarMenuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const handleLoginClick = () => {
    toggleMobileMenu();
    navigate('/login');
  };

  const handleLogoutClick = () => {
    toggleMobileMenu();
    logout();
    navigate('/');
  };

  const handleRegisterClick = () => {
    toggleMobileMenu();
    navigate('/register');
  };

  const toggleMobileMenu = () => {
    const bsWindow = window as unknown as BootstrapWindow;
    const bsCollapse = new bsWindow.bootstrap.Collapse(navbarMenuRef.current!, {
      toggle: false
    });
    bsCollapse.hide();
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarMenuRef.current && !navbarMenuRef.current.contains(event.target as Node) &&
        toggleButtonRef.current && !toggleButtonRef.current.contains(event.target as Node)) {
      const bsWindow = window as unknown as BootstrapWindow;
      const bsCollapse = new bsWindow.bootstrap.Collapse(navbarMenuRef.current, {
        toggle: false
      });
      bsCollapse.hide();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          GAMR8
        </Link>
        <button ref={toggleButtonRef} className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div ref={navbarMenuRef} className='collapse navbar-collapse justify-content-end' id='navbarNav'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Home</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>About</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Features</a>
            </li>
          </ul>
          <button type='button' className='me-2 p-0 rounded-circle'>
            <Image roundedCircle src={DefaultProfilePic} width={38} height={38} />
          </button>
          <div className='buttons d-flex justify-content-center p-2 mt-4 p-lg-0 mt-lg-0'>
            {!currentUser ? (
              <>
                <button className='btn btn-success me-2' onClick={handleLoginClick}>
                  Login
                </button>
                <button className='btn btn-primary' onClick={handleRegisterClick}>
                  Register
                </button>
              </>
            ) : (
              <button className='btn btn-success me-2' onClick={handleLogoutClick}>
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
