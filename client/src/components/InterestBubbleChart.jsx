import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import '../assets/css/fullpage.css';

const interests = [
	{ name: 'Coding', value: 180, color: '#576574', image: 'https://picsum.photos/seed/coding/400/400' },
	{ name: 'UI Design', value: 150, color: '#576574', image: 'https://picsum.photos/seed/design/400/400' },
	{ name: 'Movie', value: 80, color: '#576574', image: 'https://picsum.photos/seed/movie/400/400' },
	{ name: 'Book', value: 200, color: '#576574', image: 'https://picsum.photos/seed/book/400/400' },
	{ name: 'Running', value: 140, color: '#576574', image: 'https://picsum.photos/seed/running/400/400' },
	{ name: 'Pilates', value: 170, color: '#576574', image: 'https://picsum.photos/seed/pilates/400/400' },
	{ name: 'Travel', value: 80, color: '#576574', image: 'https://picsum.photos/seed/travel/400/400' },
	{ name: 'Stationery', value: 150, color: '#576574', image: 'https://picsum.photos/seed/stationery/400/400' },
	{ name: 'Camera', value: 70, color: '#576574', image: 'https://picsum.photos/seed/camera/400/400' },
	{ name: 'Fashion', value: 80, color: '#576574', image: 'https://picsum.photos/seed/fashion/400/400' },
	{ name: 'Soccer', value: 60, color: '#576574', image: 'https://picsum.photos/seed/soccer/400/400' },
	{ name: 'Music', value: 80, color: '#576574', image: 'https://picsum.photos/seed/music/400/400' },
	{ name: 'Perfume', value: 70, color: '#576574', image: 'https://picsum.photos/seed/perfume/400/400' },
	{ name: 'ENTJ', value: 70, color: '#576574', image: 'https://picsum.photos/seed/teach/400/400' },
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const aboutRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const [selected, setSelected] = useState(null);
	const [boxVisible, setBoxVisible] = useState(false);
	const [hasEntered, setHasEntered] = useState(false);

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

	useEffect(() => {
		if (!wrapperRef.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasEntered) {
					setHasEntered(true);
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(wrapperRef.current);
		return () => observer.disconnect();
	}, [hasEntered]);

	useEffect(() => {
		if (!hasEntered) return;
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
			);
		for (let i = 0; i < 300; i++) simulation.tick();
		simulation.on('tick', () => {
			svg.selectAll('g').attr('transform', d => `translate(${d.x}, ${d.y})`);
		});

		const drag = d3
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

		node.call(drag);
		node.on('click', (event, d) => {
			const isSame = selected?.name === d.name;
			if (isSame) {
				setBoxVisible(false);
				setTimeout(() => setSelected(null), 300);
				return;
			}
			if (boxVisible) {
				setBoxVisible(false);
				setTimeout(() => {
					setSelected(d);
					setBoxVisible(true);
				}, 300);
			} else {
				setSelected(d);
				setBoxVisible(true);
			}
		});

		node
			.select('circle')
			.transition()
			.duration(300)
			.attr('r', d => d.value / 2)
			.attr('fill', d => (selected?.name === d.name ? d.color : '#ff5722'));

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
	}, [dimensions, selected, hasEntered]);

	return (
		<div className="full-container">
			<div className={`interest-section ${boxVisible ? 'with-box' : ''}`} ref={wrapperRef}>
				<div className="bubble-chart">
					<svg ref={svgRef} className="img-chart"></svg>
				</div>
			</div>
			<div className={`about_keyword ${boxVisible ? 'show' : ''}`} ref={aboutRef} key={selected?.name || 'none'}>
				{selected && (
					<div className="custom-description">
						<button
							className="custom-close-btn"
							onClick={() => {
								setBoxVisible(false);
								setTimeout(() => setSelected(null), 300);
							}}
						>
							<svg viewBox="0 0 24 24" className="close-icon" xmlns="http://www.w3.org/2000/svg">
								<line x1="4" y1="4" x2="20" y2="20" />
								<line x1="20" y1="4" x2="4" y2="20" />
							</svg>
						</button>
						<h2>{selected.name}</h2>
						<img src={selected.image} alt={selected.name} />
						{selected.name === 'Coding' && <p>프론트엔드와 백엔드 전반에 관심이 많고, 주로 React와 Node.js를 다룹니다.</p>}
						{selected.name === 'UI Design' && <p>프로토타입 제작과 사용자 흐름을 고려한 인터페이스를 설계합니다.</p>}
						{selected.name === 'Movie' && <p>감성과 스토리 중심의 영화 감상을 즐기며, 감독의 연출력에 집중합니다.</p>}
						{selected.name === 'Book' && <p>자기계발서, 인문학, 고전소설 등 폭넓은 장르를 읽습니다.</p>}
						{selected.name === 'Running' && <p>아침 러닝으로 하루를 시작하며 체력과 멘탈을 관리합니다.</p>}
						{selected.name === 'Pilates' && <p>균형과 유연성을 위해 꾸준히 수련하며 자세 교정에 집중합니다.</p>}
						{selected.name === 'Travel' && <p>자연, 문화, 사람을 경험하며 기록하는 것을 좋아합니다.</p>}
						{selected.name === 'Stationery' && <p>마스킹 테이프, 펜, 스티커로 감성적인 기록을 남깁니다.</p>}
						{selected.name === 'Camera' && <p>필름카메라와 디지털을 넘나들며 풍경과 일상을 담습니다.</p>}
						{selected.name === 'Fashion' && <p>계절별 스타일링과 트렌드를 연구하며 자신만의 룩을 만듭니다.</p>}
						{selected.name === 'Music' && <p>EDM과 Rock 을 좋아합니다.</p>}
						{selected.name === 'Perfume' && <p>향수를 즐겨뿌립니다.</p>}
						{selected.name === 'ENTJ' && <p>지도자형 입니다.</p>}
					</div>
				)}
			</div>
		</div>
	);
};

export default InterestBubbleChart;
