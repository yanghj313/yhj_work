// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import SkillList from './components/SkillList';
import SkillDetail from './components/SkillDetail';
import ExperienceList from './components/ExperienceList';
import ExperienceDetail from './components/ExperienceDetail';
import GalleryList from './components/GalleryList';
import GalleryDetail from './components/GalleryDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import FullpageHome from './components/FullpageHome';

import './components/fullpage-style-full.scss'; // 👉 Fullpage 스타일 여기서 불러옴
import './index.css'; // 공통 스타일

const root = ReactDOM.createRoot(document.getElementById('root'));

const MainApp = () => {
	const [user, setUser] = React.useState(() => {
		const stored = localStorage.getItem('user');
		return stored ? JSON.parse(stored) : null;
	});

	return (
		<BrowserRouter>
			<Header user={user} />
			<Routes>
				<Route path="/" element={<FullpageHome />} />
				<Route path="/projects" element={<ProjectList />} />
				<Route path="/projects/:id" element={<ProjectDetail />} />
				<Route path="/skills" element={<SkillList />} />
				<Route path="/skills/:id" element={<SkillDetail />} />
				<Route path="/experiences" element={<ExperienceList />} />
				<Route path="/experiences/:id" element={<ExperienceDetail />} />
				<Route path="/galleries" element={<GalleryList />} />
				<Route path="/gallery/:id" element={<GalleryDetail />} />
				<Route path="/login" element={<Login onLogin={setUser} />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>
	);
};

root.render(
	<React.StrictMode>
		<MainApp />
	</React.StrictMode>
);
