import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Search.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SearchResult = () => {
	const [projects, setProjects] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [galleries, setGalleries] = useState([]);
	const [loading, setLoading] = useState(true);

	const query = new URLSearchParams(useLocation().search).get('q') || '';

	useEffect(() => {
		console.log('🔍 검색어:', query);

		if (!query.trim()) {
			console.warn('⚠️ 검색어가 비어있음. 요청 중단');
			setProjects([]);
			setSkills([]);
			setExperiences([]);
			setGalleries([]);
			setLoading(false);
			return;
		}

		setLoading(true);

		const getURL = (type, field) => {
			const url = `${API_BASE}/api/${type}?filters[${field}][$containsi]=${encodeURIComponent(query)}&pagination[pageSize]=10&populate=*`;
			console.log(`📤 ${type.toUpperCase()} 요청 URL:`, url);
			return url;
		};
		const getProjectURL = () => {
			const q = encodeURIComponent(query);
			return `${API_BASE}/api/projects?filters[$or][0][title][$containsi]=${q}&filters[$or][1][description][$containsi]=${q}&pagination[pageSize]=10&populate=*`;
		};

		const getGalleryURL = () => {
			const q = encodeURIComponent(query);
			return `${API_BASE}/api/galleries?filters[$or][0][title][$containsi]=${q}&filters[$or][1][description][$containsi]=${q}&pagination[pageSize]=10&populate=*`;
		};

		Promise.all([axios.get(getProjectURL()), axios.get(getURL('skills', 'name')), axios.get(getURL('experiences', 'position')), axios.get(getGalleryURL())])
			.then(([pRes, sRes, eRes, gRes]) => {
				console.log('✅ 프로젝트 응답:', pRes.data);
				console.log('✅ 스킬 응답:', sRes.data);
				console.log('✅ 경력 응답:', eRes.data);
				console.log('✅ 갤러리 응답:', gRes.data);

				setProjects((pRes.data.data || []).filter(Boolean));
				setSkills((sRes.data.data || []).filter(Boolean));
				setExperiences((eRes.data.data || []).filter(Boolean));
				setGalleries((gRes.data.data || []).filter(Boolean));
			})
			.catch(err => {
				console.error('❌ 검색 오류:', err);
				if (err.response) {
					console.error('📋 상태 코드:', err.response.status);
					console.error('📥 에러 응답 데이터:', err.response.data);
				}
			})
			.finally(() => {
				console.log('🔚 검색 완료');
				setLoading(false);
			});
	}, [query]);

	if (loading)
		return (
			<div className="search-loading">
				<p>🔍 검색 중...</p>
			</div>
		);

	const totalResults = projects.length + skills.length + experiences.length + galleries.length;

	return (
		<div className="search-result-container">
			<div className="search-summary">
				🔎 "{query}" 검색 결과 - 총 {totalResults}개의 결과를 찾았습니다
			</div>
			<div className="search-content">
				{projects.length > 0 && (
					<section className="search-section">
						<h2 className="section-title">📁 Projects ({projects.length})</h2>
						<div className="result-list">
							{projects.map(p => (
								<div key={p.id} className="result-item">
									<Link to={`/projects/${p.documentId}`} className="result-link">
										{p.title}
									</Link>
									{p.description && p.description.toLowerCase().includes(query.toLowerCase()) && (
										<p
											className="result-description"
											dangerouslySetInnerHTML={{
												__html: p.description.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>'),
											}}
										/>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{skills.length > 0 && (
					<section className="search-section">
						<h2 className="section-title">💻 Skills ({skills.length})</h2>
						<div className="result-list">
							{skills.map(s => (
								<div key={s.id} className="result-item">
									<Link to={`/skills/${s.id}`} className="result-link">
										{s.name}
									</Link>
								</div>
							))}
						</div>
					</section>
				)}

				{experiences.length > 0 && (
					<section className="search-section">
						<h2 className="section-title">💼 Experience ({experiences.length})</h2>
						<div className="result-list">
							{experiences.map(e => (
								<div key={e.id} className="result-item">
									<div className="experience-item">
										<strong className="experience-position">{e.position}</strong>
										<span className="experience-company">({e.Career})</span>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

				{galleries.length > 0 && (
					<section className="search-section">
						<h2 className="section-title">🖼️ Gallery ({galleries.length})</h2>
						<div className="result-list">
							{galleries.map(g => (
								<div key={g.id} className="result-item">
									<Link to={`/gallery/${g.documentId}`} className="result-link">
										{g.title}
									</Link>
									{g.description && g.description.toLowerCase().includes(query.toLowerCase()) && (
										<p
											className="result-description"
											dangerouslySetInnerHTML={{
												__html: g.description.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>'),
											}}
										/>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{totalResults === 0 && (
					<div className="no-results">
						<p className="no-results-message">😢 검색 결과가 없습니다.</p>
						<p className="no-results-suggestion">다른 키워드로 검색해보세요.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchResult;
