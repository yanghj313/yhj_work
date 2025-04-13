import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';

const sections = [
	{ id: 'welcome', text: 'Welcome', class: 'one', effect: 'text--folding' },
	{ id: 'intro', text: 'Introduction', class: 'two', effect: 'text--bubbling' },
	{ id: 'interest', text: 'Interest', class: 'three', effect: 'text--rolling' },
	{ id: 'travel', text: 'Travel', class: 'four', effect: 'text--swinging' },
];

const applySplittingWithReset = el => {
	if (!el) return;

	// 기존 애니메이션 span 제거
	el.innerHTML = el.innerText;

	// Splitting 적용
	Splitting({ target: el, by: 'chars' });

	// animation 재실행 강제 트리거
	const chars = el.querySelectorAll('.char');
	chars.forEach(char => {
		char.style.animation = 'none';
		char.offsetHeight; // 리플로우
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
				applySplittingWithReset(h1); // ✅ 효과 재적용
			},
		});

		// 첫 섹션에도 효과 적용
		setTimeout(() => {
			const firstSection = document.querySelector('.section');
			const h1 = firstSection?.querySelector('[data-splitting]');
			applySplittingWithReset(h1);
		}, 10); // 약간 지연 줘야 첫 로딩시 적용됨

		return () => instance.destroy('all');
	}, [location.pathname]);

	return (
		<div id="fullpage">
			{sections.map(s => (
				<div key={s.id} className={`section ${s.class}`}>
					<h1 className={`text ${s.effect}`} data-splitting>
						{s.text}
					</h1>
				</div>
			))}
		</div>
	);
};

export default FullPageReact;
