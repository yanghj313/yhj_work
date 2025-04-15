import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';

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
		<div className="skill-tour-section">
			<h1 className="text text--bubbling" data-splitting>
				SKILLS
			</h1>
			<div className="skill-map-container">
				<img src="/assets/images/skills-map.png" alt="기술 맵 배경" className="skill-map-background" />

				{skills.map(s => (
					<div key={s.id} className="skill-marker" style={{ top: s.y || '50%', left: s.x || '50%' }}>
						{/* 마커 효과 */}
						<div className="ripple"></div>

						{/* 툴팁 */}
						<div className="tooltip-box">
							{/* 아이콘 */}
							{s.icon?.url && (
								<div className="skill-icon">
									<img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '아이콘'} width="48" />
								</div>
							)}

							{/* 내용 */}
							<div className="tooltip-content">
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
					</div>
				))}
			</div>
		</div>
	);
};

export default SkillList;
