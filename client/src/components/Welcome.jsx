import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../assets/css/fullpage.css';

const Welcome = () => {
	useEffect(() => {
		const rects = document.querySelectorAll('.clip-rect');
		gsap.fromTo(
			rects,
			{ scaleX: 0, transformOrigin: 'left' },
			{
				scaleX: 1,
				duration: 1.2,
				stagger: 0.1,
				ease: 'expo.out',
				delay: 0.5,
			}
		);

		gsap.fromTo(
			'.overlay-text span',
			{ opacity: 0, x: -50 },
			{
				opacity: 1,
				x: 0,
				stagger: 0.4,
				delay: 1.5,
				ease: 'power3.out',
			}
		);

		gsap.fromTo(
			'.scroll-indicator',
			{ y: 0 },
			{
				y: 10,
				repeat: -1,
				yoyo: true,
				ease: 'power1.inOut',
				duration: 1.2,
				delay: 3,
			}
		);

		const indicator = document.querySelector('.scroll-indicator');
		if (indicator) {
			indicator.addEventListener('click', () => {
				const nextSection = document.querySelector('#fullpage .section:nth-child(2)');
				if (nextSection) {
					nextSection.scrollIntoView({ behavior: 'smooth' });
				}
			});
		}
	}, []);

	return (
		<div className="welcome-wrapper">
			<svg className="svg-clip" viewBox="0 0 1800 900" preserveAspectRatio="xMidYMid slice">
				<defs>
					<clipPath id="clip-path">
						{[...Array(8)].map((_, i) => (
							<rect key={i} y={i * 112} width="1800" height="100" className="clip-rect" />
						))}
					</clipPath>
				</defs>
				<g clipPath="url(#clip-path)">
					<foreignObject width="100%" height="100%">
						<video autoPlay muted loop playsInline className="clipped-video">
							<source src="/video/main.mp4" type="video/mp4" />
						</video>
					</foreignObject>
				</g>
			</svg>

			<div className="overlay-text">
				<span>DESIGNED & CRAFTED</span>
				<span>BY HYUNJIN.</span>
				<span>WELCOME TO MY</span>
				<span>PORTFOLIO SITE.</span>
			</div>

			<div className="scroll-indicator">
				<svg className="scroll-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</div>
	);
};

export default Welcome;
