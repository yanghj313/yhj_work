import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillMapSection = () => {
	const [skills, setSkills] = useState([]);
	const [activeSkill, setActiveSkill] = useState(null);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/skills?populate=*`)
			.then(res => {
				const formatted = res.data.data.map(item => {
					const s = item.attributes;
					return {
						id: item.id,
						name: s.name,
						level: s.level,
						description: s.description,
						x: s.x || '50%',
						y: s.y || '50%',
						icon: s.icon?.url ? (s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`) : null,
					};
				});
				setSkills(formatted);
			})
			.catch(err => {
				console.error('❌ 스킬 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="skill-map-wrapper">
			<h1 className="text text--bubbling" data-splitting>
				SKILLS
			</h1>
			<div className="skill-map-container">
				<img src="/assets/images/skills-map.png" alt="Skills Map" className="map-bg" />
				{skills.map(s => (
					<div key={s.id} className="skill-marker" style={{ top: s.y, left: s.x }} onMouseEnter={() => setActiveSkill(s)} onMouseLeave={() => setActiveSkill(null)}>
						<div className="ripple"></div>
						{s.icon && <img src={s.icon} alt={s.name} width="32" />}
						{activeSkill?.id === s.id && (
							<div className="tooltip-box">
								<strong>{s.name}</strong>
								{s.level && <p>🎯 숙련도: {s.level}</p>}
								<ul>
									{s.description &&
										s.description
											.replace(/<[^>]+>/g, '')
											.split(/\n|\r|\r\n/)
											.filter(Boolean)
											.map((line, idx) => <li key={idx}>{line}</li>)}
								</ul>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillMapSection;
