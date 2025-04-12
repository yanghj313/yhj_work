import React, { useEffect } from 'react';
import './fullpage.css';

const sections = [
	{ id: 'welcome', text: 'Welcome' },
	{ id: 'intro', text: 'Introduction' },
	{ id: 'interest', text: 'Interest' },
	{ id: 'travel', text: 'Travel' },
];

const ScrollMagicPage = () => {
	useEffect(() => {
		const scriptUrls = [
			'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.js',
			'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js',
		];

		const loadScripts = async () => {
			for (let url of scriptUrls) {
				await new Promise((resolve, reject) => {
					const script = document.createElement('script');
					script.src = url;
					script.onload = resolve;
					script.onerror = reject;
					document.body.appendChild(script);
				});
			}

			const controller = new window.ScrollMagic.Controller();
			const offset = window.innerHeight;
			const tl = new window.TimelineMax();

			for (let i = 1; i < sections.length; i++) {
				tl.from(`#${sections[i].id}`, 1, { xPercent: 100, ease: window.Linear.easeNone }, '+=1');
			}

			new window.ScrollMagic.Scene({
				triggerElement: '#pinMaster',
				triggerHook: 'onLeave',
				duration: `${(sections.length - 1) * 100}%`,
			})
				.setPin('#pinMaster')
				.setTween(tl)
				.addIndicators()
				.addTo(controller);

			// 각 섹션 텍스트 간단 등장 애니메이션 (SplitText 대체)
			sections.forEach((section, i) => {
				const tl2 = new window.TimelineMax();

				tl2.from(`#${section.id} h1`, 0.6, {
					opacity: 0,
					scale: 0.8,
					y: -60,
					ease: window.Power2.easeOut,
				});

				new window.ScrollMagic.Scene({
					triggerElement: `#${section.id}`,
					triggerHook: 0.8,
					offset: 0,
					reverse: true,
				})
					.setTween(tl2)
					.addIndicators()
					.addTo(controller);
			});
		};

		loadScripts();
	}, []);

	return (
		<div id="pinContainer">
			<div id="pinMaster">
				{sections.map((section, i) => (
					<section key={section.id} id={section.id} className={`panel ${['one', 'two', 'three', 'four', 'five', 'six'][i]}`}>
						<h1>{section.text}</h1>
					</section>
				))}
			</div>
		</div>
	);
};

export default ScrollMagicPage;
