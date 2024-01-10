import { FC, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import { useAuth } from '../auth/useAuth';
import Logo from '/gamr8-white.png';
import { DEFAULT_AVATAR_URL } from '../common/constants';

type BootstrapWindow = {
  bootstrap: {
    Collapse: new (element: HTMLElement, options?: { toggle: boolean }) => BootstrapCollapse;
  };
} & typeof window;

interface BootstrapCollapse {
  hide: () => void;
}

const Header: FC = () => {
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

  const handleProfilePicClick = () => {
    toggleMobileMenu();
    navigate('/profile');
  }

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
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <Image src={Logo} height={32} />
          </Link>
          <button ref={toggleButtonRef} className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div ref={navbarMenuRef} className='collapse navbar-collapse justify-content-end' id='navbarNav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/dashboard' onClick={toggleMobileMenu}>Dashboard</Link>
              </li>
            </ul>
            {currentUser && (
              <button type='button' className='me-2 p-0 rounded-circle' onClick={handleProfilePicClick}>
                <Image roundedCircle src={currentUser.avatarUrl ?? DEFAULT_AVATAR_URL} width={38} height={38} />
              </button>
            )}
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
    </header>
  );
};

export default Header;
