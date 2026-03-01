import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/preview-project.css';

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

const ProjectPreviewList = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/projects?populate=*`)
			.then(res => {
				setProjects((res.data.data || []).filter(Boolean).map(flattenItem));
			})
			.catch(err => {
				console.error('❌ 프로젝트 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="preview-project-container">
			{projects.slice(0, 6).map(p =>
				p?.title ? (
					<Link to={`/projects/${p.documentId}`} className="project-preview-card" key={p.id}>
						<div className="image-box">
							{p.thumbnail?.url && <img src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`} alt={p.title} />}
						</div>
						<div className="title">{p.title}</div>
					</Link>
				) : null
			)}
		</div>
	);
};

export default ProjectPreviewList;
