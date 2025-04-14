import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';

import InterestBubbleChart from './InterestBubbleChart';
import TravelMap from './TravelMap';
import Welcome from './Welcome';
import Introduction from './Introduction';

const sections = [
	{ id: 'welcome', class: 'one' },
	{ id: 'intro', class: 'two' },
	{ id: 'interest', class: 'three' },
	{ id: 'travel', class: 'four' },
];

const applyAnimationReset = el => {
	if (!el) return;
	const chars = el.querySelectorAll('.char');
	if (chars.length === 0) Splitting({ target: el, by: 'chars' });

	const updatedChars = el.querySelectorAll('.char');
	updatedChars.forEach(char => {
		char.style.animation = 'none';
		char.offsetHeight;
		char.style.animation = '';
	});
};

const FullPageReact = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname !== '/' && location.pathname !== '/home') return;

		const instance = new fullpage('#fullpage', {
			licenseKey: 'OGTN9-MB4LK-5YI08-4B2K9-KWMTM',
			autoScrolling: true,
			navigation: true,
			scrollOverflow: false,
			anchors: sections.map(s => s.id),
			afterLoad(origin, destination) {
				const h1 = destination.item.querySelector('[data-splitting]');

				// Splitting은 welcome 섹션 제외하고 적용
				if (destination.anchor !== 'welcome' && h1) {
					Splitting({ target: h1, by: 'chars' });
				}

				applyAnimationReset(h1);
			},
		});
		setTimeout(() => {
			const firstH1 = document.querySelector('#fullpage .section:first-child h1[data-splitting]');
			if (firstH1 && sections[0].id !== 'welcome') {
				Splitting({ target: firstH1, by: 'chars' });
			}
			applyAnimationReset(firstH1);
		}, 0);

		return () => instance.destroy('all');
	}, [location.pathname]);

	return (
		<div id="fullpage">
			{sections.map(s => (
				<div key={s.id} className={`section ${s.class}`}>
					{s.id === 'welcome' ? (
						<Welcome />
					) : s.id === 'intro' ? (
						<>
							<h1 className="text text--bubbling" data-splitting>
								INTRODUCTION
							</h1>
							<Introduction />
						</>
					) : s.id === 'interest' ? (
						<>
							<h1 className="text text--rolling" data-splitting>
								INTEREST
							</h1>
							<InterestBubbleChart />
						</>
					) : s.id === 'travel' ? (
						<>
							<h1 className="text text--swinging" data-splitting>
								TRAVEL
							</h1>
							<TravelMap />
						</>
					) : null}
				</div>
			))}
		</div>
	);
};

export default FullPageReact;
