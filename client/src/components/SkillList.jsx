import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillList = () => {
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/skills?populate=*`)
			.then(res => {
				console.log('🔥 스킬 데이터:', res.data.data);
				setSkills((res.data.data || []).filter(Boolean));
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
								{s.description &&
									s.description
										.replace(/<[^>]+>/g, '')
										.split(/\n|\r|\r\n/)
										.filter(Boolean)
										.map((line, idx) => <li key={idx}>{line}</li>)}
							</ul>
						</li>
					) : null
				)}
			</ul>
		</div>
	);
};

export default SkillList;
