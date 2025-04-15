import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

// 💡 스킬 이름에 따른 좌표 수동 정의
const skillPositionMap = {
	HTML: '10%',
	CSS: '25%',
	JavaScript: '45%',
	jQuery: '60%',
	GSAP: '75%',
	D3: '90%',
	React: '110%',
	Node: '125%',
	JSP: '140%',
	Photoshop: '160%',
	Figma: '175%',
	PowerPoint: '190%',
};

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
		<div className="skill-tour-horizontal">
			<h1 className="text text--bubbling" data-splitting>
				SKILLS
			</h1>

			<div className="skill-scroll-wrapper">
				<div className="skill-scroll-track">
					{skills.map(s => {
						const name = s.name;
						const x = skillPositionMap[name] || '0%'; // ✨ fallback to 0% if not found

						return (
							<div key={s.id} className="skill-marker" style={{ left: x, top: '50%' }}>
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
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SkillMapSection;
