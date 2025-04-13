import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Splitting from 'splitting';
import 'splitting/dist/splitting.css';
import '../assets/css/fullpage.css';

const interests = [
	{
		name: 'Coding',
		value: 180,
		color: '#ff6b6b',
		image: 'https://picsum.photos/seed/coding/400/400',
	},
	{
		name: 'UI Design',
		value: 150,
		color: '#feca57',
		image: 'https://picsum.photos/seed/design/400/400',
	},
	{
		name: 'Movie',
		value: 80,
		color: '#48dbfb',
		image: 'https://picsum.photos/seed/movie/400/400',
	},
	{
		name: 'Book',
		value: 200,
		color: '#1dd1a1',
		image: 'https://picsum.photos/seed/book/400/400',
	},
	{
		name: 'Running',
		value: 140,
		color: '#5f27cd',
		image: 'https://picsum.photos/seed/running/400/400',
	},
	{
		name: 'Pilates',
		value: 170,
		color: '#341f97',
		image: 'https://picsum.photos/seed/pilates/400/400',
	},
	{
		name: 'Travel',
		value: 80,
		color: '#ee5253',
		image: 'https://picsum.photos/seed/travel/400/400',
	},
	{
		name: 'Stationery',
		value: 150,
		color: '#ff9ff3',
		image: 'https://picsum.photos/seed/stationery/400/400',
	},
	{
		name: 'Camera',
		value: 70,
		color: '#00d2d3',
		image: 'https://picsum.photos/seed/camera/400/400',
	},
	{
		name: 'Fashion',
		value: 80,
		color: '#576574',
		image: 'https://picsum.photos/seed/fashion/400/400',
	},
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 800, height: 550 });
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

		svg.select('defs')?.remove();
		const defs = svg.append('defs');

		// 각 버블마다 클리핑 경로 정의
		interests.forEach(d => {
			defs
				.append('clipPath')
				.attr('id', `clip-${d.name.replace(/\s+/g, '')}`)
				.append('circle')
				.attr('r', d.value / 2)
				.attr('cx', 0)
				.attr('cy', 0);
		});

		const simulation = d3
			.forceSimulation(interests)
			.force('x', d3.forceX(width / 2).strength(0.8))
			.force('y', d3.forceY(height / 2).strength(0.05))
			.force(
				'collision',
				d3.forceCollide().radius(d => d.value / 2 + 8)
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
					.attr('clip-path', d => `url(#clip-${d.name.replace(/\s+/g, '')})`)
					.attr('preserveAspectRatio', 'xMidYMid slice')
					.attr('xlink:href', d => d.image)
					.attr('width', d => d.value)
					.attr('height', d => d.value)
					.attr('x', d => -d.value / 2)
					.attr('y', d => -d.value / 2)
					.attr('opacity', 0.3)
					.style('transition', 'opacity 0.3s ease');
				g.append('text');
				return g;
			});

		node.call(drag(simulation));

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
			.style('font-size', d => Math.min(d.value / 6, 12));

		function ticked() {
			node.attr('transform', d => `translate(${Math.max(d.value / 2, Math.min(width - d.value / 2, d.x))},${Math.max(d.value / 2, Math.min(height - d.value / 2, d.y))})`);
		}

		function drag(simulation) {
			return d3
				.drag()
				.on('start', (event, d) => {
					if (!event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				})
				.on('drag', (event, d) => {
					d.fx = event.x;
					d.fy = event.y;
				})
				.on('end', (event, d) => {
					if (!event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				});
		}
	}, [dimensions, selected]);

	return (
		<div className={`interest-section ${boxVisible ? 'with-box' : ''}`}>
			<div className="bubble-chart">
				<svg ref={svgRef} className="img-chart"></svg>
			</div>

			<div className={`about_keyword ${boxVisible ? 'show' : ''}`}>
				{boxVisible && selected && (
					<div className="custom-description">
						<h2>{selected.name}</h2>
						<img src={selected.image} alt={selected.name} />
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
