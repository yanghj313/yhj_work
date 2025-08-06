import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const MOBILE_CONFIG = {
	wArray: [320, 240, 360],
	yMaskPositions: [0, 100, 200, 300, 400],
	viewBox: '0 0 736 750',
	scaleBase: { width: 736, height: 750 },
	yTextPositions: [160, 260, 360],
};

const DESKTOP_CONFIG = {
	wArray: [726, 212, 676, 796],
	yMaskPositions: [30, 145, 260, 375, 490, 605],
	viewBox: '0 0 1800 740',
	scaleBase: { width: 1800, height: 740 },
	yTextPositions: [260, 375, 490, 605],
};

const MobileLayout = () => {
	const { wArray, yMaskPositions, viewBox, scaleBase } = MOBILE_CONFIG;

	useEffect(() => {
		gsap.set('.moon__txt-bg rect', {
			width: i => wArray[i] || 200,
			scaleX: 0,
		});

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
						<rect key={i} x="0" y={y} width="768" height="80" />
					))}
				</clipPath>
			</defs>

			<g clipPath="url(#clip-path)">
				<foreignObject x="0" y="0" width="736" height="750">
					<video autoPlay muted loop playsInline className="moon__video" width="736" height="750">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
			</g>

			<g className="moon__txt-bg" fill="#333">
				<rect y="90" height="110" width="320" x="0" />
				<rect y="190" height="110" width="240" x="0" />
				<rect y="290" height="110" width="360" x="0" />
			</g>

			<clipPath id="moon_txt-mask" className="moon__txt">
				<text x="0" y="140" fontSize="48" dominantBaseline="middle">
					<tspan>HYUN</tspan>
				</text>
				<text x="0" y="240" fontSize="48" dominantBaseline="middle">
					<tspan>JIN'S</tspan>
				</text>
				<text x="0" y="340" fontSize="48" dominantBaseline="middle">
					<tspan>WORK</tspan>
				</text>
			</clipPath>

			<g clipPath="url(#moon_txt-mask)">
				<foreignObject x="0" y="0" width="736" height="750">
					<video autoPlay muted loop playsInline className="moon__video" width="736" height="750">
						<source src="/video/main.mp4" type="video/mp4" />
					</video>
				</foreignObject>
				<rect className="moon__txt-overlay" width="736" height="750" />
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
