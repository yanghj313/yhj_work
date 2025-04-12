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

		const scrollOut = ScrollOut({
			targets: '.word',
			once: false,
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});

		const lenis = new Lenis({
			smooth: true,
			gestureOrientation: 'vertical',
		});

		lenis.on('scroll', () => {
			scrollOut.update(); // 💡 Lenis가 스크롤할 때 ScrollOut에게 알림
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
