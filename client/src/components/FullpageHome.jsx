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
		if (location.pathname === '/' || location.pathname === '/home') {
			// Splitting은 딱 1회만 적용
			setTimeout(() => {
				document.querySelectorAll('[data-splitting]').forEach(el => {
					Splitting({ target: el, by: 'chars' });
				});
			}, 100);

			const instance = new fullpage('#fullpage', {
				licenseKey: 'OGTN9-MB4LK-5YI08-4B2K9-KWMTM',
				autoScrolling: true,
				navigation: true,
				anchors: sections.map(s => s.id),
				afterLoad(origin, destination) {
					document.querySelectorAll('.section').forEach(section => section.setAttribute('data-scroll', 'out'));

					const current = destination.item;
					current.setAttribute('data-scroll', 'in');
				},
			});

			const firstSection = document.querySelector('.section');
			firstSection?.setAttribute('data-scroll', 'in');

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
