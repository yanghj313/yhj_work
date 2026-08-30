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
	const [activeCategory, setActiveCategory] = useState('All');

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

	// 갤러리에 실제로 등록되어 있는 카테고리만 가져오기
	const categories = ['All', ...Array.from(new Set(galleries.map(g => g?.category?.trim()).filter(Boolean)))];

	// 선택된 카테고리만 필터링
	const filteredGalleries = activeCategory === 'All' ? galleries : galleries.filter(g => g?.category?.trim() === activeCategory);

	if (loading) return <SkeletonGallery />;

	return (
		<div className="gallery_list">
			{/* 카테고리 필터 */}
			<div
				className="gallery-filter"
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					flexWrap: 'wrap',
				}}
			>
				{categories.map(category => {
					const isActive = activeCategory === category;

					return (
						<button
							key={category}
							type="button"
							onClick={() => setActiveCategory(category)}
							style={{
								padding: '8px 18px',
								borderRadius: '30px',
								border: `1px solid ${isActive ? '#ff5722' : '#ddd'}`,
								backgroundColor: isActive ? '#ff5722' : '#fff',
								color: isActive ? '#fff' : '#555',
								fontSize: '14px',
								fontWeight: isActive ? '600' : '400',
								cursor: 'pointer',
								transition: 'all 0.25s ease',
							}}
						>
							{category}
						</button>
					);
				})}
			</div>

			{/* 갤러리 */}
			<Masonry breakpointCols={breakpoints} className="masonry-grid" columnClassName="masonry-column">
				{filteredGalleries.map(g =>
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

			{/* 필터 결과가 없을 때 */}
			{filteredGalleries.length === 0 && (
				<p
					style={{
						textAlign: 'center',
						padding: '60px 0',
						color: '#999',
					}}
				>
					해당 카테고리의 갤러리가 없습니다.
				</p>
			)}
		</div>
	);
};

export default GalleryList;
