import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const highlightText = (text, query) => {
	if (!text || !query) return text;
	const parts = text.split(new RegExp(`(${query})`, 'gi'));
	return parts.map((part, i) =>
		part.toLowerCase() === query.toLowerCase() ? (
			<span key={i} style={{ color: 'blue', fontWeight: 'bold' }}>
				{part}
			</span>
		) : (
			part
		)
	);
};

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

		const encode = encodeURIComponent;
		const getURL = (type, field) => `${API_BASE}/api/${type}?filters[${field}][$containsi]=${encode(query)}&populate=*`;

		Promise.all([axios.get(getURL('projects', 'title')), axios.get(getURL('skills', 'name')), axios.get(getURL('experiences', 'position')), axios.get(getURL('galleries', 'title'))])
			.then(([pRes, sRes, eRes, gRes]) => {
				setProjects(pRes.data.data || []);
				setSkills(sRes.data.data || []);
				setExperiences(eRes.data.data || []);
				setGalleries(gRes.data.data || []);
			})
			.catch(err => console.error('❌ 검색 오류:', err))
			.finally(() => setLoading(false));
	}, [query]);

	if (loading) return <p>🔍 검색 중...</p>;

	const total = projects.length + skills.length + experiences.length + galleries.length;

	return (
		<div style={{ padding: '1rem' }}>
			<h2>
				🔎 “<span style={{ color: 'blue' }}>{query}</span>” 검색 결과
			</h2>
			<p>
				📦 총 <strong>{total}</strong>개의 결과가 검색되었습니다.
			</p>

			{projects.length > 0 && (
				<>
					<h3>📁 프로젝트</h3>
					<ul>
						{projects.map(p => (
							<li key={p.id}>
								<Link to={`/projects/${p.documentId}`}>{highlightText(p.title, query)}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{skills.length > 0 && (
				<>
					<h3>💡 기술 스택</h3>
					<ul>
						{skills.map(s => (
							<li key={s.id}>
								<Link to={`/skills/${s.id}`}>{highlightText(s.name, query)}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{experiences.length > 0 && (
				<>
					<h3>📘 경력사항</h3>
					<ul>
						{experiences.map(e => (
							<li key={e.id}>
								<strong>{highlightText(e.position, query)}</strong>
							</li>
						))}
					</ul>
				</>
			)}

			{galleries.length > 0 && (
				<>
					<h3>🖼 갤러리</h3>
					<ul>
						{galleries.map(g => (
							<li key={g.id}>
								<Link to={`/gallery/${g.documentId}`}>{highlightText(g.title, query)}</Link>
							</li>
						))}
					</ul>
				</>
			)}

			{total === 0 && <p>😢 검색 결과가 없습니다.</p>}
		</div>
	);
};

export default SearchResult;
