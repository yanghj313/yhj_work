import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => (
  <header className="site-header">
    <nav className="nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/projects">Project</Link></li>
        <li><Link to="/skills">Skill</Link></li>
        <li><Link to="/experiences">Experience</Link></li>
        <li><Link to="/galleries">Gallery</Link></li>

        {!user && (
          <>
            <li><Link to="/login">로그인</Link></li>
            <li><Link to="/signup">회원가입</Link></li>
          </>
        )}

        {user?.role?.name === 'Admin' && (
          <li>
            <a
              href="https://yhjwork-production.up.railway.app/admin"
              target="_blank"
              rel="noopener noreferrer"
            >
              🛠 관리자 페이지
            </a>
          </li>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
