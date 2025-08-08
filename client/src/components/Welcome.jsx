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

		// 모바일과 데스크톱 애니메이션 분리
		if (isMobile) {
			// 모바일 애니메이션
			gsap.set(container, { autoAlpha: 0 });
			gsap.set('.mobile-title-line::before', { opacity: 0, scale: 0.8 });
			gsap.set('.mobile-title-line::after', { opacity: 0, scale: 0.8 });
			gsap.set('.mobile-char', { opacity: 0, y: 30, rotationX: 90 });

			// 원형 테두리 애니메이션
			tl.to(container, { autoAlpha: 1, duration: 0.4 })
				.to(
					'.mobile-title-line::before',
					{
						opacity: 1,
						scale: 1,
						duration: 1.5,
						ease: 'power2.out',
						stagger: 0.3,
					},
					'+=0.2'
				)
				.to(
					'.mobile-title-line::after',
					{
						opacity: 1,
						scale: 1,
						duration: 0.8,
						ease: 'power2.out',
						stagger: 0.3,
					},
					'-=0.5'
				)
				.to(
					'.mobile-char',
					{
						opacity: 1,
						y: 0,
						rotationX: 0,
						duration: 1.2,
						ease: 'power3.out',
						stagger: 0.1,
					},
					'-=0.3'
				);

			// 반복되는 파도 애니메이션
			const waveAnimation = () => {
				gsap
					.timeline({ repeat: -1, repeatDelay: 2 })
					.to('.mobile-char', {
						y: -3,
						duration: 0.3,
						ease: 'power2.out',
						stagger: 0.05,
					})
					.to(
						'.mobile-char',
						{
							y: 0,
							duration: 0.3,
							ease: 'power2.in',
							stagger: 0.05,
						},
						'-=0.2'
					);
			};

			// 첫 번째 애니메이션이 끝난 후 반복 애니메이션 시작
			setTimeout(waveAnimation, 4000);
		} else {
			// 데스크톱 애니메이션
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
		}

		container.onclick = () => {
			tl.restart();
		};

		const resize = () => {
			const vw = window.innerWidth;
			const vh = window.innerHeight;

			if (isMobile) {
				// 모바일에서는 transform 완전 제거
				gsap.set(container, {
					scale: 1,
					transform: 'none',
					width: '100vw',
					height: '100vh',
				});
				// CSS 스타일 직접 적용
				container.style.transform = 'none';
				container.style.scale = '1';
				container.style.width = '100vw';
				container.style.height = '100vh';
			} else {
				// 데스크톱에서만 스케일링 적용
				const scaleFactor = Math.min(vw / 1800, vh / 740);
				gsap.set(container, { scale: scaleFactor });
			}
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
					// 모바일: 동영상 배경 + 캐릭터 애니메이션
					<div className="mobile-layout">
						<video autoPlay muted loop playsInline preload="auto" className="mobile-video">
							<source src="/video/main.mp4" type="video/mp4" />
						</video>
						<div className="mobile-overlay"></div>
						<div className="mobile-text">
							<h1 className="mobile-title">
								<div className="mobile-title-line">
									<span className="mobile-char">H</span>
									<span className="mobile-char">Y</span>
									<span className="mobile-char">U</span>
									<span className="mobile-char">N</span>
									<span className="mobile-char">&nbsp;</span>
									<span className="mobile-char">J</span>
									<span className="mobile-char">I</span>
									<span className="mobile-char">N</span>
									<span className="mobile-char">'</span>
									<span className="mobile-char">S</span>
								</div>
								<br />
								<div className="mobile-title-line">
									<span className="mobile-char">W</span>
									<span className="mobile-char">O</span>
									<span className="mobile-char">R</span>
									<span className="mobile-char">K</span>
								</div>
							</h1>
						</div>
					</div>
				) : (
					// 데스크톱: 원래 구조 + 텍스트 클리핑 마스크
					<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 740">
						<defs>
							<clipPath id="clip-path" className="moon__svg-rects">
								{yMaskPositions.map((y, i) => (
									<rect key={i} x="-2" y={y} width="1804" height="100" />
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
							{/* 반투명 흰색 오버레이 추가 */}
							<rect className="moon__txt-overlay" width="1800" height="740" />
						</g>
					</svg>
				)}
			</div>
			<div className="container__base"></div>
		</div>
	);
};

export default Welcome;
