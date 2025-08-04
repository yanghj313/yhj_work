import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const Welcome = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			setIsMobile(vw <= 1024);
			setIsTablet(vw > 1024 && vw <= 1200);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');

		// 1024px 이하와 웹에 따른 다른 width 배열
		const wArray = isMobile ? [400, 300, 350, 450] : [726, 212, 676, 796];

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

			if (isMobile) {
				// 1024px 이하: 상하좌우 꽉 찬 효과
				gsap.set(container, {
					scale: 1,
					width: '100vw',
					height: '100vh',
				});
			} else {
				// 1024px 초과: 원래 비율 유지
				const scaleFactor = Math.min(vw / 1800, vh / 740);
				gsap.set(container, {
					scale: scaleFactor,
					width: '100vw',
					height: '100vh',
				});
			}
		};

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', checkDevice);
			window.removeEventListener('resize', resize);
		};
	}, [isMobile, isTablet]);

	// 반응형 위치 계산
	const getResponsivePositions = () => {
		if (isMobile) {
			// 1024px 이하: 새로운 구조 - "HYUN JIN'S WORK"
			return {
				yMaskPositions: [30, 145, 260, 375, 490, 605],
				yTextPositions: [260, 375, 490, 605],
				textYPositions: [309, 424, 539, 654],
				rectPositions: [
					{ y: 259, height: 104, width: 400, x: -2 },
					{ y: 374, height: 104, width: 300, x: -2 },
					{ y: 489, height: 104, width: 350, x: -2 },
					{ y: 604, height: 104, width: 450, x: -2 },
				],
				texts: ['HYUN', "JIN'S", 'WORK'],
			};
		} else {
			// 1024px 초과: 원래 구조 - "DESIGNED BY HYUNJIN PORTFOLIO"
			return {
				yMaskPositions: [30, 145, 260, 375, 490, 605],
				yTextPositions: [260, 375, 490, 605],
				textYPositions: [309, 424, 539, 654],
				rectPositions: [
					{ y: 259, height: 104, width: 732, x: -2 },
					{ y: 374, height: 104, width: 218, x: -2 },
					{ y: 489, height: 104, width: 682, x: -2 },
					{ y: 604, height: 104, width: 802, x: -2 },
				],
				texts: ['DESIGNED', 'BY', 'HYUNJIN', 'PORTFOLIO'],
			};
		}
	};

	const { yMaskPositions, yTextPositions, textYPositions, rectPositions, texts } = getResponsivePositions();

	return (
		<div className="container">
			<div className="moon">
				<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 740" preserveAspectRatio="xMidYMid meet">
					<defs>
						<clipPath id="clip-path" className="moon__svg-rects">
							{yMaskPositions.map((y, i) => (
								<rect key={i} x="0" y={y} width="1800" height="100" />
							))}
						</clipPath>
					</defs>
					<g clipPath="url(#clip-path)">
						<foreignObject x="0" y="0" width="1800" height="740">
							<video autoPlay muted loop playsInline className="moon__video" width="100%" height="100%">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
					</g>
					<g className="moon__txt-bg" fill="#333" transform="translate(0 0)">
						{rectPositions.map((rect, i) => (
							<rect key={i} y={rect.y} height={rect.height} width={rect.width} x={rect.x} />
						))}
					</g>
					<clipPath id="moon_txt-mask" className="moon__txt">
						<text x="0" y={textYPositions[0]} dominantBaseline="middle">
							<tspan>{texts[0]}</tspan>
						</text>
						<text x="0" y={textYPositions[1]} dominantBaseline="middle">
							<tspan>{texts[1]}</tspan>
						</text>
						<text x="1" y={textYPositions[2]} dominantBaseline="middle">
							<tspan>{texts[2]}</tspan>
						</text>
						{texts[3] && (
							<text x="1" y={textYPositions[3]} dominantBaseline="middle">
								<tspan>{texts[3]}</tspan>
							</text>
						)}
					</clipPath>
					<g clipPath="url(#moon_txt-mask)">
						<foreignObject x="0" y="0" width="1800" height="740">
							<video autoPlay muted loop playsInline className="moon__video" width="100%" height="100%">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>
						</foreignObject>
						<rect className="moon__txt-overlay" width="1800" height="740" />
					</g>
				</svg>
			</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
