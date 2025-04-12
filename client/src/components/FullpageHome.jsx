import React, { useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import './fullpage.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

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
			scrollingElement: '.fp-scroller',
		});
	}, []);

	return (
		<ReactFullpage
			scrollingSpeed={800}
			navigation
			anchors={['welcome', 'introduction', 'interest', 'travel']}
			render={() => (
				<ReactFullpage.Wrapper>
					{sectionTexts.map((section, i) => (
						<div key={i} className={`section panel ${i === 0 ? 'active' : ''}`} style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<div className={`text text--${section.effect} word`} data-scroll="out" data-splitting>
								{section.text}
							</div>
						</div>
					))}
				</ReactFullpage.Wrapper>
			)}
		/>
	);
};

export default FullpageHome;
