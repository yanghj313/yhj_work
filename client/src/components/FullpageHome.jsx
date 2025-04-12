import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './fullpage-effects.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

const sectionTexts = [
	{ text: 'Welcome', effect: 'random' },
	{ text: 'Introduction', effect: 'enter' },
	{ text: 'Interest', effect: 'swapsies' },
	{ text: 'Travel', effect: 'flipping' },
];

const FullpageHome = () => {
	const scrollRef = useRef(null);

	useEffect(() => {
		Splitting();
		ScrollOut({ targets: '.word' });

		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			lerp: 0.07,
		});

		return () => scroll.destroy();
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container>
			{sectionTexts.map((section, i) => (
				<section key={i} className={`panel section`} style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }} data-scroll-section>
					<div className={`text text--${section.effect} word`} data-scroll data-splitting>
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
