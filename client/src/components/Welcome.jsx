import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const Welcome = () => {
	useEffect(() => {
		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');
		const wArray = [1440, 240, 1290, 1640];

		const tl = gsap.timeline({
			delay: 0.5,
			repeat: 0,
			defaults: {
				ease: 'expo.inOut',
				duration: 2,
			},
		});

		gsap.set(container, { autoAlpha: 0 });
		gsap.set(texts, { opacity: 0 });

		tl.to(container, {
			autoAlpha: 1,
			duration: 0.4,
		})
			.from(
				'.container__base',
				{
					scaleX: 0,
					duration: 2,
					transformOrigin: 'top right',
				},
				'+=0.1'
			)
			.from(
				'.moon__svg-rects rect',
				{
					scaleX: 0,
					stagger: 0.07,
					duration: 3,
					ease: 'expo',
				},
				'-=1.5'
			)
			.to(
				'.moon__txt-bg rect',
				{
					stagger: 0.14,
					scaleX: 1,
				},
				'-=2.2'
			)
			.to(
				texts,
				{
					opacity: 1,
					ease: 'power4',
					stagger: 0.2,
				},
				'-=1.5'
			);

		gsap.set('.moon__txt-bg rect', {
			width: i => wArray[i] || 200,
			scaleX: 0,
		});

		container.onclick = () => {
			tl.restart();
		};

		const resize = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const scaleFactor = Math.min(vw / 1800, vh / 900);
			gsap.set(container, { scale: scaleFactor });
		};

		window.onresize = resize;
		resize();
	}, []);

	return (
		<div className="container">
			<div className="moon">
				<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1800 900">
					<defs>
						<clipPath id="clip-path" className="moon__svg-rects">
							{[...Array(8)].map((_, i) => (
								<rect key={i} x="0" y={i * 110} width="1680" height="100" />
							))}
						</clipPath>
					</defs>
					<g clipPath="url(#clip-path)">
						<foreignObject x="0" y="0" width="1800" height="900">
							<video autoPlay muted loop playsInline className="moon__video" width="1800" height="900">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
					</g>
					<g className="moon__txt-bg" fill="#D5CEC6" transform="translate(60 0)">
						<rect y="305" height="100" width="1440" />
						<rect y="435" height="100" width="240" />
						<rect y="565" height="100" width="1290" />
						<rect y="695" height="100" width="1640" />
					</g>
					<clipPath id="moon_txt-mask" className="moon__txt" transform="translate(60 0)">
						<text x="0" y="355">
							<tspan>DESIGNED</tspan>
						</text>
						<text x="0" y="485">
							<tspan>BY</tspan>
						</text>
						<text x="1" y="615">
							<tspan>HYUNJIN</tspan>
						</text>
						<text x="1" y="745">
							<tspan>PORTFOLIO</tspan>
						</text>
					</clipPath>
					<g clipPath="url(#moon_txt-mask)">
						<foreignObject x="0" y="0" width="1800" height="900">
							<video autoPlay muted loop playsInline className="moon__video" width="1800" height="900">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
						<rect className="moon__txt-overlay" width="1800" height="900" />
					</g>
				</svg>
			</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
