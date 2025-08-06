import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Header.css';

const Header = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navRef = useRef();
	const navigate = useNavigate();
	const location = useLocation();

	const handleSearch = e => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
		}
		setIsMenuOpen(false);
	};

	const handleNavClick = () => {
		setIsMenuOpen(false);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleLogoClick = e => {
		e.preventDefault();
		setIsMenuOpen(false);
		if (location.pathname === '/') {
			// 현재가 홈이면 강제로 새로고침 느낌의 리렌더
			navigate('/', { replace: true });
		} else {
			navigate('/');
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		const handleClickOutside = e => {
			if (isMenuOpen && navRef.current && !navRef.current.contains(e.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsMenuOpen(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<header className="site-header">
			<a href="/" className="logo" onClick={handleLogoClick}>
				<img src="/img/bunny.svg" alt="로고" className="logo-img" />
			</a>

			<nav className="nav" ref={navRef}>
				<ul className="nav-links">
					<li>
						<NavLink to="/" onClick={handleNavClick}>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/projects"
							onClick={handleNavClick}
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#fff',
							})}
						>
							Project
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/experiences"
							onClick={handleNavClick}
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#fff',
							})}
						>
							Experience
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/galleries"
							onClick={handleNavClick}
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
								color: isActive ? '#ff5722' : '#fff',
							})}
						>
							Gallery
						</NavLink>
					</li>

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
				</ul>

				<button className="hamburger" onClick={() => setIsMenuOpen(true)} aria-label="메뉴 열기">
					<div className="hamburger_mark">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>

				<div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
					<button className="close-btn" onClick={() => setIsMenuOpen(false)}>
						<span className="close-icon"></span>
					</button>
					<ul className="mobile-menu-links">
						<li>
							<Link to="/" onClick={handleLogoClick}>
								Home
							</Link>
						</li>
						<li>
							<NavLink
								to="/projects"
								onClick={() => setIsMenuOpen(false)}
								style={({ isActive }) => ({
									fontWeight: isActive ? 'bold' : 'normal',
									color: isActive ? '#ff5722' : '#fff',
								})}
							>
								Project
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/experiences"
								onClick={() => setIsMenuOpen(false)}
								style={({ isActive }) => ({
									fontWeight: isActive ? 'bold' : 'normal',
									color: isActive ? '#ff5722' : '#fff',
								})}
							>
								Experience
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/galleries"
								onClick={() => setIsMenuOpen(false)}
								style={({ isActive }) => ({
									fontWeight: isActive ? 'bold' : 'normal',
									color: isActive ? '#ff5722' : '#fff',
								})}
							>
								Gallery
							</NavLink>
						</li>

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
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Header;
