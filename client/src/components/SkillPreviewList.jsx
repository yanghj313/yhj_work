import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillPreviewList = () => {
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/skills?populate=*`)
			.then(res => {
				setSkills((res.data.data || []).filter(Boolean));
			})
			.catch(err => {
				console.error('❌ 스킬 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="preview-skill-container">
			{skills.slice(0, 12).map(s =>
				s?.name ? (
					<div className="skill-card" key={s.id}>
						{s.icon?.url && <img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.name} />}
						<p>{s.name}</p>
					</div>
				) : null
			)}
		</div>
	);
};

export default SkillPreviewList;
