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
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/SplitText.min.js',
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

			// 개별 텍스트 애니메이션
			sections.forEach((section, i) => {
				const target = document.querySelector(`#${section.id} h1`);
				const split = new window.SplitText(target, { type: 'chars' });
				const tl2 = new window.TimelineMax();

				tl2.staggerFrom(split.chars, 0.5, { opacity: 0, scale: 0.5, y: -100, ease: window.Bounce.easeOut }, 0.05);

				new window.ScrollMagic.Scene({
					triggerElement: '#pinMaster',
					triggerHook: 0,
					offset: i * offset,
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
