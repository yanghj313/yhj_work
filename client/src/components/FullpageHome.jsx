import React, { useEffect } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage.css'; // 네가 올린 CSS 파일 경로
import './fullpage-style-complete.scss';

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
		<div className="container">
			{sectionTexts.map((section, index) => (
				<section key={index} className="page" data-scroll-section>
					<div className={`text text--${section.effect} word`} data-splitting="chars" data-scroll>
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
