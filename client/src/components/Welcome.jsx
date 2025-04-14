import React, { useEffect } from 'react';
import gsap from 'gsap';
import '../assets/css/fullpage.css';

const Welcome = () => {
	useEffect(() => {
		const rects = document.querySelectorAll('.graph-rect');
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
			'.welcome-text span',
			{ opacity: 0, y: 40 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.5,
				delay: 1.8,
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
				delay: 3.5,
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
			<div className="background-video">
				<video autoPlay muted loop playsInline>
					<source src="../../public/video/main.mp4" type="video/mp4" />
				</video>
			</div>

			<div className="svg-clip">
				{[...Array(8)].map((_, i) => (
					<div key={i} className="graph-rect" />
				))}
			</div>

			<div className="welcome-text">
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
