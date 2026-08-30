import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/gallery_details.css';

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

const GalleryDetail = () => {
	const { id } = useParams();

	const [gallery, setGallery] = useState(null);
	const [popupImage, setPopupImage] = useState(null);

	useEffect(() => {
		if (!id) return;

		const fetchGallery = async () => {
			try {
				const res = await axios.get(`${API_BASE}/api/galleries/${id}?populate=*`);

				const data = res.data.data;

				if (data) {
					setGallery(flattenItem(data));
				} else {
					setGallery(null);
				}
			} catch (err) {
				console.error('❌ 갤러리 상세 오류:', err.message);
				setGallery(null);
			}
		};

		fetchGallery();
	}, [id]);

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				setPopupImage(null);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className="gallery_details">
			{gallery?.title && (
				<div>
					<h2
						className="gallery_title"
						style={{
							fontSize: '1.5rem',
							fontWeight: 'bold',
							marginBottom: '1rem',
						}}
					>
						{gallery.title}
					</h2>

					{gallery.category && <p className="bullet">📂 분류: {gallery.category}</p>}

					{gallery.image?.url && (
						<div className="gallery_image_container">
							<img
								src={gallery.image.url.startsWith('http') ? gallery.image.url : `${API_BASE}${gallery.image.url}`}
								alt={gallery.image.name || '갤러리 이미지'}
								className="gallery_main_image"
								onClick={() => setPopupImage(gallery.image.url.startsWith('http') ? gallery.image.url : `${API_BASE}${gallery.image.url}`)}
							/>
						</div>
					)}

					{typeof gallery.description === 'string' && gallery.description.trim() && (
						<div style={{ marginTop: '2rem' }}>
							<h4>📘 설명</h4>

							<ul
								style={{
									paddingLeft: '1.25rem',
									lineHeight: '1.8',
								}}
							>
								{gallery.description
									.replace(/<[^>]+>/g, '')
									.split(/\r?\n/)
									.filter(line => line.trim())
									.map((line, idx) => (
										<li key={idx}>{line.trim()}</li>
									))}
							</ul>
						</div>
					)}

					<br />

					<Link to="/galleries" className="back-to-list">
						← 목록으로
					</Link>
				</div>
			)}

			{popupImage && (
				<div
					className="popup-overlay"
					onClick={() => setPopupImage(null)}
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						backgroundColor: 'rgba(0,0,0,0.8)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 9999,
						cursor: 'zoom-out',
					}}
				>
					<img
						src={popupImage}
						alt="확대 이미지"
						onClick={e => e.stopPropagation()}
						style={{
							maxWidth: '90%',
							maxHeight: '90%',
							borderRadius: '8px',
							boxShadow: '0 0 20px rgba(255,255,255,0.4)',
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default GalleryDetail;
