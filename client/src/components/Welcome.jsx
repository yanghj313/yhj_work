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
			setIsMobile(vw <= 768);
			setIsTablet(vw > 768 && vw <= 1024);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');

		// 모든 디바이스에서 동일한 width 배열 사용
		const wArray = [726, 212, 676, 796];

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

			// 모든 디바이스에서 전체 화면을 사용하되, 비율은 유지
			if (isMobile) {
				gsap.set(container, {
					scale: 1,
					width: '100vw',
					height: '100vh',
				});
			} else if (isTablet) {
				gsap.set(container, {
					scale: 1,
					width: '100vw',
					height: '100vh',
				});
			} else {
				// 데스크톱에서는 화면 크기에 따라 적응
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

	// 모든 디바이스에서 동일한 위치 계산 사용
	const getResponsivePositions = () => {
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
		};
	};

	const { yMaskPositions, yTextPositions, textYPositions, rectPositions } = getResponsivePositions();

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
							<tspan>DESIGNED</tspan>
						</text>
						<text x="0" y={textYPositions[1]} dominantBaseline="middle">
							<tspan>BY</tspan>
						</text>
						<text x="1" y={textYPositions[2]} dominantBaseline="middle">
							<tspan>HYUNJIN</tspan>
						</text>
						<text x="1" y={textYPositions[3]} dominantBaseline="middle">
							<tspan>PORTFOLIO</tspan>
						</text>
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
