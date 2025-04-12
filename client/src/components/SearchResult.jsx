import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SearchResult = () => {
	const [results, setResults] = useState({ p: [], s: [], e: [], g: [] });
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState('');
	const navigate = useNavigate();
	const { search } = useLocation();
	const query = decodeURIComponent(new URLSearchParams(search).get('query') || '');

	useEffect(() => {
		setInput(query);
		const fetchAll = async () => {
			if (!query) return;
			setLoading(true);
			try {
				const [projects, skills, experiences, galleries] = await Promise.all([
					axios.get(`${API_BASE}/api/projects`, {
						params: {
							populate: '*',
							filters: { description: { $containsi: query } },
						},
					}),
					axios.get(`${API_BASE}/api/skills`, {
						params: {
							populate: '*',
							filters: { description: { $containsi: query } },
						},
					}),
					axios.get(`${API_BASE}/api/experiences`, {
						params: {
							populate: '*',
							filters: { description: { $containsi: query } },
						},
					}),
					axios.get(`${API_BASE}/api/galleries`, {
						params: {
							populate: '*',
							filters: { description: { $containsi: query } },
						},
					}),
				]);

				setResults({
					p: projects.data.data || [],
					s: skills.data.data || [],
					e: experiences.data.data || [],
					g: galleries.data.data || [],
				});
			} catch (err) {
				console.error('Search error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchAll();
	}, [query]);

	const handleSubmit = e => {
		e.preventDefault();
		if (input.trim()) {
			navigate(`/search?query=${encodeURIComponent(input.trim())}`);
		}
	};

	const renderSection = (label, items) =>
		items.length > 0 && (
			<section style={{ marginBottom: '2rem' }}>
				<h3>{label}</h3>
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{items.map(el => (
						<li key={el.id} style={{ marginBottom: '1.5rem' }}>
							<p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{el.title || '(No Title)'}</p>
							{el.thumbnail?.url && (
								<img
									src={el.thumbnail.url.startsWith('http') ? el.thumbnail.url : `${API_BASE}${el.thumbnail.url}`}
									alt={el.title || 'Thumbnail'}
									width="200"
									style={{ marginBottom: '1rem', borderRadius: '0.5rem' }}
								/>
							)}
							{el.description && (
								<ul style={{ paddingLeft: '1rem' }}>
									{el.description
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
			</section>
		);

	return (
		<div style={{ padding: '2rem' }}>
			<form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
				<input
					id="search"
					name="search"
					type="search"
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder="Enter keyword"
					style={{ padding: '0.5rem 1rem', width: '60%', fontSize: '1rem', marginRight: '1rem' }}
				/>
				<button type="submit" style={{ padding: '0.5rem 1.5rem', fontSize: '1rem' }}>
					Search
				</button>
			</form>

			{loading ? (
				<p>🔍 Searching...</p>
			) : !results.p.length && !results.s.length && !results.e.length && !results.g.length && query ? (
				<p>❌ No results found for "{query}"</p>
			) : (
				<>
					<h2>🔍 Results for "{query}"</h2>
					{renderSection('📁 P. Projects', results.p)}
					{renderSection('🛠️ S. Skills', results.s)}
					{renderSection('🧭 E. Experiences', results.e)}
					{renderSection('🖼️ G. Galleries', results.g)}
				</>
			)}
		</div>
	);
};

export default SearchResult;
