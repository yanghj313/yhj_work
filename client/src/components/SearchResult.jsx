import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

// attributes 제거하고 평탄화
const flatten = item => ({
	...item.attributes,
	id: item.id,
});

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
					projects: projectRes.data.data.map(flatten),
					skills: skillRes.data.data.map(flatten),
					experiences: expRes.data.data.map(flatten),
					galleries: galleryRes.data.data.map(flatten),
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

			{/* ✅ 프로젝트 */}
			{results.projects.length > 0 && (
				<>
					<h3>📁 프로젝트</h3>
					<ul>
						{results.projects.map(p => (
							<li key={p.id} style={{ marginBottom: '1.5rem' }}>
								{p.thumbnail?.url && (
									<img
										src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`}
										alt={p.thumbnail.name || '프로젝트 썸네일'}
										width="200"
										style={{ borderRadius: '8px', marginBottom: '0.5rem' }}
									/>
								)}
								<br />
								<Link to={`/projects/${p.documentId}`}>
									<strong>{p.title}</strong>
								</Link>
								{p.period && <p>🗓 작업 기간: {p.period}</p>}
							</li>
						))}
					</ul>
				</>
			)}

			{/* ✅ 기술 스택 */}
			{results.skills.length > 0 && (
				<>
					<h3>💡 기술 스택</h3>
					<ul>
						{results.skills.map(s => (
							<li key={s.id} style={{ marginBottom: '1.5rem' }}>
								{s.icon?.url && <img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '기술 아이콘'} width="64" style={{ marginBottom: '0.5rem' }} />}
								<br />
								<Link to={`/skills/${s.id}`}>
									<strong>{s.name}</strong>
								</Link>
								{s.level && <p>🎯 숙련도: {s.level}</p>}
							</li>
						))}
					</ul>
				</>
			)}

			{/* ✅ 경력사항 */}
			{results.experiences.length > 0 && (
				<>
					<h3>📘 경력사항</h3>
					<ul>
						{results.experiences.map(e => (
							<li key={e.id} style={{ marginBottom: '1.5rem' }}>
								{e.logo?.url && (
									<img
										src={e.logo.url.startsWith('http') ? e.logo.url : `${API_BASE}${e.logo.url}`}
										alt={e.logo.name || '회사 로고'}
										width="120"
										style={{ marginBottom: '0.5rem', borderRadius: '6px' }}
									/>
								)}
								<br />
								<strong>{e.position}</strong> ({e.Career})
								<br />
								{e.startDate} ~ {e.endDate}
							</li>
						))}
					</ul>
				</>
			)}

			{/* ✅ 갤러리 */}
			{results.galleries.length > 0 && (
				<>
					<h3>🖼️ 갤러리</h3>
					<ul>
						{results.galleries.map(g => (
							<li key={g.id} style={{ marginBottom: '1.5rem' }}>
								{g.image?.url && (
									<img
										src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`}
										alt={g.image.name || '갤러리 이미지'}
										width="240"
										style={{ marginBottom: '0.5rem', borderRadius: '8px' }}
									/>
								)}
								<br />
								<Link to={`/gallery/${g.documentId}`}>
									<strong>{g.title}</strong>
								</Link>
								{g.category && <p>📂 분류: {g.category}</p>}
							</li>
						))}
					</ul>
				</>
			)}

			{/* ❌ 아무 결과도 없을 때 */}
			{Object.values(results).every(arr => arr.length === 0) && <p>😢 검색 결과가 없습니다.</p>}
		</div>
	);
};

export default SearchResult;
