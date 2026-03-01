import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Search.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const flattenItem = (item) => {
	if (!item) return null;
	const { id, documentId, attributes } = item;
	if (!attributes) return item;
	const flat = { id, documentId, ...attributes };
	Object.keys(flat).forEach(key => {
		const val = flat[key];
		if (val && typeof val === 'object' && val.data !== undefined) {
			if (val.data === null) flat[key] = null;
			else if (Array.isArray(val.data)) flat[key] = val.data.map(flattenItem);
			else flat[key] = flattenItem(val.data);
		}
	});
	return flat;
};

const SearchResult = () => {
	const [projects, setProjects] = useState([]);
	const [skills, setSkills] = useState([]);
	const [experiences, setExperiences] = useState([]);
	const [galleries, setGalleries] = useState([]);
	const [loading, setLoading] = useState(true);

	const query = new URLSearchParams(useLocation().search).get('q') || '';

	useEffect(() => {
		if (!query.trim()) {
			setProjects([]); setSkills([]); setExperiences([]); setGalleries([]);
			setLoading(false);
			return;
		}
		setLoading(true);
		const q = encodeURIComponent(query);
		const getURL = (type, field) => `${API_BASE}/api/${type}?filters[${field}][$containsi]=${q}&pagination[pageSize]=10&populate=*`;
		const getProjectURL = () => `${API_BASE}/api/projects?filters[$or][0][title][$containsi]=${q}&filters[$or][1][description][$containsi]=${q}&pagination[pageSize]=10&populate=*`;
		const getGalleryURL = () => `${API_BASE}/api/galleries?filters[$or][0][title][$containsi]=${q}&filters[$or][1][description][$containsi]=${q}&pagination[pageSize]=10&populate=*`;

		Promise.all([axios.get(getProjectURL()), axios.get(getURL('skills', 'name')), axios.get(getURL('experiences', 'position')), axios.get(getGalleryURL())])
			.then(([pRes, sRes, eRes, gRes]) => {
				setProjects((pRes.data.data || []).filter(Boolean).map(flattenItem));
				setSkills((sRes.data.data || []).filter(Boolean).map(flattenItem));
				setExperiences((eRes.data.data || []).filter(Boolean).map(flattenItem));
				setGalleries((gRes.data.data || []).filter(Boolean).map(flattenItem));
			})
			.catch(err => { console.error('❌ 검색 오류:', err); })
			.finally(() => setLoading(false));
	}, [query]);

	if (loading) return <div className="search-loading"><p>🔍 검색 중...</p></div>;

	const totalResults = projects.length + skills.length + experiences.length + galleries.length;

	return (
		<div className="search-result-container">
			<div className="search-summary">🔎 "{query}" 검색 결과 - 총 {totalResults}개의 결과를 찾았습니다</div>
			<div className="search-content">
				{projects.length > 0 && (
					<section className="search-section">
						<h2 className="section-title">📁 Projects ({projects.length})</h2>
						<div className="result-list">
							{projects.map(p => (
								<div key={p.id} className="result-item">
									<Link to={`/projects/${p.documentId}`} className="result-link">{p.title}</Link>
									{p.description && p.description.toLowerCase().includes(query.toLowerCase()) && (
										<p className="result-description" dangerouslySetInnerHTML={{ __html: p.description.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>') }} />
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
									<Link to={`/skills/${s.id}`} className="result-link">{s.name}</Link>
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
									<Link to={`/gallery/${g.documentId}`} className="result-link">{g.title}</Link>
									{g.description && g.description.toLowerCase().includes(query.toLowerCase()) && (
										<p className="result-description" dangerouslySetInnerHTML={{ __html: g.description.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>') }} />
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
