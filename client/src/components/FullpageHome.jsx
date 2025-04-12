import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage-style-full.scss';
import './fullpage.css';

const sectionTexts = [
	{ id: 'welcome', text: 'Welcome', effect: 'enter' },
	{ id: 'intro', text: 'Introduction', effect: 'flipping' },
	{ id: 'interest', text: 'Interest', effect: 'tumbling' },
	{ id: 'travel', text: 'Travel', effect: 'bulge' },
];

const FullpageHome = () => {
	const scrollRef = useRef();

	useEffect(() => {
		Splitting({ by: 'chars' });

		const timeout = setTimeout(() => {
			const scroll = new LocomotiveScroll({
				el: scrollRef.current,
				smooth: true,
			});

			return () => scroll.destroy();
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div data-scroll-container ref={scrollRef}>
			{sectionTexts.map((section, i) => (
				<section key={i} id={section.id} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-splitting="chars" data-scroll>
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
