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
			licenseKey: 'OGTN9-MB4LK-5YI08-4B2K9-KWMTM', // 'OPEN-SOURCE-GPLV3-USE' 무료용 키
			autoScrolling: true,
			navigation: true,
			anchors: sections.map(s => s.id),
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
