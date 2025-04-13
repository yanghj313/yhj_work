import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css'; // Splitting 스타일 포함된 CSS

const sections = [
	{ id: 'welcome', text: 'Welcome', class: 'one', effect: 'text--folding' },
	{ id: 'intro', text: 'Introduction', class: 'two', effect: 'text--bubbling' },
	{ id: 'interest', text: 'Interest', class: 'three', effect: 'text--rolling' },
	{ id: 'travel', text: 'Travel', class: 'four', effect: 'text--swinging' },
];

const FullPageReact = () => {
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/' || location.pathname === '/home') {
			const instance = new fullpage('#fullpage', {
				licenseKey: 'OGTN9-MB4LK-5YI08-4B2K9-KWMTM',
				autoScrolling: true,
				navigation: true,
				anchors: sections.map(s => s.id),
				afterLoad: function (origin, destination) {
					document.querySelectorAll('.section').forEach(section => {
						section.setAttribute('data-scroll', 'out');
					});

					const current = destination.item;
					current.setAttribute('data-scroll', 'in');

					// Splitting 적용 (해당 섹션의 h1)
					const h1 = current.querySelector('[data-splitting]');
					if (h1) Splitting({ target: h1, by: 'chars' });
				},
			});

			// 첫 섹션 초기화
			const firstSection = document.querySelector('.section');
			firstSection?.setAttribute('data-scroll', 'in');
			Splitting({ target: firstSection.querySelector('[data-splitting]'), by: 'chars' });

			return () => {
				instance.destroy('all');
			};
		}
	}, [location.pathname]);

	return (
		<div id="fullpage">
			{sections.map(s => (
				<div key={s.id} className={`section ${s.class}`} data-scroll="out">
					<h1 className={`text ${s.effect}`} data-splitting>
						{s.text}
					</h1>
				</div>
			))}
		</div>
	);
};

export default FullPageReact;
