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
		const results = Splitting(); // 문자 분할
		console.log('Splitting 적용됨:', results); // 디버깅용

		ScrollOut({
			targets: '.word',
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});
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
