import React, { useEffect } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import './fullpage.css';
import $ from 'jquery';

const svgPaths = [
	`M683,0v225c0,0,0.9,83.1,49.6,83.1c14.6,0,33.4,15,33.4,33.4v125.4v-16.7c0-50.8,41.3-92.2,92.1-92.2h16.7
   c18.5,0,33.2-14.7,33.2-33.2v-16.7c0-19.6,10-37.3,25-50.1v33h8.6c13.9,0,25.1,11.4,25.1,25.3l20.9,12.6c0,13.8-11.2,25.1-25.1,25.1
   h-20.9c-20.7,21-33.4,49.4-33.4,80.9l13.6,74.1h11.4c9.2,0,16.7,7,16.7,16h-46l-29.3-90.4c0,26.1-10.6,49.9-27.7,67l3.9,0.1
   c13.1,0,23.5,10.7,23.5,23.8l-100.5,0V525h0.5c-18.5,0-33.4-14.7-33.4-33.2l0-80.8c0-38.3-58,32.1-58,71.7c0,100.5,0,285.3,0,285.3`,

	`M683,0v236.3c0,0,2.7,25.7-15.3,32.4c-18,6.7-27.3-30.7-27.3-30.7s-52,22.7-56.3,65.7c0,0-44.8-19.1-91.7,7.7
   c0,0,3,31,43.3,22.7s53.7-7.7,53.7-7.7s23.7,44.2,1.3,54.3c-22.4,10.1-46,12-137-41.3c0,0-3.7,8.7-18,5c-14.3-3.7-8.3-20-8.3-20
   s-43.7-33.7-88-2s-36.3,79-16.7,103.3c19.7,24.3,50,42.3,63.7,42c0,0-33-1.3-54.3-26.3c0,0,18.7,62,86,69
   c67.3,7,116.7-13.7,134.7-29c0,0,58.7,7.7,58.3-8.3s-42.3-23.3-42.3-23.3s114.3,15.4,114.3,59s0,259.3,0,259.3`,

	`M683,0v178.7c0,0-6.8,106.3,126.9,107.1c45.9,0,84.1-8.2,114.4-24.5c11,0,35-21.9,72.1-65.7
   c6.7-23.1,22.3-34.6,46.7-34.6h6.3l12.1,1.7c6.9,9.6,13,14.4,18.2,14.4l31.4-2l1.4,2c0,23.6-6.1,38-18.4,43h-8.1l-8.1-2
   c-32.1,0-55.2,22.6-69.5,67.7c-3.1,33.4-7.8,55.8-14.1,67.2c-24.6,21.9-36.9,73.2-36.9,153.9v2c0,10.6,3.5,17.3,10.4,20.2H982
   l2.3,6.3c-2.1,3.8-4.2,5.8-6.3,5.8h-16.4c0,4.2-3.4,6.3-10.1,6.3c-16.3,0-24.5-10.2-24.5-30.6c0-3.3-2.8-6.6-8.4-10.1l-2.3-111
   c-4.8-3.8-10.3-5.8-16.4-5.8l-83.6-20.8c-15.6,0-27.2,2.8-34.9,8.4c-11.3,18.1-25.6,34.6-42.7,49.6c0,0-55.7,47.3-55.7,76
   c0,28.7,0,264.7,0,264.7`,

	`M683,0v218c0,0,11.1,95.9-127.1,107.3c0,0,7.9-55.8-29-56.3c0,0-10.8,4.9-9.7,25.7c0,0-45.1,6.6-71.4,17.4
   c-26.3,10.9-94.9,3.1-102.6-58.1c0,0,76.2,26.4,92.4-39.3c0,0-49.9-15.4-114.9,18s-58.9,47.6-54.5,52.4
   c4.4,4.7,18.4,15.5,32.6,14.4c0,0-9.5,29.6-7.3,42.7l-9.3,8c0,0-63.6,2.7-87.3,48.3c0,0,9,12.9,39.8-1s41.9-5.8,52.7-0.2
   c10.9,5.6,41.7,13.8,66.5-1.1c0,0,55.1,30.9,121.7-12c0,0,25.2,29.4,53.4,27.2c28.2-2.2,53-9.8,72.4,16.6
   c19.5,26.4,81.8,40,81.8,108s0,232,0,232`,

	`M683,0v209c0,0-2.3,65,45,100s67.9,44,98.8,44.3c30.9,0.3,53.2,6.7,85.2-44.7s33.7-125,65-140
   c0,0-10.5-8.1-4.6-11.9s63.9-14.8,66.9,15.9S1004,191,986.7,186c0,0-33.9,47.5-47,119s-44.5,157.3-78.4,187.3h-16.6
   c0,0,9-48.3-10.3-48.7c-19.3-0.3-12,48.7-12,48.7h-14.7c0,0-5.7-32.7-34.7-33c-29-0.3-60.4,10.7-72,17c-11.6,6.3-18,51-18,132.3
   s0,159.3,0,159.3`,
];

const sectionTexts = [
	{
		title: '👋 반갑습니다!',
		content: '프론트엔드 포트폴리오에 오신 걸 환영합니다.',
	},
	{
		title: '📁 주요 프로젝트',
		content: '개발했던 주요 프로젝트들을 소개합니다.',
	},
	{
		title: '🛠 사용 기술',
		content: 'React, CSS, JavaScript 등 다양한 기술 스택을 사용합니다.',
	},
	{
		title: '💼 업무 경험',
		content: '그동안의 커리어를 정리해놓았습니다.',
	},
	{
		title: '📷 갤러리',
		content: '프로젝트 관련 이미지나 자료들을 모아두었습니다.',
	},
];

const FullpageHome = () => {
	useEffect(() => {
		function drawSVGPathsInSection(sectionIndex) {
			const section = $('.fp-section').eq(sectionIndex);
			const paths = section.find('path').toArray();

			paths.forEach((el, i) => {
				const $el = $(el);
				const totalLength = el.getTotalLength();

				$el.css({
					strokeDashoffset: totalLength,
					strokeDasharray: `${totalLength} ${totalLength}`,
				});

				$el.animate({ strokeDashoffset: 0 }, { duration: 1200 + i * 300 });
			});
		}

		drawSVGPathsInSection(0);

		$(document).on('onScrollify', () => {
			const index = $('.fp-section.active').index();
			drawSVGPathsInSection(index);
		});
	}, []);

	return (
		<ReactFullpage
			scrollingSpeed={800}
			navigation
			anchors={['intro', 'projects', 'skills', 'experiences', 'gallery']}
			afterLoad={() => {
				$(document).trigger('onScrollify');
			}}
			render={() => (
				<ReactFullpage.Wrapper>
					{svgPaths.map((d, i) => (
						<div key={i} className={`section panel ${i === 0 ? 'active' : ''}`} style={{ backgroundColor: 'transparent' }}>
							<div className="svg-path">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1366 768" preserveAspectRatio="xMidYMid slice">
									<path d={d} />
								</svg>
							</div>
							<div className="content">
								<h2>{sectionTexts[i].title}</h2>
								<p>{sectionTexts[i].content}</p>
							</div>
						</div>
					))}
					<h1>Scroll</h1>
				</ReactFullpage.Wrapper>
			)}
		/>
	);
};

export default FullpageHome;
