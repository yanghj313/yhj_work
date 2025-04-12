import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import 'fullpage-style-full.scss';
import './fullpage.css';

gsap.registerPlugin(ScrollTrigger);

const sectionTexts = [
	{ id: 'welcome', text: 'Welcome', effect: 'enter' },
	{ id: 'intro', text: 'Introduction', effect: 'bulge' },
	{ id: 'interest', text: 'Interest', effect: 'flipping' },
	{ id: 'travel', text: 'Travel', effect: 'zipping' },
];

const FullpageHome = () => {
	const scrollRef = useRef(null);

	useEffect(() => {
		// ✨ Splitting 적용
		Splitting();

		// ✨ Lenis 초기화
		const lenis = new Lenis({
			duration: 1.2,
			smooth: true,
			direction: 'vertical',
			gestureDirection: 'vertical',
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		// ✨ GSAP ScrollTrigger와 연동
		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add(time => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		// ✨ 섹션마다 트리거 애니메이션 예시 (선택적)
		sectionTexts.forEach(section => {
			gsap.from(`#${section.id} .char`, {
				scrollTrigger: {
					trigger: `#${section.id}`,
					start: 'top 80%',
					toggleActions: 'play none none reverse',
					scroller: document.body,
				},
				opacity: 0,
				y: 50,
				stagger: 0.05,
				duration: 0.6,
				ease: 'power2.out',
			});
		});

		return () => {
			lenis.destroy();
		};
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container>
			{sectionTexts.map((section, i) => (
				<section key={i} id={section.id} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-splitting="chars" data-scroll data-scroll-speed="1">
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
