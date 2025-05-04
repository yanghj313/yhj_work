import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/fullpage.css';
import InterestDescription from './InterestDescription';
import ImageModal from './ImageModal';

const interests = [
	{
		name: 'Coding',
		value: 180,
		color: '#576574',
		image: '/main_img/coding_01.png',
		images: ['/main_img/coding_02.png', '/main_img/coding_03.png', '/main_img/coding_04.png', '/main_img/coding_05.jpg'],
	},
	{
		name: 'Design',
		value: 150,
		color: '#576574',
		image: '/main_img/design.JPG',
		images: ['/main_img/ui_01.jpg', '/main_img/ui_02.jpg', '/main_img/ui_03.jpg', '/main_img/ui_04.jpg', '/main_img/ui_05.jpg'],
	},
	{
		name: 'Movie',
		value: 80,
		color: '#576574',
		image: '/main_img/movie_02.JPG',
		images: ['/main_img/mov_01.jpg', '/main_img/mov_03.jpg', '/main_img/mov_05.JPG', '/main_img/mov_06.JPG'],
	},
	{
		name: 'Book',
		value: 200,
		color: '#576574',
		image: '/main_img/book_01.jpg',
		images: ['/main_img/book_02.JPG', '/main_img/book_03.jpg', '/main_img/book_04.jpg', '/main_img/book_05.jpg'],
	},
	{
		name: 'Running',
		value: 140,
		color: '#576574',
		image: '/main_img/run.JPG',
		images: [
			'/main_img/rudding_03.JPG',
			'/main_img/running_01.JPG',
			'/main_img/running_02.JPG',
			'/main_img/running_04.JPG',
			'/main_img/running_05.JPG',
			'/main_img/running_06.JPG',
			'/main_img/running_07.JPG',
		],
	},
	{
		name: 'Pilates',
		value: 170,
		color: '#576574',
		image: '/main_img/pil_01.jpg',
		images: ['/main_img/pil_01.jpg', '/main_img/pil_02.jpg', '/main_img/pil_03.jpg'],
	},
	{
		name: 'Travel',
		value: 80,
		color: '#576574',
		image: '/main_img/tour_01.JPG',
		images: ['/main_img/tour_01.JPG', '/main_img/tour_02.jpg', '/main_img/tour_03.JPG', '/main_img/tour_04.jpg'],
	},
	{
		name: 'Stationery',
		value: 150,
		color: '#576574',
		image: '/main_img/di_04.JPG',
		images: ['/main_img/di_01.jpg', '/main_img/di_02.JPG', '/main_img/di_03.jpg', '/main_img/di_04.JPG', '/main_img/di_05.jpg'],
	},
	{
		name: 'Camera',
		value: 70,
		color: '#576574',
		image: '/main_img/came_01.jpg',
		images: [
			'/main_img/came_02.jpg',
			'/main_img/came_03.jpg',
			'/main_img/came_04.jpg',
			'/main_img/came_05.jpg',
			'/main_img/camera_01.JPG',
			'/main_img/camera_02.JPG',
			'/main_img/camera_03.JPG',
			'/main_img/camera_04.JPG',
			'/main_img/camera_05.JPG',
			'/main_img/camera_06.JPG',
			'/main_img/camera_07.jpg',
		],
	},
	{
		name: 'Fashion',
		value: 80,
		color: '#576574',
		image: '/main_img/style_01.jpg',
		images: [
			'/main_img/style_02.JPG',
			'/main_img/style_03.jpg',
			'/main_img/style_05.jpg',
			'/main_img/style_06.jpg',
			'/main_img/style_07.JPG',
			'/main_img/style_08.JPG',
			'/main_img/style_09.jpg',
			'/main_img/style_10.jpg',
			'/main_img/style_11.jpg',
			'/main_img/style_12.jpg',
			'/main_img/style_13.JPG',
			'/main_img/style_14.jpg',
		],
	},
	{
		name: 'Soccer',
		value: 60,
		color: '#576574',
		image: '/main_img/soccer.JPG',
		images: ['/main_img/soccer_01.jpg', '/main_img/soccer_02.jpg', '/main_img/soccer_03.png'],
	},
	{
		name: 'Music',
		value: 80,
		color: '#576574',
		image: '/main_img/head.jpg',
		images: ['/main_img/music.jpg', '/main_img/music_02.jpg', '/main_img/music_03.jpg', '/main_img/music_04.PNG', '/main_img/music_04.jpg'],
	},
	{
		name: 'Perfume',
		value: 70,
		color: '#576574',
		image: '/main_img/per_01.JPG',
		images: ['/main_img/per_01.JPG', '/main_img/per_02.jpg', '/main_img/per_03.jpg', '/main_img/per_04.jpg', '/main_img/per_05.jpg'],
	},
	{
		name: 'ENTJ',
		value: 70,
		color: '#576574',
		image: '/main_img/ent_04.png',
		images: ['/main_img/ent_05.png', '/main_img/entj_01.JPG', '/main_img/entj_02.jpg', '/main_img/entj_03.jpg'],
	},
];

const InterestBubbleChart = () => {
	const svgRef = useRef();
	const wrapperRef = useRef();
	const aboutRef = useRef();
	const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
	const [selected, setSelected] = useState(null);
	const [boxVisible, setBoxVisible] = useState(false);
	const [hasEntered, setHasEntered] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalStartIndex, setModalStartIndex] = useState(0);

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
					.attr('preserveAspectRatio', 'xMidYMid slice')
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
					setCurrentSlide(0);
				}, 300);
			} else {
				setSelected(d);
				setBoxVisible(true);
				setCurrentSlide(0);
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

	const handleThumbnailClick = idx => {
		setModalStartIndex(idx);
		setIsModalOpen(true);
	};

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

						{/* 썸네일 슬릭 */}
						<div className="thumbnail-container">
							<Slider slidesToShow={3} slidesToScroll={1} infinite={selected.images.length > 3} arrows={true}>
								{selected.images?.map((thumb, idx) => (
									<div key={idx} className="thumbnail-wrapper">
										<img src={thumb} alt={`thumb-${idx}`} className="thumbnail" onClick={() => handleThumbnailClick(idx)} />
									</div>
								))}
							</Slider>
						</div>

						{/* 모달 */}
						{isModalOpen && <ImageModal images={selected.images} startIndex={modalStartIndex} onClose={() => setIsModalOpen(false)} />}

						{/* 설명 */}
						<InterestDescription selected={selected} />
					</div>
				)}
			</div>
		</div>
	);
};

export default InterestBubbleChart;
