import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleSearch = e => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
		}
	};

	return (
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
							<input type="search" name="search" required placeholder="검색어 입력" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
							<button className="search-btn" type="submit">
								<span>Search</span>
							</button>
						</form>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
