import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const Welcome = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			const vw = window.innerWidth;
			setIsMobile(vw <= 768);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		const container = document.querySelector('.container');
		const texts = document.querySelectorAll('text');
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
			const scaleFactor = Math.min(vw / 1800, vh / 740);
			gsap.set(container, { scale: scaleFactor });
		};

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', checkDevice);
			window.removeEventListener('resize', resize);
		};
	}, [isMobile]);

	const yMaskPositions = [30, 145, 260, 375, 490, 605];
	const yTextPositions = [260, 375, 490, 605];

	return (
		<div className="container">
			<div className="moon">
				{isMobile ? (
					// 모바일: 새로운 구조 (여기에 원하는 레이아웃을 구현하세요)
					<div className="mobile-layout">
						{/* 여기에 모바일용 새로운 레이아웃을 구현하세요 */}
						<div className="mobile-content">
							<h1>HYUN JIN'S WORK</h1>
							{/* 원하는 구조로 자유롭게 구현하세요 */}
						</div>
					</div>
				) : (
					// 데스크톱: 원래 구조 + 텍스트 클리핑 마스크
					<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 740">
						<defs>
							<clipPath id="clip-path" className="moon__svg-rects">
								{yMaskPositions.map((y, i) => (
									<rect key={i} x="0" y={y} width="1800" height="100" />
								))}
							</clipPath>
							{/* 텍스트 클리핑 마스크 추가 */}
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
						</defs>
						<g clipPath="url(#clip-path)">
							<foreignObject x="0" y="0" width="1800" height="740">
								<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
									<source src="/video/main.mp4" type="video/mp4" />
								</video>
							</foreignObject>
						</g>
						<g className="moon__txt-bg" fill="#333" transform="translate(0 0)">
							<rect y="259" height="104" width="732" x="-2" />
							<rect y="374" height="104" width="218" x="-2" />
							<rect y="489" height="104" width="682" x="-2" />
							<rect y="604" height="104" width="802" x="-2" />
						</g>
						{/* 텍스트 모양으로 클리핑된 비디오 */}
						<g clipPath="url(#moon_txt-mask)">
							<foreignObject x="0" y="0" width="1800" height="740">
								<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
									<source src="/video/main.mp4" type="video/mp4" />
								</video>
							</foreignObject>
						</g>
					</svg>
				)}
			</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
