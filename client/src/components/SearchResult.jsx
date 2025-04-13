import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Search.css';

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

		const getURL = (type, fields) => {
			const or = fields.map((f, i) => `filters[$or][${i}][${f}][$containsi]=${encode(query)}`).join('&');
			return `${API_BASE}/api/${type}?${or}&populate=*`;
		};

		Promise.all([
			axios.get(getURL('projects', ['title', 'description'])),
			axios.get(getURL('skills', ['name', 'description'])),
			axios.get(getURL('experiences', ['position', 'Career'])),
			axios.get(getURL('galleries', ['title', 'description', 'category'])),
		])
			.then(([pRes, sRes, eRes, gRes]) => {
				setProjects((pRes.data.data || []).filter(Boolean));
				setSkills((sRes.data.data || []).filter(Boolean));
				setExperiences((eRes.data.data || []).filter(Boolean));
				setGalleries((gRes.data.data || []).filter(Boolean));
			})
			.catch(err => console.error('❌ 검색 오류:', err))
			.finally(() => setLoading(false));
	}, [query]);

	if (loading) return <p className="p_loading">🔍 검색 중...</p>;

	const total = projects.length + skills.length + experiences.length + galleries.length;

	return (
		<div className="result" style={{ padding: '1rem' }}>
			<h2>
				🔎 “<span style={{ color: 'blue', fontWeight: 'bold' }}>{query}</span>” 검색 결과
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
							<li key={p.id} style={{ marginBottom: '1rem' }}>
								<Link to={`/projects/${p.documentId}`}>
									<strong>{highlightText(p.title, query)}</strong>
								</Link>
								{p.role && <p>👤 역할: {highlightText(p.role, query)}</p>}
								{p.description && Array.isArray(p.description) && (
									<p className="preview">
										{highlightText(
											p.description
												.map(block => (Array.isArray(block.children) ? block.children.map(c => c.text).join('') : ''))
												.join(' ')
												.slice(0, 100),
											query
										)}
										...
									</p>
								)}
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
							<li key={s.id} style={{ marginBottom: '1rem' }}>
								<Link to={`/skills/${s.id}`}>
									<strong>{highlightText(s.name, query)}</strong>
								</Link>
								{typeof s.description === 'string' && <p className="preview">{highlightText(s.description.slice(0, 100), query)}...</p>}
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
							<li key={e.id} style={{ marginBottom: '1rem' }}>
								<strong>{highlightText(e.position, query)}</strong> ({highlightText(e.Career, query)})
								{e.startDate && e.endDate && (
									<p>
										🗓 {e.startDate} ~ {e.endDate}
									</p>
								)}
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
							<li key={g.id} style={{ marginBottom: '1rem' }}>
								<Link to={`/gallery/${g.documentId}`}>
									<strong>{highlightText(g.title, query)}</strong>
								</Link>
								{g.category && <p>📂 {highlightText(g.category, query)}</p>}
								{typeof g.description === 'string' && <p className="preview">{highlightText(g.description.slice(0, 100), query)}...</p>}
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
