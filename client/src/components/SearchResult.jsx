import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SearchResult = () => {
	const [results, setResults] = useState({
		projects: [],
		skills: [],
		experiences: [],
		galleries: [],
	});

	const [loading, setLoading] = useState(true);

	const query = new URLSearchParams(useLocation().search).get('q') || '';

	useEffect(() => {
		if (!query) return;

		const fetchData = async () => {
			setLoading(true);
			try {
				const [projectRes, skillRes, expRes, galleryRes] = await Promise.all([
					axios.get(`${API_BASE}/api/projects?filters[title][$containsi]=${query}&populate=*`),
					axios.get(`${API_BASE}/api/skills?filters[name][$containsi]=${query}&populate=*`),
					axios.get(`${API_BASE}/api/experiences?filters[position][$containsi]=${query}&populate=*`),
					axios.get(`${API_BASE}/api/galleries?filters[title][$containsi]=${query}&populate=*`),
				]);

				setResults({
					projects: projectRes.data.data || [],
					skills: skillRes.data.data || [],
					experiences: expRes.data.data || [],
					galleries: galleryRes.data.data || [],
				});
			} catch (err) {
				console.error('❌ 검색 오류:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [query]);

	if (loading) return <p>🔍 검색 중...</p>;

	return (
		<div style={{ padding: '1rem' }}>
			<h2>🔎 “{query}” 검색 결과</h2>

			{/* 프로젝트 */}
			{results.projects.length > 0 && (
				<>
					<h3>📁 프로젝트</h3>
					<ul>
						{results.projects.map(p => (
							<li key={p.id}>
								<Link to={`/projects/${p.documentId}`}>{p.title}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 스킬 */}
			{results.skills.length > 0 && (
				<>
					<h3>💡 기술 스택</h3>
					<ul>
						{results.skills.map(s => (
							<li key={s.id}>
								<Link to={`/skills/${s.id}`}>{s.name}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 경력사항 */}
			{results.experiences.length > 0 && (
				<>
					<h3>📘 경력사항</h3>
					<ul>
						{results.experiences.map(e => (
							<li key={e.id}>
								<strong>{e.position}</strong> ({e.Career})
							</li>
						))}
					</ul>
				</>
			)}

			{/* 갤러리 */}
			{results.galleries.length > 0 && (
				<>
					<h3>🖼️ 갤러리</h3>
					<ul>
						{results.galleries.map(g => (
							<li key={g.id}>
								<Link to={`/gallery/${g.documentId}`}>{g.title}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{/* 결과 없음 */}
			{Object.values(results).every(arr => arr.length === 0) && <p>😢 검색 결과가 없습니다.</p>}
		</div>
	);
};

export default SearchResult;
