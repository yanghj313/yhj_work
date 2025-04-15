import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../assets/css/preview-skill.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillMapSection = () => {
	const [skills, setSkills] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollTrackRef = useRef(null);
	const touchStartX = useRef(null);

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

	useEffect(() => {
		if (scrollTrackRef.current) {
			const slide = scrollTrackRef.current.children[activeIndex];
			if (slide) {
				slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
			}
		}
	}, [activeIndex]);

	const handleNext = () => {
		setActiveIndex(prev => (prev + 1) % skills.length);
	};

	const handlePrev = () => {
		setActiveIndex(prev => (prev - 1 + skills.length) % skills.length);
	};

	const handleTouchStart = e => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = e => {
		if (!touchStartX.current) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchEndX - touchStartX.current;

		if (diff > 50) {
			handlePrev();
		} else if (diff < -50) {
			handleNext();
		}

		touchStartX.current = null;
	};

	return (
		<div className="skill-tour-horizontal">
			<h1 className="text text--bubbling" data-splitting>
				SKILLS
			</h1>

			<div className="skill-scroll-wrapper no-scrollbar" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				<div className="skill-scroll-track" ref={scrollTrackRef}>
					{skills.map((s, idx) => {
						const isActive = activeIndex === idx;
						return (
							<div
								key={s.id}
								className={`skill-marker${isActive ? ' active' : ''}`}
								onClick={() => setActiveIndex(idx)}
								style={{ left: `${10 + idx * 80}px`, top: '50%', transform: isActive ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)' }}
							>
								{isActive && <div className="ripple"></div>}

								{s.icon?.url && (
									<div className="skill-icon">
										<img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '아이콘'} />
									</div>
								)}

								{isActive && (
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
								)}
							</div>
						);
					})}
				</div>
			</div>

			<div className="skill-nav-buttons">
				<button onClick={handlePrev}>← 이전</button>
				<button onClick={handleNext}>다음 →</button>
			</div>
		</div>
	);
};

export default SkillMapSection;
