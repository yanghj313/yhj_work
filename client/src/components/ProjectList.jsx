import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		import('../assets/css/page.css');
		const fetchProjects = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE}/api/projects?populate=*`);
				console.log('🔥 프로젝트 데이터:', res.data.data);
				setProjects((res.data.data || []).filter(Boolean));
			} catch (err) {
				console.error('❌ 프로젝트 데이터 오류:', err.message);
			} finally {
				setTimeout(() => setLoading(false), 500);
			}
		};

		fetchProjects();
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<p>Loading</p>
				<div className="spinner" />
			</div>
		);
	}

	return (
		<div className="board_wrap list">
			<ul>
				{projects.map(p =>
					p?.title ? (
						<li key={p.id} className="project-card">
							<div className="media-container">
								<div className="thumbnail-wrapper">
									<img src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`} alt={p.thumbnail.name || '프로젝트 이미지'} className="thumbnail-img" />

									{p.video?.url && (
										<>
											<video
												src={p.video.url.startsWith('http') ? p.video.url : `${API_BASE}${p.video.url}`}
												muted
												loop
												playsInline
												className="hover-video"
												preload="metadata"
												onMouseOver={e => {
													if (!window.matchMedia('(hover: none)').matches) e.target.play();
												}}
												onMouseOut={e => {
													if (!window.matchMedia('(hover: none)').matches) {
														e.target.pause();
														e.target.currentTime = 0;
													}
												}}
												onClick={e => {
													if (window.matchMedia('(hover: none)').matches) {
														const video = e.target;
														if (video.paused) {
															video.play();
														} else {
															video.pause();
															video.currentTime = 0;
														}
													}
												}}
											/>
											<div className="video-icon">🎬</div> {/* 👈 여기 추가 */}
										</>
									)}
								</div>
							</div>

							<strong>
								💡
								<Link to={`/projects/${p.documentId}`}>{p.title}</Link>
							</strong>
							<br />

							{p.role && <p>🛠️ {p.role}</p>}
							{p.period && <p>🗓️ {p.period}</p>}

							{p.tags && (
								<p style={{ display: 'inline-block' }}>
									💻
									<ul>
										{p.tags.split(',').map((tag, index) => {
											const trimmedTag = tag.trim();
											return <li key={index}>{trimmedTag}</li>;
										})}
									</ul>
								</p>
							)}
						</li>
					) : null
				)}
			</ul>
		</div>
	);
};

export default ProjectList;
