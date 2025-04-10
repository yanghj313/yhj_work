import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="site-header">
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Project</Link>
        </li>
        <li>
          <Link to="/skills">Skill</Link>
        </li>
        <li>
          <Link to="/experiences">Experience</Link>
        </li>
        <li>
          <Link to="/galleries">Gallery</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
