import React, { useLayoutEffect, useEffect, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const MOBILE_WIDTH = 736;
const MOBILE_CONFIG = {
	yMaskPositions: [0, 100, 200, 300, 400],
	viewBox: `0 0 ${MOBILE_WIDTH} 700`,
	scaleBase: { width: MOBILE_WIDTH, height: 700 },
};

const DESKTOP_CONFIG = {
	yMaskPositions: [30, 145, 260, 375, 490, 605],
	viewBox: `0 0 1800 740`,
	scaleBase: { width: 1800, height: 740 },
};

const useTextRects = () => {
	useLayoutEffect(() => {
		const padding = 40;

		const setRectWidths = () => {
			const rects = document.querySelectorAll('.moon__txt-bg rect');
			const texts = document.querySelectorAll('.moon__txt text');

			texts.forEach((text, i) => {
				const length = text.getComputedTextLength();
				const rect = rects[i];
				if (rect) {
					rect.setAttribute('width', length + padding);
				}
			});
			gsap.set('.moon__txt-bg rect', { scaleX: 0 });
		};

		// 폰트 렌더링까지 확실히 기다림
		setTimeout(() => {
			requestAnimationFrame(() => {
				if (document.fonts && document.fonts.ready) {
					document.fonts.ready.then(() => {
						setRectWidths();
					});
				} else {
					setRectWidths();
				}
			});
		}, 100);
	}, []);
};

const MobileLayout = () => {
	useTextRects();

	useLayoutEffect(() => {
		const container = document.querySelector('.container');
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const scaleFactor = Math.min(vw / MOBILE_CONFIG.scaleBase.width, vh / MOBILE_CONFIG.scaleBase.height);
		gsap.set(container, { scale: scaleFactor });
	}, []);

	return (
		<svg className="moon__svg" viewBox={MOBILE_CONFIG.viewBox} preserveAspectRatio={isMobile ? 'xMidYMid meet' : 'xMidYMid slice'}>
			<defs>
				<clipPath id="clip-path" className="moon__svg-rects">
					{MOBILE_CONFIG.yMaskPositions.map((y, i) => (
						<rect key={i} x="0" y={y} width={MOBILE_WIDTH} height="80" />
					))}
				</clipPath>
			</defs>

			<g clipPath="url(#clip-path)">
				<foreignObject x="0" y="0" width={MOBILE_WIDTH} height="700">
					<video autoPlay muted loop playsInline preload="auto" className="moon__video" width={MOBILE_WIDTH} height="700">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
			</g>

			<g className="moon__txt-bg" fill="#333">
				<rect y="90" height="110" x="0" />
				<rect y="190" height="110" x="0" />
				<rect y="290" height="110" x="0" />
			</g>

			<clipPath id="moon_txt-mask" className="moon__txt">
				<text x="30" y="140" fontSize="50" dominantBaseline="middle" textAnchor="start">
					<tspan>HYUN</tspan>
				</text>
				<text x="30" y="240" fontSize="50" dominantBaseline="middle" textAnchor="start">
					<tspan>JIN'S</tspan>
				</text>
				<text x="30" y="340" fontSize="50" dominantBaseline="middle" textAnchor="start">
					<tspan>WORK</tspan>
				</text>
			</clipPath>

			<g clipPath="url(#moon_txt-mask)">
				<foreignObject x="0" y="0" width={MOBILE_WIDTH} height="700">
					<video autoPlay muted loop playsInline className="moon__video" width={MOBILE_WIDTH} height="700">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
				<rect className="moon__txt-overlay" width={MOBILE_WIDTH} height="700" />
			</g>
		</svg>
	);
};

const DesktopLayout = () => {
	useTextRects();

	return (
		<svg className="moon__svg" viewBox={DESKTOP_CONFIG.viewBox}>
			<defs>
				<clipPath id="clip-path" className="moon__svg-rects">
					{DESKTOP_CONFIG.yMaskPositions.map((y, i) => (
						<rect key={i} x="0" y={y} width="1800" height="100" />
					))}
				</clipPath>
			</defs>

			<g clipPath="url(#clip-path)">
				<foreignObject x="0" y="0" width="1800" height="740">
					<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
			</g>

			<g className="moon__txt-bg" fill="#333">
				<rect y="259" height="104" x="0" />
				<rect y="374" height="104" x="0" />
				<rect y="489" height="104" x="0" />
				<rect y="604" height="104" x="0" />
			</g>

			<clipPath id="moon_txt-mask" className="moon__txt">
				<text x="0" y="309" dominantBaseline="middle">
					<tspan>DESIGNED</tspan>
				</text>
				<text x="0" y="424" dominantBaseline="middle">
					<tspan>BY</tspan>
				</text>
				<text x="1" y="539" dominantBaseline="middle">
					<tspan>HYUNJIN</tspan>
				</text>
				<text x="1" y="654" dominantBaseline="middle">
					<tspan>PORTFOLIO</tspan>
				</text>
			</clipPath>

			<g clipPath="url(#moon_txt-mask)">
				<foreignObject x="0" y="0" width="1800" height="740">
					<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
				<rect className="moon__txt-overlay" width="1800" height="740" />
			</g>
		</svg>
	);
};

const Welcome = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkDevice = () => setIsMobile(window.innerWidth <= 768);
		checkDevice();

		window.addEventListener('resize', checkDevice);

		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');

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

		tl.to(container, { autoAlpha: 1, duration: 0.4 })
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

		const resize = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;
			const base = isMobile ? MOBILE_CONFIG.scaleBase : DESKTOP_CONFIG.scaleBase;
			const scaleFactor = Math.min(vw / base.width, vh / base.height);
			gsap.set(container, { scale: scaleFactor });
		};

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', checkDevice);
			window.removeEventListener('resize', resize);
		};
	}, [isMobile]);

	return (
		<div className="container">
			<div className="moon">{isMobile ? <MobileLayout /> : <DesktopLayout />}</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
