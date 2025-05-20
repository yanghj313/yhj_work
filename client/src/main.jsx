import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import SubHeader from './components/SubHeader';

import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import ExperienceList from './components/ExperienceList';
import ExperienceDetail from './components/ExperienceDetail';
import GalleryList from './components/GalleryList';
import GalleryDetail from './components/GalleryDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import FullpageHome from './components/FullpageHome';
import SearchResult from './components/SearchResult';

import './index.css';
import './assets/css/font.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppLayout = ({ user, setUser }) => {
	const location = useLocation();

	const subHeaderMap = [
		{
			match: path => path.startsWith('/projects'),
			title: 'Projects Introduction',
			backgroundImage: '/img/main_img/onsen_bg.jpg',
		},
		{
			match: path => path.startsWith('/experiences'),
			title: 'Experience Introduction',
			backgroundImage: '/img/main_img/exp_bg.jpg',
		},
		{
			match: path => path.startsWith('/galleries'),
			title: 'Artwork Gallery',
			backgroundImage: '/img/main_img/gallery_bg.jpg',
		},
	];

	const subHeaderInfo = subHeaderMap.find(entry => entry.match(location.pathname));

	return (
		<>
			{location.pathname === '/' ? <Header user={user} /> : subHeaderInfo ? <SubHeader title={subHeaderInfo.title} backgroundImage={subHeaderInfo.backgroundImage} /> : <Header user={user} />}

			<Routes>
				<Route path="/" element={<FullpageHome />} />
				<Route path="/projects" element={<ProjectList />} />
				<Route path="/projects/:id" element={<ProjectDetail />} />
				<Route path="/experiences" element={<ExperienceList />} />
				<Route path="/experiences/:id" element={<ExperienceDetail />} />
				<Route path="/galleries" element={<GalleryList />} />
				<Route path="/gallery/:id" element={<GalleryDetail />} />
				<Route path="/login" element={<Login onLogin={setUser} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/search" element={<SearchResult />} />
			</Routes>
		</>
	);
};

const MainApp = () => {
	const [user, setUser] = React.useState(() => {
		const stored = localStorage.getItem('user');
		return stored ? JSON.parse(stored) : null;
	});

	return (
		<BrowserRouter>
			<AppLayout user={user} setUser={setUser} />
		</BrowserRouter>
	);
};

root.render(
	<React.StrictMode>
		<MainApp />
	</React.StrictMode>
);
