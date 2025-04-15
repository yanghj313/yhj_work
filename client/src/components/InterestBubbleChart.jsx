import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../assets/css/fullpage.css';

const interests = [
	{ name: 'Coding', value: 180, color: '#ff6b6b', image: 'https://picsum.photos/seed/coding/400/400' },
	{ name: 'UI Design', value: 150, color: '#feca57', image: 'https://picsum.photos/seed/design/400/400' },
	{ name: 'Movie', value: 80, color: '#48dbfb', image: 'https://picsum.photos/seed/movie/400/400' },
	{ name: 'Book', value: 200, color: '#1dd1a1', image: 'https://picsum.photos/seed/book/400/400' },
	{ name: 'Running', value: 140, color: '#5f27cd', image: 'https://picsum.photos/seed/running/400/400' },
	{ name: 'Pilates', value: 170, color: '#341f97', image: 'https://picsum.photos/seed/pilates/400/400' },
	{ name: 'Travel', value: 80, color: '#ee5253', image: 'https://picsum.photos/seed/travel/400/400' },
	{ name: 'Stationery', value: 150, color: '#ff9ff3', image: 'https://picsum.photos/seed/stationery/400/400' },
	{ name: 'Camera', value: 70, color: '#00d2d3', image: 'https://picsum.photos/seed/camera/400/400' },
	{ name: 'Fashion', value: 80, color: '#576574', image: 'https://picsum.photos/seed/fashion/400/400' },
	{ name: 'Soccer', value: 60, color: '#576574', image: 'https://picsum.photos/seed/soccer/400/400' },
	{ name: 'Music', value: 80, color: '#576574', image: 'https://picsum.photos/seed/music/400/400' },
	{ name: 'Perfume', value: 70, color: '#576574', image: 'https://picsum.photos/seed/perfume/400/400' },
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const aboutRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const [selected, setSelected] = useState(null);
	const [boxVisible, setBoxVisible] = useState(false);

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				const { width } = entry.contentRect;
				setDimensions({ width, height: 600 });
			}
		});
		if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);
		return () => resizeObserver.disconnect();
	}, []);

	// 외부 클릭 시 어바웃 박스 닫기
	useEffect(() => {
		const handleClickOutside = e => {
			if (boxVisible && aboutRef.current && !aboutRef.current.contains(e.target)) {
				setBoxVisible(false);
				setSelected(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [boxVisible]);

	useEffect(() => {
		const { width, height } = dimensions;
		const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);
		svg.select('defs')?.remove();

		const defs = svg.append('defs');
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
			.force('x', d3.forceX(width / 2).strength(0.05))
			.force('y', d3.forceY(height / 2).strength(0.05))
			.force(
				'collide',
				d3.forceCollide().radius(d => d.value / 2 + 4)
			)
			.stop();
		for (let i = 0; i < 300; i++) simulation.tick();

		const node = svg
			.selectAll('g')
			.data(interests, d => d.name)
			.join(enter => {
				const g = enter
					.append('g')
					.style('cursor', 'pointer')
					.attr('opacity', 0)
					.attr('transform', `translate(${width / 2}, ${height / 2})`);

				g.transition()
					.duration(800)
					.delay((d, i) => i * 80)
					.attr('opacity', 1)
					.attr('transform', d => `translate(${d.x}, ${d.y})`);

				g.append('circle');
				g.append('image')
					.attr('clip-path', d => `url(#clip-${d.name.replace(/\s+/g, '')})`)
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
	}, [dimensions, selected]);

	return (
		<div className="full-container">
			<div className={`interest-section ${boxVisible ? 'with-box' : ''}`} ref={wrapperRef}>
				<div className="bubble-chart">
					<svg ref={svgRef} className="img-chart"></svg>
				</div>
			</div>

			<div className={`about-wrapper ${boxVisible ? 'show' : ''}`}>
				<div className="about_keyword" ref={aboutRef}>
					{selected && (
						<div className="custom-description">
							<h2>{selected.name}</h2>
							<img src={selected.image} alt={selected.name} />
							<p>
								{
									{
										Coding: 'React와 Node.js 중심의 풀스택 개발에 관심이 많습니다.',
										'UI Design': '사용자 흐름을 고려한 인터페이스 설계가 주력입니다.',
										Movie: '감성과 스토리가 있는 영화에 몰입합니다.',
										Book: '인문학과 자기계발서를 주로 읽습니다.',
										Running: '러닝으로 체력과 멘탈을 다잡습니다.',
										Pilates: '자세 교정과 근력 유지를 위해 꾸준히 수련합니다.',
										Travel: '풍경, 문화, 사람을 경험하고 기록합니다.',
										Stationery: '다꾸용 문구 수집과 기록을 즐깁니다.',
										Camera: '필름과 디지털 카메라를 넘나들며 촬영합니다.',
										Fashion: '계절별 스타일링과 트렌드를 연구합니다.',
										Music: 'EDM과 록 음악을 자주 듣습니다.',
										Perfume: '향수로 분위기와 기억을 남깁니다.',
										Soccer: '직관과 플레이 모두 즐기는 스포츠입니다.',
									}[selected.name]
								}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default InterestBubbleChart;
