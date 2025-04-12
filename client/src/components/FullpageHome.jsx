// src/components/FullpageHome.jsx
import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage.css';

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
		const so = ScrollOut({
			targets: '.word',
			onShown: el => {
				el.setAttribute('data-scroll', 'in');
				console.log('shown:', el);
			},
			onHidden: el => {
				el.setAttribute('data-scroll', 'out');
				console.log('hidden:', el);
			},
		});

		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			lerp: 0.07,
		});

		return () => {
			scroll.destroy();
			so.teardown(); // scrollOut 해제
		};
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container className="container">
			{sectionTexts.map((section, i) => (
				<section key={i} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-scroll data-splitting>
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
