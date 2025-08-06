import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const MOBILE_WIDTH = 736;
const MOBILE_CONFIG = {
	yMaskPositions: [90, 190, 290],
	viewBox: `0 0 ${MOBILE_WIDTH} 700`,
	scaleBase: { width: MOBILE_WIDTH, height: 700 },
	yTextPositions: [140, 240, 340],
	textLabels: ['HYUN', "JIN'S", 'WORK'],
};

const DESKTOP_CONFIG = {
	wArray: [726, 212, 676, 796],
	yMaskPositions: [30, 145, 260, 375, 490, 605],
	viewBox: `0 0 1800 740`,
	scaleBase: { width: 1800, height: 740 },
	yTextPositions: [260, 375, 490, 605],
};

const MobileLayout = () => {
	const { yMaskPositions, viewBox, scaleBase, yTextPositions, textLabels } = MOBILE_CONFIG;
	const textRefs = useRef([]);
	const rectRefs = useRef([]);

	useEffect(() => {
		textRefs.current.forEach((textEl, i) => {
			if (textEl) {
				const length = textEl.getComputedTextLength();
				const rect = rectRefs.current[i];
				if (rect) {
					rect.setAttribute('width', length);
					rect.style.transformOrigin = '0px 0px';
					rect.style.transformBox = 'fill-box';
				}
			}
		});

		gsap.set(rectRefs.current, { scaleX: 0 });

		const container = document.querySelector('.container');
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		const scaleFactor = Math.min(vw / scaleBase.width, vh / scaleBase.height);
		gsap.set(container, { scale: scaleFactor });
	}, []);

	return (
		<svg className="moon__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid slice">
			<defs>
				<clipPath id="clip-path" className="moon__svg-rects">
					{yMaskPositions.map((y, i) => (
						<rect key={i} x="0" y={y} width={MOBILE_WIDTH} height="110" />
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
				{yMaskPositions.map((y, i) => (
					<rect key={i} y={y} height="110" width="0" x="0" ref={el => (rectRefs.current[i] = el)} />
				))}
			</g>

			<g style={{ display: 'none' }}>
				{textLabels.map((text, i) => (
					<text key={i} x="30" y={yTextPositions[i]} fontSize="50" dominantBaseline="middle" textAnchor="start" ref={el => (textRefs.current[i] = el)}>
						<tspan>{text}</tspan>
					</text>
				))}
			</g>

			<clipPath id="moon_txt-mask" className="moon__txt">
				{textLabels.map((text, i) => (
					<text key={i} x="30" y={yTextPositions[i]} fontSize="50" dominantBaseline="middle" textAnchor="start">
						<tspan>{text}</tspan>
					</text>
				))}
			</clipPath>

			<g clipPath="url(#moon_txt-mask)">
				<foreignObject x="0" y="0" width={MOBILE_WIDTH} height="700">
					<video autoPlay muted loop playsInline preload="auto" className="moon__video" width={MOBILE_WIDTH} height="700">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
				<rect className="moon__txt-overlay" width={MOBILE_WIDTH} height="700" />
			</g>
		</svg>
	);
};

const DesktopLayout = () => {
	const { wArray, yMaskPositions, viewBox } = DESKTOP_CONFIG;

	useEffect(() => {
		gsap.set('.moon__txt-bg rect', {
			width: i => wArray[i] || 200,
			scaleX: 0,
		});
	}, []);

	return (
		<svg className="moon__svg" viewBox={viewBox}>
			<defs>
				<clipPath id="clip-path" className="moon__svg-rects">
					{yMaskPositions.map((y, i) => (
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
				<rect y="259" height="104" width="732" x="-2" />
				<rect y="374" height="104" width="218" x="-2" />
				<rect y="489" height="104" width="682" x="-2" />
				<rect y="604" height="104" width="802" x="-2" />
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
		const checkDevice = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');
		const wArray = DESKTOP_CONFIG.wArray;

		const tl = gsap.timeline({
			delay: 0.5,
			repeat: 0,
			defaults: { ease: 'expo.inOut', duration: 2 },
		});

		gsap.set(container, { autoAlpha: 0 });
		gsap.set(texts, { opacity: 0 });

		tl.to(container, { autoAlpha: 1, duration: 0.4 })
			.from('.container__base', { scaleX: 0, duration: 2, transformOrigin: 'top right' }, '+=0.1')
			.from('.moon__svg-rects rect', { scaleX: 0, stagger: 0.07, duration: 3, ease: 'expo' }, '-=1.5')
			.to('.moon__txt-bg rect', { stagger: 0.14, scaleX: 1 }, '-=2.2')
			.to(texts, { opacity: 1, ease: 'power4', stagger: 0.2 }, '-=1.5');

		gsap.set('.moon__txt-bg rect', {
			width: i => wArray[i] || 200,
			scaleX: 0,
		});

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
