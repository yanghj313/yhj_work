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
				const current = destination.item;
				const h1 = current.querySelector('[data-splitting]');
				if (!h1) return;

				// 기존 Splitting span 제거
				h1.innerHTML = h1.innerText;

				// 다시 Splitting 적용
				Splitting({ target: h1, by: 'chars' });

				// 애니메이션 강제 재실행
				const chars = h1.querySelectorAll('.char');
				chars.forEach(char => {
					char.style.animation = 'none';
					char.offsetHeight; // 강제 리플로우
					char.style.animation = '';
				});
			},
		});

		// 초기 첫 섹션에 Splitting 적용
		requestAnimationFrame(() => {
			const firstSection = document.querySelector('.section');
			const h1 = firstSection?.querySelector('[data-splitting]');
			if (h1) {
				h1.innerHTML = h1.innerText;
				Splitting({ target: h1, by: 'chars' });
			}
		});

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
