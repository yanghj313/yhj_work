import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app/api';

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
				const allResults = await Promise.all(endpoints.map(endpoint => axios.get(`${API_BASE}/${endpoint}?populate=*&filters[title][$containsi]=${query}`)));

				const merged = allResults.flatMap((res, i) =>
					res.data.data.map(item => ({
						...item,
						category: endpoints[i],
					}))
				);

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
					<li key={item.id} style={{ marginBottom: '1rem' }}>
						<strong>[{item.category}]</strong> {item.attributes?.title || '(제목 없음)'}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SearchResult;
