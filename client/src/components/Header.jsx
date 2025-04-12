import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ user, onLogout }) => (
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

        {!user ? (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        ) : (
          <>
            {/* 사용자 닉네임 표시 */}
            <li>
              <span>{user.username}님</span>
            </li>

            {user?.email === "lawork@gmail.com" && (
              <li>
                <a
                  href="https://yhjwork-production.up.railway.app/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ⚙ 설정
                </a>
              </li>
            )}

            <li>
              <button
                onClick={onLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  </header>
);

export default Header;
