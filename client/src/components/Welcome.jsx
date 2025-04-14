import React, { useEffect } from 'react';
import gsap from 'gsap';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';

const Welcome = () => {
	useEffect(() => {
		Splitting({ target: '.typing-text', by: 'chars' });

		gsap.to('.typing-text .char', {
			opacity: 1,
			y: 0,
			stagger: 0.08,
			ease: 'power2.out',
			duration: 0.6,
			delay: 0.5,
		});

		gsap.to('.typing-text span', {
			opacity: 1,
			stagger: 1.2,
			delay: 0.4,
			ease: 'power1.out',
		});

		gsap.fromTo(
			'.scroll-indicator',
			{ y: 0 },
			{
				y: 10,
				repeat: -1,
				yoyo: true,
				ease: 'power1.inOut',
				duration: 1.2,
				delay: 2.5,
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
		<div className="container">
			<div className="moon">
				<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 1800 900">
					<defs>
						<clipPath id="clip-path" className="moon__svg-rects">
							{[0, 100, 200, 300, 400, 500, 600, 700].map((y, i) => (
								<rect key={i} y={y} width="1800" height="100" />
							))}
						</clipPath>
					</defs>

					<g clipPath="url(#clip-path)">
						<foreignObject width="100%" height="100%">
							<video autoPlay muted loop playsInline className="moon__video">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
					</g>

					<g className="moon__txt-bg" fill="#D5CEC6">
						{[300, 400, 500, 600, 700].map((y, i) => (
							<rect key={i} y={y} width="1800" height="100" />
						))}
					</g>

					<clipPath id="moon_txt-mask" className="moon__txt">
						<text x="100" y="320" fontSize="80">
							<tspan>DESIGNED & CRAFTED</tspan>
						</text>
						<text x="100" y="420" fontSize="80">
							<tspan>BY HYUNJIN.</tspan>
						</text>
						<text x="100" y="520" fontSize="80">
							<tspan>WELCOME TO MY</tspan>
						</text>
						<text x="100" y="620" fontSize="80">
							<tspan>PORTFOLIO SITE.</tspan>
						</text>
					</clipPath>

					<g clipPath="url(#moon_txt-mask)">
						<foreignObject width="100%" height="100%">
							<video autoPlay muted loop playsInline className="moon__video">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
						<rect className="moon__txt-overlay" width="100%" height="100%" />
					</g>
				</svg>
				<div className="text-animation-container">
					<h1 className="typing-text">
						<span>DESIGNED & CRAFTED</span>
						<span>BY HYUNJIN.</span>
						<span>WELCOME TO MY</span>
						<span>PORTFOLIO SITE.</span>
					</h1>
				</div>
				<div className="scroll-indicator">
					<svg className="scroll-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
			</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
