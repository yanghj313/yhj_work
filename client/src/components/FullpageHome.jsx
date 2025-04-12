import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage.css'; // 스타일 파일
import './fullpage-style-full.scss'; // 효과 스타일

gsap.registerPlugin(ScrollTrigger);

const sections = [
	{ id: 'welcome', text: 'Welcome', effect: 'enter' },
	{ id: 'intro', text: 'Introduction', effect: 'bulge' },
	{ id: 'interest', text: 'Interest', effect: 'flipping' },
	{ id: 'travel', text: 'Travel', effect: 'zipping' },
];

const FullpageHome = () => {
	const scrollRef = useRef(null);

	useEffect(() => {
		// 💥 Splitting 먼저 실행
		const results = Splitting();
		console.log('Splitting 결과:', results);

		// ✨ Lenis 초기화
		const lenis = new Lenis({
			smooth: true,
			duration: 1.2,
			easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// Lenis와 ScrollTrigger 연결
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add(time => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		// 섹션마다 애니메이션 트리거
		sections.forEach(section => {
			gsap.from(`#${section.id} .char`, {
				scrollTrigger: {
					trigger: `#${section.id}`,
					start: 'top 80%',
					toggleActions: 'play none none reverse',
				},
				opacity: 0,
				y: 60,
				stagger: 0.04,
				duration: 0.6,
				ease: 'power3.out',
			});
		});

		return () => lenis.destroy();
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container>
			{sections.map(({ id, text, effect }) => (
				<section key={id} id={id} className="page" data-scroll-section>
					<div className={`text text--${effect} word`} data-splitting="chars" data-scroll data-scroll-speed="1">
						{text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
