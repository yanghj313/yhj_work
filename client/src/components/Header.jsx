import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => (
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
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Join</Link>
						</li>
					</>
				) : (
					<>
						{/* 사용자 닉네임 표시 */}
						<li>
							<span>{user.username}님</span>
						</li>

						{/* 최고 관리자용 설정 버튼 */}
						{user.email?.toLowerCase() === 'lawork313@gmail.com' && (
							<li>
								<a href="https://yhjwork-production.up.railway.app/admin" target="_blank" rel="noopener noreferrer">
									⚙ Settings
								</a>
							</li>
						)}

						{/* 로그아웃 링크 */}
						<li>
							<a
								href="/"
								onClick={() => {
									localStorage.removeItem('token');
									localStorage.removeItem('user');
									window.location.reload();
								}}
							>
								Logout
							</a>
						</li>
					</>
				)}
			</ul>
		</nav>
	</header>
);

export default Header;
