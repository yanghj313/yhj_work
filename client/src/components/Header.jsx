import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/Header.css';

const Header = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const handleSearch = e => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
		}
	};

	return (
		<header className="site-header">
			<nav className="nav">
				<ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
					<li>
						<NavLink
							to="/"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#000',
							})}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/projects"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#000',
							})}
						>
							Project
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/experiences"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#000',
							})}
						>
							Experience
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/galleries"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#000',
							})}
						>
							Gallery
						</NavLink>
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
							<li>
								<span>{user.username}님</span>
							</li>
							{user.email?.toLowerCase() === 'lawork313@gmail.com' && (
								<li>
									<a href="https://yhjwork-production.up.railway.app/admin" target="_blank" rel="noopener noreferrer">
										⚙ Settings
									</a>
								</li>
							)}
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
					<li>
						<form className="search-bar" onSubmit={handleSearch}>
							{searchTerm && (
								<button type="button" className="clear-btn" onClick={() => setSearchTerm('')} aria-label="검색어 지우기">
									<i className="fa-solid fa-xmark" aria-hidden="true"></i>
								</button>
							)}

							<input type="search" name="q" required placeholder="검색어 입력" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
							<button className="search-btn" type="submit">
								<i className="fas fa-search" aria-hidden="true"></i>
							</button>
						</form>
					</li>
					<button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<i className="fas fa-bars"></i>
					</button>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
