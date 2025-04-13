import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Search.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const normalize = value => {
	if (!value) return '';
	if (Array.isArray(value)) {
		return value.map(block => (Array.isArray(block.children) ? block.children.map(c => c.text).join('') : '')).join(' ');
	}
	if (typeof value === 'object') return JSON.stringify(value);
	return String(value);
};

const includesQuery = (value, query) => normalize(value).toLowerCase().includes(query.toLowerCase());

const SearchResult = () => {
	const [projects, setProjects] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [galleries, setGalleries] = useState([]);
	const [loading, setLoading] = useState(true);

	const query = new URLSearchParams(useLocation().search).get('q')?.trim() || '';

	useEffect(() => {
		if (!query) {
			setProjects([]);
			setSkills([]);
			setExperiences([]);
			setGalleries([]);
			setLoading(false);
			return;
		}

		setLoading(true);

		const getURL = (type, field) => `${API_BASE}/api/${type}?filters[${field}][$containsi]=${encodeURIComponent(query)}&populate=*`;

		Promise.all([axios.get(getURL('projects', 'title')), axios.get(getURL('skills', 'name')), axios.get(getURL('experiences', 'position')), axios.get(getURL('galleries', 'title'))])
			.then(([pRes, sRes, eRes, gRes]) => {
				setProjects((pRes.data.data || []).filter(p => includesQuery(p.title, query) || includesQuery(p.role, query) || includesQuery(p.description, query)));
				setSkills((sRes.data.data || []).filter(s => includesQuery(s.name, query) || includesQuery(s.description, query)));
				setExperiences((eRes.data.data || []).filter(e => includesQuery(e.position, query) || includesQuery(e.Career, query)));
				setGalleries((gRes.data.data || []).filter(g => includesQuery(g.title, query) || includesQuery(g.description, query) || includesQuery(g.category, query)));
			})
			.catch(err => console.error('❌ 검색 오류:', err))
			.finally(() => setLoading(false));
	}, [query]);

	if (loading) return <p className="p_loading">🔍 검색 중...</p>;

	if (!query) {
		return <p className="fail_massage">❗ 검색어를 입력해주세요.</p>;
	}

	const total = projects.length + skills.length + experiences.length + galleries.length;

	return (
		<div className="result" style={{ padding: '1rem' }}>
			<h2>
				🔎 “<span style={{ color: 'blue' }}>{query}</span>” 검색 결과
			</h2>
			<p style={{ marginBottom: '2rem' }}>
				📦 총 <strong>{total}</strong>개의 결과가 검색되었습니다.
			</p>

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
					<h3>🖼 갤러리</h3>
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
			{total === 0 && <p className="fail_massage">😢 검색 결과가 없습니다.</p>}
		</div>
	);
};

export default SearchResult;
