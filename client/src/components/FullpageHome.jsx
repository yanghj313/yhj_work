import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import fullpage from 'fullpage.js';
import 'fullpage.js/dist/fullpage.min.css';
import './fullpage.css';

const sections = [
	{ id: 'welcome', text: 'Welcome', class: 'one' },
	{ id: 'intro', text: 'Introduction', class: 'two' },
	{ id: 'interest', text: 'Interest', class: 'three' },
	{ id: 'travel', text: 'Travel', class: 'four' },
];

const FullPageReact = () => {
	const location = useLocation();

	useEffect(() => {
		// only run fullpage.js if on homepage
		if (location.pathname === '/' || location.pathname === '/home') {
			const instance = new fullpage('#fullpage', {
				autoScrolling: true,
				navigation: true,
				anchors: sections.map(s => s.id),
			});

			return () => {
				instance.destroy('all');
			};
		}
	}, [location.pathname]);

	return (
		<div id="fullpage">
			{sections.map(s => (
				<div key={s.id} className={`section ${s.class}`}>
					<h1>{s.text}</h1>
				</div>
			))}
		</div>
	);
};

export default FullPageReact;
