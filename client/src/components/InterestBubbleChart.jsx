import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';

const interests = [
	{ name: '코딩', value: 80, color: '#ff6b6b', image: '/images/code.jpg' },
	{ name: 'UI/UX 디자인', value: 70, color: '#feca57', image: '/images/design.jpg' },
	{ name: '영화', value: 60, color: '#48dbfb', image: '/images/movie.jpg' },
	{ name: '독서', value: 55, color: '#1dd1a1', image: '/images/book.jpg' },
	{ name: '러닝', value: 50, color: '#5f27cd', image: '/images/run.jpg' },
	{ name: '필라테스', value: 45, color: '#341f97', image: '/images/pilates.jpg' },
	{ name: '여행', value: 65, color: '#ee5253', image: '/images/travel.jpg' },
	{ name: '다이어리 꾸미기', value: 40, color: '#ff9ff3', image: '/images/diary.jpg' },
	{ name: '카메라', value: 50, color: '#00d2d3', image: '/images/camera.jpg' },
	{ name: '패션', value: 60, color: '#576574', image: '/images/fashion.jpg' },
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
	const [selected, setSelected] = useState(null);
	const [boxVisible, setBoxVisible] = useState(false);

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

		const svg = d3
			.select(svgRef.current)
			.attr('width', width)
			.attr('height', height)
			.style('transform', selected ? 'translateX(-120px)' : 'translateX(0)')
			.style('transition', 'transform 0.5s ease');

		const simulation = d3
			.forceSimulation(interests)
			.force('x', d3.forceX(width / 2).strength(0.2))
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
				g.append('image')
					.attr('clip-path', 'circle')
					.attr('xlink:href', d => d.image)
					.attr('width', d => d.value)
					.attr('height', d => d.value)
					.attr('x', d => -d.value / 2)
					.attr('y', d => -d.value / 2)
					.attr('opacity', 0.3)
					.attr('style', 'transition: opacity 0.3s ease');
				g.append('text');
				return g;
			});

		node.on('click', (event, d) => {
			const isSame = selected?.name === d.name;
			if (!isSame) setBoxVisible(false);
			setTimeout(() => {
				setSelected(isSame ? null : d);
				setBoxVisible(!isSame);
			}, 100);
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
			.select('image')
			.transition()
			.duration(300)
			.attr('opacity', d => (selected?.name === d.name ? 1 : 0.3));

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
				className={`about_keyword ${boxVisible ? 'show' : ''}`}
				style={{
					position: isMobile ? 'relative' : 'absolute',
					top: isMobile ? '0' : '20%',
					right: isMobile ? 'auto' : '5%',
					margin: isMobile ? '2rem auto' : '0',
					width: isMobile ? '90%' : '300px',
					background: '#fff',
					padding: '1rem',
					boxShadow: '0 0 10px rgba(0,0,0,0.2)',
					borderRadius: '8px',
					transform: boxVisible ? 'translateY(0)' : 'translateY(50px)',
					opacity: boxVisible ? 1 : 0,
					transition: 'all 0.5s ease',
					pointerEvents: boxVisible ? 'auto' : 'none',
				}}
			>
				{boxVisible && selected && (
					<div className="custom-description">
						<h2>{selected.name}</h2>
						<img src={selected.image} alt={selected.name} style={{ width: '100%', borderRadius: '6px', marginBottom: '1rem', transition: 'opacity 0.5s ease' }} />
						{selected.name === '코딩' && <p>프론트엔드와 백엔드 전반에 관심이 많고, 주로 React와 Node.js를 다룹니다.</p>}
						{selected.name === 'UI/UX 디자인' && <p>프로토타입 제작과 사용자 흐름을 고려한 인터페이스를 설계합니다.</p>}
						{selected.name === '영화' && <p>감성과 스토리 중심의 영화 감상을 즐기며, 감독의 연출력에 집중합니다.</p>}
						{selected.name === '독서' && <p>자기계발서, 인문학, 고전소설 등 폭넓은 장르를 읽습니다.</p>}
						{selected.name === '러닝' && <p>아침 러닝으로 하루를 시작하며 체력과 멘탈을 관리합니다.</p>}
						{selected.name === '필라테스' && <p>균형과 유연성을 위해 꾸준히 수련하며 자세 교정에 집중합니다.</p>}
						{selected.name === '여행' && <p>자연, 문화, 사람을 경험하며 기록하는 것을 좋아합니다.</p>}
						{selected.name === '다이어리 꾸미기' && <p>마스킹 테이프, 펜, 스티커로 감성적인 기록을 남깁니다.</p>}
						{selected.name === '카메라' && <p>필름카메라와 디지털을 넘나들며 풍경과 일상을 담습니다.</p>}
						{selected.name === '패션' && <p>계절별 스타일링과 트렌드를 연구하며 자신만의 룩을 만듭니다.</p>}
					</div>
				)}
			</div>
		</div>
	);
};

export default InterestBubbleChart;
