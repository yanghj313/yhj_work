import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/page.css';
import SkeletonProject from './SkeletonProject';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const flattenItem = item => {
	if (!item) return null;

	const { id, documentId, attributes } = item;

	if (!attributes) return item;

	const flat = {
		id,
		documentId,
		...attributes,
	};

	Object.keys(flat).forEach(key => {
		const val = flat[key];

		if (val && typeof val === 'object' && val.data !== undefined) {
			if (val.data === null) {
				flat[key] = null;
			} else if (Array.isArray(val.data)) {
				flat[key] = val.data.map(flattenItem);
			} else {
				flat[key] = flattenItem(val.data);
			}
		}
	});

	return flat;
};

const tagStyles = {
	html: { color: '#e34c26', icon: 'fab fa-html5' },
	css: { color: '#2965f1', icon: 'fab fa-css3-alt' },
	js: { color: '#f7df1e', icon: 'fab fa-js' },
	photoshop: { color: '#31a8ff', icon: 'fas fa-image' },
	illustrator: { color: '#ff9a00', icon: 'fas fa-pen-nib' },
	figma: { color: '#a259ff', icon: 'fab fa-figma' },
	react: { color: '#61dafb', icon: 'fab fa-react' },
	node: { color: '#3c873a', icon: 'fab fa-node-js' },
	git: { color: '#f1502f', icon: 'fab fa-git-alt' },
	vue: { color: '#42b883', icon: 'fab fa-vuejs' },
};

const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);

				const res = await axios.get(`${API_BASE}/api/projects?populate=*&pagination[pageSize]=100`);

				const rawProjects = (res.data.data || []).filter(Boolean).map(flattenItem);

				const sortedProjects = [...rawProjects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

				setProjects(sortedProjects);
			} catch (err) {
				console.error('❌ 프로젝트 데이터 오류:', err.response?.data || err.message);
			} finally {
				setTimeout(() => setLoading(false), 500);
			}
		};

		fetchProjects();
	}, []);

	if (loading) return <SkeletonProject />;

	return (
		<div className="board_wrap list">
			<ul>
				{projects.map(p =>
					p?.title ? (
						<li key={p.id} className="project-card">
							<div className="media-container">
								<div className="thumbnail-wrapper">
									{p.thumbnail?.url && (
										<img src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`} alt={p.thumbnail.name || '프로젝트 이미지'} className="thumbnail-img" />
									)}

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
													if (!window.matchMedia('(hover: none)').matches) {
														e.target.play();
													}
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

											<div className="video-icon">🎬</div>
										</>
									)}
								</div>
							</div>

							<strong>
								💡
								<Link to={`/projects/${p.id}`}>{p.title}</Link>
							</strong>

							<br />

							{(p.role || p.add || p.more) && <p>🛠️ {[p.role, p.add, p.more].filter(Boolean).join(' / ')}</p>}

							{p.period && <p>🗓️ {p.period}</p>}

							{p.tags && (
								<p
									style={{
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										gap: '0.4rem',
									}}
								>
									💻
									{p.tags.split(',').map((tag, i) => {
										const key = tag.trim().toLowerCase();

										const style = tagStyles[key] || {
											color: '#aaa',
											icon: 'fas fa-tag',
										};

										return (
											<span
												key={i}
												style={{
													backgroundColor: style.color,
													color: '#fff',
													padding: '2px 6px',
													borderRadius: '4px',
													fontSize: '0.75rem',
													display: 'inline-flex',
													alignItems: 'center',
													gap: '4px',
												}}
											>
												<i className={style.icon}></i>

												{key}
											</span>
										);
									})}
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
