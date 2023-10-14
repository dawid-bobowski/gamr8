import React from 'react';
import { Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar style={{ backgroundColor: '#191825' }}>
      <Navbar.Brand href="#home" style={{ color: '#865DFF' }}>
        GAMR8
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="#home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#browse">Browse Games</a>
          </li>
          {/* ... Add other nav links as needed */}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;