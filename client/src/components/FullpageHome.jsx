import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';

import Welcome from './Welcome';
import SkillMapSection from './SkillMapSection';
import TravelMap from './TravelMap';

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
			loopHorizontal: false,
			controlArrows: true,

			afterLoad(origin, destination) {
				const h1 = destination.item.querySelector('h1[data-splitting]');
				if (destination.anchor !== 'welcome' && h1) {
					Splitting({ target: h1, by: 'chars' });
					applyAnimationReset(h1);
				}
			},

			afterSlideLoad(section, origin, destination) {
				const h2 = destination.item.querySelector('h2[data-splitting]');
				if (h2) {
					Splitting({ target: h2, by: 'chars' });
					applyAnimationReset(h2);
				}

				// 🎯 마지막 슬라이드에서 아래로 스크롤 시 다음 섹션으로 이동
				const isLastSlide = section.anchor === 'intro' && destination.index === 2;
				if (isLastSlide) {
					const slideEl = destination.item;
					const onWheel = e => {
						if (e.deltaY > 0) {
							fullpage_api.moveSectionDown();
						}
					};
					slideEl.addEventListener('wheel', onWheel, { once: true });
				}
			},
		});

		setTimeout(() => {
			const firstH1 = document.querySelector('#fullpage .section:first-child h1[data-splitting]');
			if (firstH1 && sections[0].id !== 'welcome') {
				Splitting({ target: firstH1, by: 'chars' });
				applyAnimationReset(firstH1);
			}
		}, 0);

		return () => instance.destroy('all');
	}, [location.pathname]);

	return (
		<div id="fullpage">
			<div className="section one">
				<Welcome />
			</div>

			<div className="section two">
				<SkillMapSection />
			</div>

			<div className="section three">
				<h1 className="text text--rolling" data-splitting>
					INTEREST
				</h1>
				<InterestBubbleChart />
			</div>

			<div className="section four">
				<h1 className="text text--swinging" data-splitting>
					TRAVEL
				</h1>
				<TravelMap />
			</div>
		</div>
	);
};

export default FullPageReact;
