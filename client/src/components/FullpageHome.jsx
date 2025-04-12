import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
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
	const scrollRef = useRef();

	useEffect(() => {
		Splitting();

		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			lerp: 0.1,
		});

		return () => {
			scroll.destroy();
		};
	}, []);

	return (
		<div data-scroll-container ref={scrollRef}>
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
