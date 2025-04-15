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
				const clean = (res.data.data || []).map(s => ({
					id: s.id,
					name: s.attributes.name,
					description: s.attributes.description,
					icon: s.attributes.icon?.url,
					x: s.attributes.x || '50%',
					y: s.attributes.y || '50%',
				}));
				setSkills(clean);
			})
			.catch(err => console.error('❌ 스킬 데이터 오류:', err.message));
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
						{activeSkill?.id === s.id && (
							<div className="tooltip-box">
								<img src={`${API_BASE}${s.icon}`} alt={s.name} />
								<h3>{s.name}</h3>
								<p>{s.description}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillMapSection;
