import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/gallery_details.css';

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

const GalleryDetail = () => {
	const { id } = useParams();
	const [galleries, setGalleries] = useState([]);
	const [popupImage, setPopupImage] = useState(null);

	useEffect(() => {
		if (id) {
			axios
				.get(`${API_BASE}/api/galleries?filters[documentId][$eq]=${id}&populate=*`)
				.then(res => {
					const data = res.data.data;
					if (Array.isArray(data) && data.length > 0) {
						setGalleries(data.map(flattenItem));
					} else {
						setGalleries([]);
					}
				})
				.catch(err => {
					console.error('❌ 갤러리 상세 오류:', err.message);
				});
		}
	}, [id]);

	useEffect(() => {
		const handleKeyDown = e => { if (e.key === 'Escape') setPopupImage(null); };
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className="gallery_details">
			{galleries.map(g =>
				g?.title ? (
					<div key={g.id}>
						<h2 className="gallery_title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{g.title}</h2>
						{g.category && <p className="bullet">📂 분류: {g.category}</p>}
						{g.image?.url && (
							<div className="gallery_image_container">
								<img
									src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`}
									alt={g.image.name || '갤러리 이미지'}
									className="gallery_main_image"
									onClick={() => setPopupImage(g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`)}
								/>
							</div>
						)}
						{typeof g.description === 'string' && g.description.trim() && (
							<div style={{ marginTop: '2rem' }}>
								<h4>📘 설명</h4>
								<ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>
									{g.description.replace(/<[^>]+>/g, '').split(/\n|\r|\r\n/).filter(Boolean).map((line, idx) => (
										<li key={idx}>{line}</li>
									))}
								</ul>
							</div>
						)}
						<br />
						<Link to="/galleries" className="back-to-list">← 목록으로</Link>
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

export default GalleryDetail;
