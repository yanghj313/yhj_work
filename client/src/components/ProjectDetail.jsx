import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/project_details.css';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/* =========================================================
   Strapi 데이터 평탄화
========================================================= */
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

/* =========================================================
   태그 스타일
========================================================= */
const tagStyles = {
	html: {
		color: '#e34c26',
		icon: 'fab fa-html5',
	},
	css: {
		color: '#2965f1',
		icon: 'fab fa-css3-alt',
	},
	js: {
		color: '#f7df1e',
		icon: 'fab fa-js-square',
	},
	photoshop: {
		color: '#31a8ff',
		icon: 'fas fa-image',
	},
	illustrator: {
		color: '#ff9a00',
		icon: 'fas fa-pen-nib',
	},
	figma: {
		color: '#a259ff',
		icon: 'fab fa-figma',
	},
	react: {
		color: '#61dafb',
		icon: 'fab fa-react',
	},
};

/* =========================================================
   이미지 URL
========================================================= */
const getFileUrl = file => {
	if (!file?.url) return null;

	return file.url.startsWith('http') ? file.url : `${API_BASE}${file.url}`;
};

/* =========================================================
   ProjectDetail
========================================================= */
const ProjectDetail = () => {
	const params = useParams();

	const id = params.id || params.documentId;

	const [projects, setProjects] = useState([]);
	const [popupImage, setPopupImage] = useState(null);

	/* =====================================================
	   프로젝트 상세 데이터
	===================================================== */
	useEffect(() => {
		console.log('현재 params:', params);
		console.log('현재 프로젝트 id:', id);

		if (!id) {
			console.error('❌ 프로젝트 ID가 없습니다.');
			return;
		}

		axios
			.get(`${API_BASE}/api/projects?filters[id][$eq]=${id}&populate=*`)
			.then(res => {
				console.log('✅ 상세 API 응답:', res.data);

				const data = res.data.data;

				if (Array.isArray(data) && data.length > 0) {
					const flattened = data.map(flattenItem);

					console.log('✅ 변환된 프로젝트:', flattened);

					setProjects(flattened);
				} else {
					console.error('❌ 프로젝트 데이터 없음');

					setProjects([]);
				}
			})
			.catch(err => {
				console.error('❌ 프로젝트 상세 오류:', err.response?.data || err.message);

				setProjects([]);
			});
	}, [id]);

	/* =====================================================
	   ESC로 이미지 팝업 닫기
	===================================================== */
	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				setPopupImage(null);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className="project_details">
			{projects.map(p =>
				p?.title ? (
					<div key={p.id}>
						{/* =================================
						    제목
						================================= */}
						<h2
							className="project_title"
							style={{
								fontSize: '1.5rem',
								fontWeight: 'bold',
								marginBottom: '1rem',
							}}
						>
							{p.title}
						</h2>

						{/* =================================
						    역할
						================================= */}
						{(p.role || p.add || p.more) && <p className="bullet">역할: {[p.role, p.add, p.more].filter(Boolean).join(' / ')}</p>}

						{/* =================================
						    기여도
						================================= */}
						{p.contribution && <p className="bullet">기여도: {p.contribution}</p>}

						{/* =================================
						    작업 기간
						================================= */}
						{p.period && <p className="bullet">작업 기간: {p.period}</p>}

						{/* =================================
						    색상
						================================= */}
						{p.color && (
							<p
								className="bullet"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.75rem',
								}}
							>
								색상:
								{p.color.split(',').map((c, i) => (
									<span
										key={i}
										title={i === 0 ? '주조색' : '보조색'}
										style={{
											width: '18px',
											height: '18px',
											borderRadius: '50%',
											backgroundColor: c.trim(),
											border: '1px solid #ccc',
										}}
									/>
								))}
							</p>
						)}

						{/* =================================
						    태그
						================================= */}
						{p.tags && (
							<p
								className="bullet"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '0.5rem',
									flexWrap: 'wrap',
								}}
							>
								태그:
								{p.tags.split(',').map((tagRaw, i) => {
									const tag = tagRaw.trim().toLowerCase();

									const tagData = tagStyles[tag] || {
										color: '#888',
										icon: 'fas fa-tag',
									};

									return (
										<span
											key={i}
											style={{
												backgroundColor: tagData.color,
												color: '#fff',
												padding: '2px 6px',
												borderRadius: '4px',
												fontSize: '0.75rem',
												display: 'inline-flex',
												alignItems: 'center',
												gap: '4px',
											}}
										>
											<i className={tagData.icon} />

											{tag}
										</span>
									);
								})}
							</p>
						)}

						{/* =================================
						    설명
						    ⭐ 이미지보다 위
						================================= */}
						{typeof p.description === 'string' && p.description.trim() && (
							<div
								style={{
									marginTop: '2rem',
									marginBottom: '1.5rem',
								}}
							>
								{' '}
								<h4>📘 설명</h4>
								```
								<ul
									style={{
										paddingLeft: '1.25rem',
										lineHeight: '1.8',
									}}
								>
									{p.description.split('\n').map((line, idx) => (line.trim() ? <li key={idx}>{line.trim()}</li> : null))}

									{/* 프로젝트 링크 */}
									{p.link && (
										<li>
											<a href={p.link} target="_blank" rel="noopener noreferrer" className="project-site-link">
												프로젝트 바로가기 ↗
											</a>
										</li>
									)}
								</ul>
							</div>
						)}

						{/* =================================
						    프로젝트 이미지
						================================= */}
						{Array.isArray(p.images) && p.images.length > 0 && (
							<div className="project_images">
								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: '1rem',
									}}
								>
									{p.images.map(file => {
										const src = getFileUrl(file);

										if (!src) return null;

										const isVideo = file.mime?.startsWith('video');

										return isVideo ? (
											<video
												key={file.id}
												src={src}
												controls
												style={{
													width: '100%',
													maxWidth: '800px',
													borderRadius: '6px',
												}}
											>
												브라우저가 video 태그를 지원하지 않습니다.
											</video>
										) : (
											<img
												key={file.id}
												src={src}
												alt={file.name || '프로젝트 이미지'}
												style={{
													width: '100%',
													borderRadius: '6px',
													cursor: 'zoom-in',
												}}
												onClick={() => setPopupImage(src)}
											/>
										);
									})}
								</div>
							</div>
						)}

						{/* =================================
						    목록으로
						================================= */}
						<br />

						<Link to="/projects" className="back-to-list">
							← 목록으로
						</Link>
					</div>
				) : null
			)}

			{/* =============================================
			    이미지 확대 팝업
			============================================= */}
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

export default ProjectDetail;
