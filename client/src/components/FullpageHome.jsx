import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Splitting from 'splitting';

import 'splitting/dist/splitting.css';
import './fullpage.css';

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
		const lenis = new Lenis({
			smooth: true,
			duration: 1.2,
			wheelMultiplier: 1.2,
			easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		lenis.on('scroll', ScrollTrigger.update);
		gsap.ticker.add(time => lenis.raf(time * 1000));
		gsap.ticker.lagSmoothing(0);

		// Snap to full page
		ScrollTrigger.defaults({
			scroller: scrollRef.current,
			snap: 1 / (sections.length - 1),
		});

		ScrollTrigger.refresh();

		return () => {
			lenis.destroy();
		};
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container>
			{sections.map((title, i) => (
				<section key={i} className="page-section" id={`section-${i}`}>
					<h1>{title}</h1>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
