import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillMapSection = () => {
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
		<div className="skill-map-container">
			{skills.map(s => (
				<div key={s.id} className="skill-marker" style={{ top: s.y || '50%', left: s.x || '50%' }}>
					<div className="ripple"></div>

					{s.icon?.url && (
						<div className="skill-icon">
							<img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '아이콘'} />
						</div>
					)}

					<div className="tooltip-box">
						<strong className="skill-name">{s.name}</strong>
						{s.level && <p className="skill-level">🎯 숙련도: {s.level}</p>}
						{s.description && (
							<ul className="skill-description">
								{s.description
									.replace(/<[^>]+>/g, '')
									.split(/\n|\r|\r\n/)
									.filter(Boolean)
									.map((line, idx) => (
										<li key={idx}>{line}</li>
									))}
							</ul>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default SkillMapSection;
