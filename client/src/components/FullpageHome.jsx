import React, { useEffect } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage.css'; // 네가 올린 CSS 파일 경로
import './fullpage-style-full.scss';

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
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});
	}, []);

	return (
		<div className="container">
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
