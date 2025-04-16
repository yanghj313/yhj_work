import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import video01 from '../../public/video/video_01.mp4';
import '../assets/css/page.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectList = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/projects?populate=*`)
			.then(res => {
				console.log('🔥 프로젝트 데이터:', res.data.data);
				setProjects((res.data.data || []).filter(Boolean));
			})
			.catch(err => {
				console.error('❌ 프로젝트 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="board_wrap list">
			<ul>
				{projects.map(p =>
					p?.title ? (
						<li key={p.id} className="project-card">
							<div className="media-container">
								<img src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`} alt={p.thumbnail.name || '프로젝트 이미지'} className="thumbnail-img" />

								<video src={video01} muted loop playsInline autoPlay className="hover-video" />
							</div>

							<strong>
								<Link to={`/projects/${p.documentId}`}>{p.title}</Link>
							</strong>
							<br />

							{p.role && <p>👤 역할: {p.role}</p>}
							{p.period && <p>🗓️ 작업 기간: {p.period}</p>}

							{p.tags && (
								<ul style={{ paddingLeft: '1rem' }}>
									{p.tags.split(',').map((tag, index) => {
										const trimmedTag = tag.trim();
										return <li key={index}>{trimmedTag}</li>;
									})}
								</ul>
							)}
						</li>
					) : null
				)}
			</ul>
		</div>
	);
};

export default ProjectList;
