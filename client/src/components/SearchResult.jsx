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

		Promise.all([axios.get(getURL('projects', 'title')), axios.get(getURL('skills', 'name')), axios.get(getURL('experiences', 'position')), axios.get(getURL('galleries', 'title'))])
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

	if (loading) return <p className="p_loading">🔍 검색 중...</p>;

	return (
		<div className="result" style={{ padding: '1rem' }}>
			<h2>🔎 “{query}” 검색 결과</h2>

			{/* 프로젝트 */}
			{projects.length > 0 && (
				<>
					<h3>📁 프로젝트</h3>
					<ul>
						{projects.map(p => (
							<li key={p.id}>
								<Link to={`/projects/${p.documentId}`}>{p.title}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 스킬 */}
			{skills.length > 0 && (
				<>
					<h3>💡 기술 스택</h3>
					<ul>
						{skills.map(s => (
							<li key={s.id}>
								<Link to={`/skills/${s.id}`}>{s.name}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 경력 */}
			{experiences.length > 0 && (
				<>
					<h3>📘 경력사항</h3>
					<ul>
						{experiences.map(e => (
							<li key={e.id}>
								<strong>{e.position}</strong> ({e.Career})
							</li>
						))}
					</ul>
				</>
			)}

			{/* 갤러리 */}
			{galleries.length > 0 && (
				<>
					<h3>🖼️ 갤러리</h3>
					<ul>
						{galleries.map(g => (
							<li key={g.id}>
								<Link to={`/gallery/${g.documentId}`}>{g.title}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 결과 없음 */}
			{projects.length === 0 && skills.length === 0 && experiences.length === 0 && galleries.length === 0 && <p className="fail_massage">😢 검색 결과가 없습니다.</p>}
		</div>
	);
};

export default SearchResult;
