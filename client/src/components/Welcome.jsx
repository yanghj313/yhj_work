import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../assets/css/welcome.css';

const BASE_WIDTH = 1600;
const BASE_HEIGHT = 740;
const MOBILE_BREAKPOINT = 768;

const Welcome = () => {
	const containerRef = useRef(null);

	const [viewportWidth, setViewportWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : BASE_WIDTH));

	const isMobile = viewportWidth <= MOBILE_BREAKPOINT;

	// 데스크톱은 1600px을 기준으로 전체 축소
	const scale = isMobile ? 1 : Math.min(viewportWidth / BASE_WIDTH, 1);

	const yMaskPositions = [30, 145, 260, 375, 490, 605];
	const wArray = [726, 212, 676, 796];

	/* =========================================
       브라우저 리사이즈 감지
    ========================================= */
	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	/* =========================================
       반응형 크기 설정
    ========================================= */
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		if (isMobile) {
			// 모바일에서 데스크톱 인라인 스타일 제거
			gsap.set(container, {
				clearProps: 'width,height,minWidth,maxWidth,minHeight,maxHeight,transform,scale,transformOrigin',
			});
		} else {
			// 기본 크기 유지 후 전체 비율 축소
			gsap.set(container, {
				width: BASE_WIDTH,
				minWidth: BASE_WIDTH,
				maxWidth: BASE_WIDTH,
				height: BASE_HEIGHT,
				minHeight: BASE_HEIGHT,
				maxHeight: BASE_HEIGHT,
				scale,
				transformOrigin: 'center center',
			});
		}
	}, [isMobile, scale]);

	/* =========================================
       GSAP 애니메이션
    ========================================= */
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let introTimeline;
		let waveTimeline;

		const ctx = gsap.context(() => {
			introTimeline = gsap.timeline({
				delay: 0.5,
				repeat: 0,
				defaults: {
					ease: 'expo.inOut',
					duration: 2,
				},
			});

			gsap.set(container, {
				autoAlpha: 0,
			});

			/* =====================================
               모바일 애니메이션
            ===================================== */
			if (isMobile) {
				gsap.set('.mobile-title-line', {
					opacity: 0,
					scale: 0.8,
				});

				gsap.set('.mobile-char', {
					opacity: 0,
					y: 30,
					rotationX: 90,
				});

				introTimeline
					.to(container, {
						autoAlpha: 1,
						duration: 0.4,
					})
					.to(
						'.mobile-title-line',
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

				// 글자가 부드럽게 움직이는 반복 효과
				waveTimeline = gsap.timeline({
					repeat: -1,
					repeatDelay: 2,
					paused: true,
				});

				waveTimeline
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

				// 등장 애니메이션이 완료되면 반복 시작
				introTimeline.eventCallback('onComplete', () => {
					waveTimeline.play();
				});
			} else {
				/* =====================================
                   데스크톱 애니메이션
                ===================================== */

				const texts = gsap.utils.toArray('.moon__txt text');

				gsap.set(texts, {
					opacity: 0,
				});

				gsap.set('.moon__txt-bg rect', {
					width: i => wArray[i] || 200,
					scaleX: 0,
					transformOrigin: 'left center',
				});

				introTimeline
					.to(container, {
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
			}
		}, container);

		/* =====================================
           클릭 시 애니메이션 재실행
        ===================================== */
		const handleClick = () => {
			if (waveTimeline) {
				waveTimeline.pause(0);
			}

			if (introTimeline) {
				introTimeline.restart();
			}
		};

		container.addEventListener('click', handleClick);

		/* =====================================
           이벤트 및 애니메이션 정리
        ===================================== */
		return () => {
			container.removeEventListener('click', handleClick);
			ctx.revert();
		};
	}, [isMobile]);

	/* =========================================
       JSX
    ========================================= */
	return (
		<div
			className="welcome-stage"
			style={{
				position: 'relative',
				width: '100%',
				height: isMobile ? '100vh' : `${BASE_HEIGHT * scale}px`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				background: '#333',
			}}
		>
			<div className="container" ref={containerRef}>
				<div className="moon">
					{isMobile ? (
						/* ===========================
                           모바일 레이아웃
                        =========================== */
						<div className="mobile-layout">
							<video autoPlay muted loop playsInline preload="auto" className="mobile-video">
								<source src="/video/main.mp4" type="video/mp4" />
							</video>

							<div className="mobile-overlay" />

							<div className="mobile-text">
								<h1 className="mobile-title">
									<span className="mobile-title-line">
										<span className="mobile-char">H</span>
										<span className="mobile-char">Y</span>
										<span className="mobile-char">U</span>
										<span className="mobile-char">N</span>
										<span className="mobile-char">{'\u00A0'}</span>
										<span className="mobile-char">J</span>
										<span className="mobile-char">I</span>
										<span className="mobile-char">N</span>
										<span className="mobile-char">'</span>
										<span className="mobile-char">S</span>
									</span>

									<br />

									<span className="mobile-title-line">
										<span className="mobile-char">W</span>
										<span className="mobile-char">O</span>
										<span className="mobile-char">R</span>
										<span className="mobile-char">K</span>
									</span>
								</h1>
							</div>
						</div>
					) : (
						/* ===========================
                           데스크톱 SVG 레이아웃
                        =========================== */
						<svg className="moon__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 740">
							<defs>
								{/* 영상 클리핑 마스크 */}
								<clipPath id="clip-path" className="moon__svg-rects">
									{yMaskPositions.map((y, i) => (
										<rect key={i} x="-2" y={y} width="1804" height="100" />
									))}
								</clipPath>

								{/* 텍스트 클리핑 마스크 */}
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

							{/* 클리핑된 배경 영상 */}
							<g clipPath="url(#clip-path)">
								<foreignObject x="0" y="0" width="1800" height="740">
									<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
										<source src="/video/main.mp4" type="video/mp4" />
									</video>
								</foreignObject>
							</g>

							{/* 텍스트 배경 */}
							<g className="moon__txt-bg" fill="#333" transform="translate(0 0)">
								<rect y="259" height="104" width="732" x="-2" />
								<rect y="374" height="104" width="218" x="-2" />
								<rect y="489" height="104" width="682" x="-2" />
								<rect y="604" height="104" width="802" x="-2" />
							</g>

							{/* 텍스트 모양으로 클리핑된 영상 */}
							<g clipPath="url(#moon_txt-mask)">
								<foreignObject x="0" y="0" width="1800" height="740">
									<video autoPlay muted loop playsInline className="moon__video" width="1800" height="740">
										<source src="/video/main.mp4" type="video/mp4" />
									</video>
								</foreignObject>

								{/* 반투명 흰색 오버레이 */}
								<rect className="moon__txt-overlay" width="1800" height="740" />
							</g>
						</svg>
					)}
				</div>

				<div className="container__base" />
			</div>
		</div>
	);
};

export default Welcome;
