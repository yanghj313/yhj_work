import React, { useEffect, useRef } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './fullpage.css';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';

const sectionTexts = [
	{ text: 'Welcome', effect: 'random' },
	{ text: 'Introduction', effect: 'enter' },
	{ text: 'Interest', effect: 'swapsies' },
	{ text: 'Travel', effect: 'flipping' },
];

const FullpageHome = () => {
	const scrollRef = useRef(null);

	useEffect(() => {
		// 텍스트 스플리팅
		Splitting();

		// 스크롤 라이브러리 초기화
		const scroll = new LocomotiveScroll({
			el: scrollRef.current,
			smooth: true,
			lerp: 0.07,
		});

		// ScrollOut과 연결
		ScrollOut({
			targets: '.word',
			scrollingElement: scrollRef.current,
			onShown: el => el.setAttribute('data-scroll', 'in'),
			onHidden: el => el.setAttribute('data-scroll', 'out'),
		});

		return () => {
			scroll.destroy();
		};
	}, []);

	return (
		<div ref={scrollRef} data-scroll-container>
			{sectionTexts.map((section, i) => (
				<section
					key={i}
					className="panel section"
					data-scroll-section
					style={{
						minHeight: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div className={`text text--${section.effect} word`} data-scroll data-splitting>
						{section.text}
					</div>
				</section>
			))}
		</div>
	);
};

export default FullpageHome;
