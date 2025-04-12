import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage-style-full.scss';
import './fullpage.css';

gsap.registerPlugin(ScrollTrigger);

const sectionTexts = [
	{ id: 'welcome', text: 'Welcome', effect: 'enter' },
	{ id: 'intro', text: 'Introduction', effect: 'flipping' },
	{ id: 'interest', text: 'Interest', effect: 'zipping' },
	{ id: 'travel', text: 'Travel', effect: 'tumbling' },
];

const FullpageHome = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		Splitting({ by: 'chars' });

		const lenis = new Lenis({ smooth: true });
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		// GSAP 애니메이션
		sectionTexts.forEach(section => {
			gsap.fromTo(
				`#${section.id} .char`,
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.05,
					duration: 1,
					scrollTrigger: {
						trigger: `#${section.id}`,
						start: 'top 70%',
						toggleActions: 'play none none reverse',
					},
				}
			);
		});

		return () => {
			lenis.destroy();
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, []);

	return (
		<div ref={containerRef}>
			{sectionTexts.map((section, i) => (
				<section key={i} id={section.id} className="page">
					<div className={`text text--${section.effect}`} data-splitting="chars">
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
