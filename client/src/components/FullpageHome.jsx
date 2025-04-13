import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';
import InterestBubbleChart from './InterestBubbleChart';

const sections = [
	{ id: 'welcome', text: 'Welcome', class: 'one', effect: 'text--folding' },
	{ id: 'intro', text: 'Introduction', class: 'two', effect: 'text--bubbling' },
	{ id: 'interest', text: 'Interest', class: 'three', effect: 'text--rolling' },
	{ id: 'travel', text: 'Travel', class: 'four', effect: 'text--swinging' },
];

const applyAnimationReset = el => {
	if (!el) return;

	const chars = el.querySelectorAll('.char');

	// ✅ 처음에는 splitting 적용
	if (chars.length === 0) {
		Splitting({ target: el, by: 'chars' });
	}

	// ✅ 이후 애니메이션만 재실행
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
				applyAnimationReset(h1);
			},
		});

		// 첫 섹션 애니메이션 실행
		setTimeout(() => {
			const firstH1 = document.querySelector('#fullpage .section:first-child h1[data-splitting]');
			applyAnimationReset(firstH1);
		}, 0);

		return () => instance.destroy('all');
	}, [location.pathname]);

	return (
		<div id="fullpage">
			{sections.map(s => (
				<div key={s.id} className={`section ${s.class}`}>
					{s.id === 'interest' ? (
						<InterestBubbleChart /> // ✅ Interest 섹션엔 이거 넣기
					) : (
						<h1 className={`text ${s.effect}`} data-splitting>
							{s.text}
						</h1>
					)}
				</div>
			))}
		</div>
	);
};

export default FullPageReact;
