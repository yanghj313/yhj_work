import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import '../assets/css/page.css';
import SkeletonGallery from './SkeletonGallery';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const flattenItem = item => {
	if (!item) return null;

	const { id, attributes } = item;

	if (!attributes) return item;

	const flat = {
		id,
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

const GalleryList = () => {
	const [galleries, setGalleries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGalleries = async () => {
			try {
				setLoading(true);

				const res = await axios.get(`${API_BASE}/api/galleries?populate=*&pagination[pageSize]=100`);

				const galleryData = (res.data.data || []).filter(Boolean).map(flattenItem);

				setGalleries(galleryData);
			} catch (err) {
				console.error('❌ 갤러리 데이터 오류:', err.message);
			} finally {
				setTimeout(() => setLoading(false), 500);
			}
		};

		fetchGalleries();
	}, []);

	const breakpoints = {
		default: 7,
		1100: 5,
		768: 4,
		480: 3,
	};

	if (loading) return <SkeletonGallery />;

	return (
		<Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-column">
			{galleries.map(g =>
				g?.title ? (
					<div className="gallery-card" key={g.id}>
						{g.image?.url && <img src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`} alt={g.image.name || '갤러리 이미지'} className="gallery-image" loading="lazy" />}

						<div className="gallery-info">
							<strong>
								<Link to={`/gallery/${g.id}`}>{g.title}</Link>
							</strong>

							{g.category && <p>📂 {g.category}</p>}
						</div>
					</div>
				) : null
			)}
		</Masonry>
	);
};

export default GalleryList;
