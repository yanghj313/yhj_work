import React, { useEffect } from 'react';
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
	useEffect(() => {
		new fullpage('#fullpage', {
			autoScrolling: true,
			navigation: true,
			anchors: sections.map(s => s.id),
			scrollHorizontally: true,
		});

		return () => {
			fullpage.destroy('all');
		};
	}, []);

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
