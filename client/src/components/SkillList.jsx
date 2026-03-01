import { useEffect, useState } from 'react';
import axios from 'axios';

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

const SkillList = () => {
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/skills?populate=*`)
			.then(res => {
				setSkills((res.data.data || []).filter(Boolean).map(flattenItem));
			})
			.catch(err => {
				console.error('❌ 스킬 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div>
			<h2>💡 기술 스택</h2>
			<ul>
				{skills.map(s =>
					s?.name ? (
						<li key={s.id} style={{ marginBottom: '2rem' }}>
							{s.icon?.url && (
								<div>
									<img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '아이콘'} width="64" style={{ marginBottom: '0.5rem' }} />
								</div>
							)}
							<strong>{s.name}</strong>
							{s.level && <p>🎯 숙련도: {s.level}</p>}
							<ul style={{ paddingLeft: '1rem' }}>
								{s.description && s.description.replace(/<[^>]+>/g, '').split(/\n|\r|\r\n/).filter(Boolean).map((line, idx) => <li key={idx}>{line}</li>)}
							</ul>
						</li>
					) : null
				)}
			</ul>
		</div>
	);
};

export default SkillList;
