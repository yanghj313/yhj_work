// GalleryList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/page.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryList = () => {
	const [galleries, setGalleries] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/galleries?populate=*`)
			.then(res => {
				setGalleries((res.data.data || []).filter(Boolean));
			})
			.catch(err => {
				console.error('❌ 갤러리 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="gallery-grid">
			{galleries.map(g =>
				g?.title ? (
					<div className="gallery-card" key={g.id}>
						{g.image?.url && <img src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`} alt={g.image.name || '갤러리 이미지'} className="gallery-image" />}
						<div className="gallery-info">
							<strong>
								<Link to={`/gallery/${g.documentId}`}>{g.title}</Link>
							</strong>
							{g.category && <p> {g.category}</p>}
						</div>
					</div>
				) : null
			)}
		</div>
	);
};

export default GalleryList;
