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
			anchors: sections.map(s => s.id),
			afterLoad(origin, destination) {
				const current = destination.item;

				// 기존 splitting 제거 (재진입 대비)
				const prevSplits = current.querySelectorAll('.splitting');
				prevSplits.forEach(el => el.classList.remove('splitting'));

				// 다시 splitting 적용
				const h1 = current.querySelector('[data-splitting]');
				if (h1 && !h1.classList.contains('splitting')) {
					Splitting({ target: h1, by: 'chars' });
				}
			},
		});

		requestAnimationFrame(() => {
			const firstSection = document.querySelector('.section');
			const h1 = firstSection?.querySelector('[data-splitting]');
			if (h1 && !h1.classList.contains('splitting')) {
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
