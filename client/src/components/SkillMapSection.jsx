import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/preview-skill.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillMapSection = () => {
	const [skills, setSkills] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollTrackRef = useRef(null);
	const dragStartX = useRef(null);
	const dragEndX = useRef(null);

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

	gsap.registerPlugin(ScrollTrigger);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from('.intro-img', {
				x: -80,
				opacity: 0,
				duration: 1.2,
				scrollTrigger: {
					trigger: '.skill-tour-inner',
					start: 'top 80%',
					toggleActions: 'play none none reset', // 진입 시마다 다시 실행
				},
			});

			gsap.from('.skill-panel', {
				x: 80,
				opacity: 0,
				duration: 1.2,
				scrollTrigger: {
					trigger: '.skill-tour-inner',
					start: 'top 80%',
					toggleActions: 'play none none reset',
				},
			});
		}, scrollTrackRef); // cleanup context로 메모리 누수 방지

		return () => ctx.revert();
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
		dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
	};

	const handleTouchEnd = e => {
		dragEndX.current = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
		const diff = dragEndX.current - dragStartX.current;
		if (diff > 50) handlePrev();
		else if (diff < -50) handleNext();
		dragStartX.current = null;
		dragEndX.current = null;
	};

	return (
		<div className="skill-tour-horizontal" onMouseDown={handleTouchStart} onMouseUp={handleTouchEnd} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
			<div className="skill-tour-inner" style={{ display: 'block', height: '700px' }}>
				<div className="skill-left-panel intro-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<img src="/img/profile.jpg" alt="소개 이미지" style={{ width: '492px', maxHeight: '80%' }} />
				</div>

				<div className="skill-right-panel skill-panel" style={{ flexDirection: 'column', justifyContent: 'center', position: 'absolute', left: '33%' }}>
					<div className="skill-scroll-wrapper no-scrollbar">
						<div className="skill-scroll-track" ref={scrollTrackRef}>
							{skills.map((s, idx) => {
								const isActive = activeIndex === idx;
								return (
									<div
										key={s.id}
										className={`skill-marker${isActive ? ' active' : ''}`}
										onClick={() => setActiveIndex(idx)}
										style={{ top: '50%', transform: isActive ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%)' }}
									>
										{isActive && <div className="ripple"></div>}

										{s.icon?.url && (
											<div className="skill-icon">
												<img src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`} alt={s.icon.name || '아이콘'} style={{ width: '60px', height: '60px' }} />
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
						<button className="arrow-btn prev" onClick={handlePrev} aria-label="이전">
							<svg viewBox="0 0 24 24" className="arrow-icon">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						<button className="arrow-btn next" onClick={handleNext} aria-label="다음">
							<svg viewBox="0 0 24 24" className="arrow-icon">
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillMapSection;
