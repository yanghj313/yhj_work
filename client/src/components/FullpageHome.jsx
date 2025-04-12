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
	const lenisRef = useRef(null);
	const [index, setIndex] = useState(0);
	const isScrolling = useRef(false);

	useEffect(() => {
		Splitting(); // 문자 단위 쪼개기

		const lenis = new Lenis({
			duration: 1.2,
			easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smooth: true,
		});
		lenisRef.current = lenis;

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		const handleWheel = e => {
			e.preventDefault();
			if (isScrolling.current) return;
			isScrolling.current = true;

			const dir = e.deltaY > 0 ? 1 : -1;
			const next = Math.min(Math.max(index + dir, 0), sections.length - 1);

			if (next !== index) {
				setIndex(next);
				const target = document.getElementById(sections[next].id);
				lenis.scrollTo(target);

				// 텍스트 애니메이션
				gsap.from(`#${sections[next].id} .char`, {
					opacity: 0,
					y: 50,
					stagger: 0.03,
					duration: 0.6,
					ease: 'power3.out',
				});
			}

			setTimeout(() => {
				isScrolling.current = false;
			}, 1300); // 휠 딜레이
		};

		window.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			window.removeEventListener('wheel', handleWheel);
			lenis.destroy();
		};
	}, [index]);

	return (
		<div data-scroll-container>
			{sections.map(({ id, text }) => (
				<section key={id} id={id} className="page-section" data-scroll-section>
					<h1 className="split-text" data-splitting="chars">
						{text}
					</h1>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
