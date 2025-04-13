import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

const interests = [
	{ name: '코딩', value: 80, color: '#ff6b6b' },
	{ name: 'UI/UX 디자인', value: 70, color: '#feca57' },
	{ name: '영화', value: 60, color: '#48dbfb' },
	{ name: '독서', value: 55, color: '#1dd1a1' },
	{ name: '러닝', value: 50, color: '#5f27cd' },
	{ name: '필라테스', value: 45, color: '#341f97' },
	{ name: '여행', value: 65, color: '#ee5253' },
	{ name: '다이어리 꾸미기', value: 40, color: '#ff9ff3' },
	{ name: '카메라', value: 50, color: '#00d2d3' },
	{ name: '패션', value: 60, color: '#576574' },
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				setDimensions({ width, height });
			}
		});
		if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const { width, height } = dimensions;

		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

		const simulation = d3
			.forceSimulation(interests)
			.force('x', d3.forceX(d => (selected && d.name === selected.name ? width * 0.3 : width / 2)).strength(0.2))
			.force('y', d3.forceY(height / 2).strength(0.1))
			.force(
				'collision',
				d3.forceCollide().radius(d => d.value / 2 + 4)
			)
			.alpha(1)
			.restart()
			.on('tick', ticked);

		const node = svg
			.selectAll('g')
			.data(interests, d => d.name)
			.join(enter => {
				const g = enter.append('g').style('cursor', 'pointer');
				g.append('circle');
				g.append('text');
				return g;
			});

		node.on('click', (event, d) => {
			setSelected(prev => (prev?.name === d.name ? null : d));
		});

		node
			.select('circle')
			.transition()
			.duration(300)
			.attr('r', d => d.value / 2)
			.attr('fill', d => (selected?.name === d.name ? d.color : '#bbb'))
			.attr('stroke', '#333')
			.attr('stroke-width', 1.5);

		node
			.select('text')
			.text(d => d.name)
			.attr('text-anchor', 'middle')
			.attr('dy', '.35em')
			.style('fill', '#fff')
			.style('font-size', d => Math.min(d.value / 5, 14));

		function ticked() {
			node.attr('transform', d => `translate(${Math.max(d.value / 2, Math.min(width - d.value / 2, d.x))},${Math.max(d.value / 2, Math.min(height - d.value / 2, d.y))})`);
		}
	}, [dimensions, selected]);

	useEffect(() => {
		const titleEl = document.querySelector('[data-splitting]');
		if (titleEl && !titleEl.classList.contains('splitting')) {
			Splitting({ target: titleEl, by: 'chars' });
		}
	}, []);

	const isMobile = dimensions.width <= 1024;

	return (
		<div ref={wrapperRef} className="bubble-chart" style={{ position: 'relative', width: '100%', height: '100%', padding: '2rem' }}>
			<h1 className={`text text--rolling`} data-splitting>
				Interest
			</h1>
			<svg ref={svgRef} style={{ display: 'block', margin: '0 auto' }}></svg>
			<div
				className="about_keyword"
				style={{
					position: isMobile ? 'relative' : 'absolute',
					top: isMobile ? '0' : '20%',
					right: isMobile ? 'auto' : selected ? '5%' : '-50%',
					margin: isMobile ? '2rem auto' : '0',
					width: isMobile ? '90%' : '300px',
					background: '#fff',
					padding: '1rem',
					boxShadow: '0 0 10px rgba(0,0,0,0.2)',
					borderRadius: '8px',
					transition: isMobile ? 'opacity 0.5s ease-in-out' : 'right 0.5s ease-in-out',
					opacity: selected ? 1 : 0,
					pointerEvents: selected ? 'auto' : 'none',
				}}
			>
				{selected && (
					<div className="custom-description">
						{selected.name === '코딩' && (
							<>
								<h2>코딩</h2>
								<p>프론트엔드와 백엔드를 넘나들며 개발하는 걸 좋아합니다. 주로 React와 Node.js를 사용해요.</p>
							</>
						)}
						{selected.name === 'UI/UX 디자인' && (
							<>
								<h2>UI/UX 디자인</h2>
								<p>사용자 흐름을 고려한 프로토타이핑과 시각 디자인을 좋아합니다.</p>
							</>
						)}
						{selected.name === '영화' && (
							<>
								<h2>영화</h2>
								<p>다큐멘터리부터 SF까지 다양한 장르를 즐기며 분석하는 걸 좋아해요.</p>
							</>
						)}
						{selected.name === '독서' && (
							<>
								<h2>독서</h2>
								<p>주로 자기계발서와 고전 문학을 즐깁니다. 글 쓰는 것도 좋아해요.</p>
							</>
						)}
						{selected.name === '러닝' && (
							<>
								<h2>러닝</h2>
								<p>자연 속에서 달리는 걸 즐기며 스트레스를 해소해요.</p>
							</>
						)}
						{selected.name === '필라테스' && (
							<>
								<h2>필라테스</h2>
								<p>균형 잡힌 몸과 자세 교정을 위해 주 2~3회 꾸준히 하고 있어요.</p>
							</>
						)}
						{selected.name === '여행' && (
							<>
								<h2>여행</h2>
								<p>풍경, 음식, 사람과의 만남에서 영감을 받아요.</p>
								<img src="/images/travel.jpg" alt="여행" style={{ width: '100%', borderRadius: '6px', marginTop: '1rem' }} />
							</>
						)}
						{selected.name === '다이어리 꾸미기' && (
							<>
								<h2>다이어리 꾸미기</h2>
								<p>스티커, 마스킹 테이프, 펜으로 일상을 예쁘게 기록하는 걸 즐겨요.</p>
							</>
						)}
						{selected.name === '카메라' && (
							<>
								<h2>카메라</h2>
								<p>여행지나 일상에서 순간을 포착하는 걸 좋아해요. 필름카메라도 써요.</p>
							</>
						)}
						{selected.name === '패션' && (
							<>
								<h2>패션</h2>
								<p>계절마다 나만의 스타일링을 연구하고 있어요.</p>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default InterestBubbleChart;
