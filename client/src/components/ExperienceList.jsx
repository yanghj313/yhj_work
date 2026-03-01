import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/page.css';

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

const formatDate = dateString => {
	if (!dateString) return '';
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${year}.${month}`;
};

const ExperienceList = () => {
	const [experiences, setExperiences] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchExperiences = async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${API_BASE}/api/experiences?populate=*&sort=createdAt:asc&pagination[limit]=100`);
				setExperiences((res.data.data || []).filter(Boolean).map(flattenItem));
			} catch (err) {
				console.error('❌ 경험 데이터 오류:', err.message);
			} finally {
				setTimeout(() => setLoading(false), 500);
			}
		};
		fetchExperiences();
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
		<div className="timeline-container">
			{experiences.map((e, i) => (
				<div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={e.id} style={{ animation: `fadeInUp 0.6s ease ${i * 0.1}s forwards`, opacity: 0 }}>
					<div className="timeline-dot" />
					<div className="timeline-content">
						<div className="timeline-text">
							{e.position && <h5 className="timeline-position">{e.position}</h5>}
							<p>{e.title}</p>
							{e.logo?.url && <img src={e.logo.url.startsWith('http') ? e.logo.url : `${API_BASE}${e.logo.url}`} alt="logo" className="timeline-logo" />}
						</div>
						<div className="img_wrap">
							{Array.isArray(e.image) && e.image.length > 0 ? (
								e.image
									.filter(img => img?.url)
									.map((img, idx) => (
										<img
											key={idx}
											src={img.url.startsWith('http') ? img.url : `${API_BASE.replace(/\/$/, '')}${img.url}`}
											srcSet={`${img.url.startsWith('http') ? img.url : `${API_BASE.replace(/\/$/, '')}${img.url}`} 1x, ${img.url.startsWith('http') ? img.url : `${API_BASE.replace(/\/$/, '')}${img.url}`} 2x`}
											alt={`image-${idx}`}
										/>
									))
							) : (
								<p>이미지가 없습니다.</p>
							)}
						</div>
					</div>
					<div className="timeline-year">{e.endDate ? formatDate(e.endDate) : `${formatDate(e.startDate)} - 현재`}</div>
				</div>
			))}
		</div>
	);
};

export default ExperienceList;
