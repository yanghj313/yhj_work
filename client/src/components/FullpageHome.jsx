import React, { useEffect } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import Lenis from '@studio-freight/lenis';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage-style-full.scss';
import './fullpage.css';

const sectionTexts = [
	{ id: 'welcome', text: 'Welcome', effect: 'random' },
	{ id: 'intro', text: 'Introduction', effect: 'enter' },
	{ id: 'interest', text: 'Interest', effect: 'swapsies' },
	{ id: 'travel', text: 'Travel', effect: 'flipping' },
];

const FullpageHome = () => {
	useEffect(() => {
		Splitting();

		ScrollOut({
			targets: '.word',
			once: false,
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});

		// 🚀 부드러운 스크롤 적용
		const lenis = new Lenis({
			smooth: true,
			wheelMultiplier: 1.2,
			touchMultiplier: 1.5,
			gestureOrientation: 'vertical',
		});

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	}, []);

	return (
		<div className="fullpage-wrapper">
			{sectionTexts.map((section, index) => (
				<section key={index} id={section.id} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-scroll data-splitting="chars">
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
