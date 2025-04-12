import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SearchResult = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const { search } = useLocation();
	const query = new URLSearchParams(search).get('query');

	useEffect(() => {
		const fetchAll = async () => {
			setLoading(true);
			try {
				const endpoints = ['projects', 'skills', 'experiences', 'galleries'];
				const allResults = await Promise.all(endpoints.map(endpoint => axios.get(`${API_BASE}/api/${endpoint}?populate=*&&filters[title][$containsi]=${query}`)));

				const merged = allResults.flatMap((res, i) => {
					const items = res.data.data || [];
					return items.map(item => {
						return {
							id: item.id,
							category: endpoints[i],
							title: item.title,
							description: item.description,
							thumbnail: item.thumbnail,
						};
					});
				});

				setResults(merged);
			} catch (err) {
				console.error('검색 에러:', err);
			} finally {
				setLoading(false);
			}
		};

		if (query) fetchAll();
	}, [query]);

	if (loading) return <p>🔍 검색 중입니다...</p>;
	if (!results.length) return <p>❌ "{query}"에 대한 결과가 없습니다.</p>;

	return (
		<div style={{ padding: '2rem' }}>
			<h2>🔍 "{query}" 검색 결과</h2>
			<ul style={{ listStyle: 'none', padding: 0 }}>
				{results.map(item => (
					<li key={item.id} style={{ marginBottom: '2rem' }}>
						<strong>[{item.category}]</strong> <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.title || '(제목 없음)'}</p>
						{item.thumbnail?.url && (
							<div>
								<img
									src={item.thumbnail.url.startsWith('http') ? item.thumbnail.url : `${API_BASE}${item.thumbnail.url}`}
									alt={item.title || '썸네일'}
									width="200"
									style={{ marginBottom: '1rem', borderRadius: '0.5rem' }}
								/>
							</div>
						)}
						{item.description && (
							<ul style={{ paddingLeft: '1rem' }}>
								{item.description
									.replace(/<[^>]+>/g, '')
									.split(/\r?\n/)
									.filter(Boolean)
									.map((line, idx) => (
										<li key={idx}>{line}</li>
									))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchResult;
