// src/components/FullpageHome.jsx
import React, { useEffect } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage.css'; // 작성하신 CSS

const sectionTexts = [
	{ text: 'Welcome', effect: 'random' },
	{ text: 'Introduction', effect: 'enter' },
	{ text: 'Interest', effect: 'swapsies' },
	{ text: 'Travel', effect: 'flipping' },
];

const FullpageHome = () => {
	useEffect(() => {
		Splitting();
		ScrollOut({
			targets: '.word',
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});
	}, []);

	return (
		<>
			{sectionTexts.map((section, i) => (
				<section key={i} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-scroll data-splitting>
						{section.text}
					</div>
				</section>
			))}
		</>
	);
};

export default FullpageHome;
