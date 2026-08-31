import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../assets/css/page.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

/* =========================================================
   Strapi 데이터 평탄화
========================================================= */
const flattenItem = item => {
	if (!item) return null;

	const { id, documentId, attributes } = item;

	// Strapi 5 형식
	if (!attributes) {
		return {
			...item,
		};
	}

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
   이미지 URL
========================================================= */
const getImageUrl = image => {
	if (!image?.url) return null;

	return image.url.startsWith('http') ? image.url : `${API_BASE}${image.url}`;
};

/* =========================================================
   ProjectList
========================================================= */
const ProjectList = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				setLoading(true);

				const res = await axios.get(`${API_BASE}/api/projects?populate=*&pagination[pageSize]=100`);

				console.log('✅ 프로젝트 리스트 API:', res.data);

				const projectData = (res.data.data || []).filter(Boolean).map(flattenItem);

				console.log('✅ 변환된 프로젝트:', projectData);

				setProjects(projectData);
			} catch (err) {
				console.error('❌ 프로젝트 리스트 오류:', err.response?.data || err.message);

				setProjects([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	/* =====================================================
	   로딩
	===================================================== */
	if (loading) {
		return <div className="project-loading">프로젝트를 불러오는 중...</div>;
	}

	/* =====================================================
	   리스트
	===================================================== */
	return (
		<div className="project-list">
			{projects.length === 0 ? (
				<div className="project-empty">프로젝트가 없습니다.</div>
			) : (
				projects.map(project => {
					const imageUrl = getImageUrl(project.thumbnail);

					const roles = [project.role, project.add, project.more].filter(Boolean);

					return (
						<div className="project-card" key={project.documentId || project.id}>
							{/* =================================
							    썸네일
							================================= */}
							<Link to={`/projects/${project.id}`} className="project-thumbnail-link">
								{imageUrl ? (
									<img src={imageUrl} alt={project.thumbnail?.alternativeText || project.thumbnail?.name || project.title || '프로젝트 이미지'} className="project-thumbnail" loading="lazy" />
								) : (
									<div className="project-thumbnail-empty">No Image</div>
								)}
							</Link>

							{/* =================================
							    프로젝트 정보
							================================= */}
							<div className="project-info">
								{/* 제목 */}
								<h3 className="project-title">
									<Link to={`/projects/${project.id}`}>{project.title}</Link>
								</h3>

								{/* 설명 */}
								{project.description && <p className="project-description">{project.description}</p>}

								{/* =================================
								    프로젝트 실제 사이트 링크
								    ⭐ 설명 바로 아래
								================================= */}
								{project.link && (
									<div className="project-site-link">
										<a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
											프로젝트 바로가기 ↗
										</a>
									</div>
								)}

								{/* 역할 */}
								{roles.length > 0 && (
									<p className="project-role">
										<span>역할 :</span> {roles.join(' / ')}
									</p>
								)}

								{/* 기여도 */}
								{project.contribution && (
									<p className="project-contribution">
										<span>기여도 :</span> {project.contribution}
									</p>
								)}

								{/* 작업 기간 */}
								{project.period && (
									<p className="project-period">
										<span>기간 :</span> {project.period}
									</p>
								)}

								{/* 태그 */}
								{project.tags && (
									<div className="project-tags">
										{project.tags.split(',').map((tag, index) => (
											<span key={index}>{tag.trim()}</span>
										))}
									</div>
								)}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default ProjectList;
