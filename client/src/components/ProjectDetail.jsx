import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/project_details.css';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const flattenItem = (item) => {
	if (!item) return null;
	const { id, documentId, attributes } = item;
	if (!attributes) return item;
	const flat = { id, documentId, ...attributes };
	Object.keys(flat).forEach(key => {
		const val = flat[key];
		if (val && typeof val === 'object' && val.data !== undefined) {
			if (val.data === null) flat[key] = null;
			else if (Array.isArray(val.data)) flat[key] = val.data.map(flattenItem);
			else flat[key] = flattenItem(val.data);
		}
	});
	return flat;
};

const tagStyles = {
	html: { color: '#e34c26', icon: 'fab fa-html5' },
	css: { color: '#2965f1', icon: 'fab fa-css3-alt' },
	js: { color: '#f7df1e', icon: 'fab fa-js-square' },
	photoshop: { color: '#31a8ff', icon: 'fas fa-image' },
	illustrator: { color: '#ff9a00', icon: 'fas fa-pen-nib' },
	figma: { color: '#a259ff', icon: 'fab fa-figma' },
	react: { color: '#61dafb', icon: 'fab fa-react' },
};

const ProjectDetail = () => {
	const { id } = useParams();
	const [projects, setProjects] = useState([]);
	const [popupImage, setPopupImage] = useState(null);

	useEffect(() => {
		if (id) {
			axios
				.get(`${API_BASE}/api/projects?filters[documentId][$eq]=${id}&populate=*`)
				.then(res => {
					const data = res.data.data;
					if (Array.isArray(data) && data.length > 0) {
						setProjects(data.map(flattenItem));
					} else {
						setProjects([]);
					}
				})
				.catch(err => {
					console.error('❌ 프로젝트 상세 오류:', err.message);
				});
		}
	}, [id]);

	useEffect(() => {
		const handleKeyDown = e => { if (e.key === 'Escape') setPopupImage(null); };
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className="project_details">
			{projects.map(p =>
				p?.title ? (
					<div key={p.id}>
						<h2 className="project_title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{p.title}</h2>
						{p.role && <p className="bullet">역할: {p.role}</p>}
						{p.contribution && <p className="bullet">기여도: {p.contribution}</p>}
						{p.period && <p className="bullet">작업 기간: {p.period}</p>}
						{p.color && (
							<p className="bullet" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
								색상:
								{p.color.split(',').map((c, i) => (
									<span key={i} title={i === 0 ? '주조색' : '보조색'} style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: c.trim(), border: '1px solid #ccc' }}></span>
								))}
							</p>
						)}
						{p.tags && (
							<p className="bullet" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
								태그:
								{p.tags.split(',').map((tagRaw, i) => {
									const tag = tagRaw.trim().toLowerCase();
									const tagData = tagStyles[tag] || { color: '#888', icon: 'fas fa-tag' };
									return (
										<span key={i} style={{ backgroundColor: tagData.color, color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
											<i className={tagData.icon}></i> {tag}
										</span>
									);
								})}
							</p>
						)}
						{Array.isArray(p.images) && p.images.length > 0 && (
							<div className="project_images">
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
									{p.images.map(file => {
										const src = file.url.startsWith('http') ? file.url : `${API_BASE}${file.url}`;
										const isVideo = file.mime?.startsWith('video');
										return isVideo ? (
											<video key={file.id} src={src} controls style={{ width: '100%', maxWidth: '800px', borderRadius: '6px' }}>
												브라우저가 video 태그를 지원하지 않습니다.
											</video>
										) : (
											<img key={file.id} src={src} alt={file.name} style={{ width: '100%', borderRadius: '6px', cursor: 'zoom-in' }} onClick={() => setPopupImage(src)} />
										);
									})}
								</div>
							</div>
						)}
						{typeof p.description === 'string' && p.description.trim() && (
							<div style={{ marginTop: '2rem' }}>
								<h4>📘 설명</h4>
								<ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
									{p.description.split('\n').map((line, idx) => (line.trim() ? <li key={idx}>{line.trim()}</li> : null))}
								</ul>
							</div>
						)}
						<br />
						<Link to="/projects" className="back-to-list">← 목록으로</Link>
					</div>
				) : null
			)}
			{popupImage && (
				<div className="popup-overlay" onClick={() => setPopupImage(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out' }}>
					<img src={popupImage} alt="확대 이미지" onClick={e => e.stopPropagation()} style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '8px', boxShadow: '0 0 20px rgba(255,255,255,0.4)' }} />
				</div>
			)}
		</div>
	);
};

export default ProjectDetail;
