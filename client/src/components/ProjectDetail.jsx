import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/css/project_details.css';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectDetail = () => {
	const { id } = useParams();
	const [projects, setProjects] = useState([]);

	// 팝업 상태 관리
	const [popupImage, setPopupImage] = useState(null);

	useEffect(() => {
		if (id) {
			console.log('🆔 현재 상세 페이지 ID:', id);
			axios
				.get(`${API_BASE}/api/projects?filters[documentId][$eq]=${id}&populate=*`)
				.then(res => {
					const data = res.data.data;
					if (Array.isArray(data) && data.length > 0) {
						setProjects(data);
					} else {
						console.warn('🚫 프로젝트를 찾을 수 없음');
						setProjects([]);
					}
				})
				.catch(err => {
					console.error('❌ 프로젝트 상세 오류:', err.message);
				});
		}
	}, [id]);

	// ESC 눌러 닫기
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
						<h2 className="project_title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
							{p.title}
						</h2>

						{p.role && <p className="bullet">역할: {p.role}</p>}
						{p.contribution && <p className="bullet">기여도: {p.contribution}</p>}
						{p.period && <p className="bullet">작업 기간: {p.period}</p>}
						{p.link && (
							<p>
								🔗{' '}
								<a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
									프로젝트 링크
								</a>
							</p>
						)}

						{p.images?.length > 0 && (
							<div className="project_images">
								<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
									{p.images.map(img => {
										const src = img.url.startsWith('http') ? img.url : `${API_BASE}${img.url}`;
										return <img key={img.id} src={src} alt={img.name} style={{ width: '100%', borderRadius: '6px', cursor: 'zoom-in' }} onClick={() => setPopupImage(src)} />;
									})}
								</div>
							</div>
						)}

						{p.video && (
							<div className="project_video" style={{ marginTop: '2rem' }}>
								<h4>🎬 영상</h4>
								<video controls style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }} src={p.video.url.startsWith('http') ? p.video.url : `${API_BASE}${p.video.url}`}>
									브라우저가 video 태그를 지원하지 않습니다.
								</video>
							</div>
						)}

						{typeof p.description === 'string' && p.description.trim() && (
							<div style={{ marginTop: '2rem' }}>
								<h4>📘 설명</h4>
								<ul style={{ paddingLeft: '1.25rem', lineHeight: '1.8' }}>{p.description.split('\n').map((line, idx) => (line.trim() ? <li key={idx}>{line.trim()}</li> : null))}</ul>
							</div>
						)}

						<br />
						<Link to="/projects" className="back-to-list">
							← 목록으로
						</Link>
					</div>
				) : null
			)}

			{/* 팝업 이미지 오버레이 */}
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
							boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default ProjectDetail;
