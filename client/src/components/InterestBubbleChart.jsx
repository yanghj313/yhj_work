import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/fullpage.css'; // 기존 스타일 유지

const interests = [
	{
		name: 'Coding',
		value: 180,
		color: '#576574',
		image: '/main_img/coding_01.png',
		images: ['/main_img/coding_02.png', '/main_img/coding_03.png', '/main_img/coding_04.png', '/main_img/coding_05.png'],
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
		images: ['/main_img/di_01.JPG', '/main_img/di_02.JPG', '/main_img/di_03.jpg', '/main_img/di_04.JPG', '/main_img/di_05.jpg'],
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
		image: '/main_img/style_01.JPG',
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

						{/* 썸네일 리스트 */}
						<div className="thumbnail-container">
							{selected.images?.map((thumb, idx) => (
								<img key={idx} src={thumb} alt={`thumb-${idx}`} className="thumbnail" onClick={() => setCurrentSlide(idx)} />
							))}
						</div>

						{/* 슬릭 슬라이더 */}
						{selected.images && (
							<div className="slider-popup">
								<Slider dots={true} arrows={true} infinite={true} initialSlide={currentSlide}>
									{selected.images.map((img, idx) => (
										<div key={idx}>
											<img src={img} alt={`slide-${idx}`} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
										</div>
									))}
								</Slider>
							</div>
						)}

						{/* 설명 부분 */}
						{selected.name === 'Coding' && (
							<p>
								처음 웹디자인을 접했을 당시부터 코딩으로 무언가를 창작하는 작업에 대해 흥미를 느꼈습니다. 간혹 친구들 소개 홈페이지도 취미로 만들곤 하며 코딩을 생활화 하려고 노력했습니다. 일에 있어선
								진지하지만, 오래가기 위해서는 재미를 느끼는 것이 중요하다고 생각합니다. 끊임없이 배우고 발전하는 개발자가 되고 싶습니다.
							</p>
						)}
						{selected.name === 'Design' && (
							<p>
								UI나 UX뿐만이 아니라 계획표, 노션 등의 레이아웃을 직접 디자인하며 내용 전달과 미감을 중시하고 있습니다. 디자인은 단순 예술이 아니라 커뮤니케이션 수단이기에 무엇을 말하고자 하는지에
								대해서 분명히 하도록 색, 선, 면 모든 것에 의미부여를 하며 신중히 작업하려고 하고 연습중입니다.
							</p>
						)}
						{selected.name === 'Movie' && (
							<p>
								영화 감상을 좋아합니다. 스토리가 감동적인 영화를 보며 감수성을 키우기도 하지만, 화면 연출을 통해 감독들의 미쟝센 그리고 색 사용을 참고하기 위해 유심히 관찰하며 감상하고 있습니다.
								박찬욱 감독, 자끄 드미, 웨스앤더슨, 왕가위 감독의 영화를 선호하는 편입니다.
							</p>
						)}
						{selected.name === 'Book' && (
							<p>
								사람이 살면서 경험할 수 있는 사건과 이야기의 폭은 한정적입니다. 모든것을 보고 느낄 순 없기 때문에 보고 듣는 것만으로 제 세계를 확정짓지 않으려고 합니다. 겪어보지 못한 일을 책을 통해
								간접적으로 경험하며 여러가지 견해와 의견을 받아들이는 방법을 체득하고 있습니다. 좋아하는 작가는 최은영, 양귀자, 애거서 크리스티, 샬롯 브론테입니다. 최근에는 베블런의 '유한계급론'이라는
								책을 읽으며 인문학적 지식을 쌓았습니다.
							</p>
						)}
						{selected.name === 'Running' && (
							<p>
								어떤 일을 행하건 움직임이 동반하는 일은 건강이 따라옵니다. 아무리 하고 싶은 일이 있어도 건강하지 못하면 이행하기 어렵습니다. 하고싶은 일이 많기 때문에 유산소 운동을 정기적으로 하며
								체력 보강을 하고 있습니다. 또한 스트레스 관리에도 러닝의 효과는 뛰어나 생각정리를 하고 싶을때도 집앞 강변을 천천히 달리고 있습니다.
							</p>
						)}
						{selected.name === 'Pilates' && (
							<p>
								유산소 뿐만아니라 오래 앉아서 일하는 디자인 및 개발 업무는 허리 건강이 생명입니다. 코어힘을 기르고 손목과 어깨 건강 및 자세 교정을 위해 필라테스를 10년째 다니고 있습니다. 덕분에 여지껏
								허리가 아파 업무에 지장이 온 적은 없었습니다.
							</p>
						)}
						{selected.name === 'Travel' && (
							<p>
								여행은 일상을 환기시켜주는 역할을 합니다. 다양한 볼거리와 체험, 사람을 만나는 것 등으로 더 넓은 시야를 확보하는데도 도움이 되지만, 여행을 통해 집의 소중함 그리고 내가 가진 것에 대한
								감사한 마음도 생기는 것 같습니다. 친구와 가족들과 추억도 쌓았지만, 여러 유형의 사람도 겪어보며 소통의 기술도 배울 수 있었습니다.
							</p>
						)}
						{selected.name === 'Stationery' && (
							<p>
								기록은 별 거 아닌 것 같지만, 가지고 있는 힘이 크다고 생각합니다. 하룻동안 있었던 일을 반추하며 내가 고쳐야 할 것, 잘한 것 그리고 앞으로의 방향성에 대해 정리할 수 있도록 해주는
								수단입니다. 건설적인 미래를 구축하는데에는 다이어리만큼 좋은 물건이 없다고 생각합니다. 또한 미감과 기록의 재미를 더하기 위해 다이어리 꾸미기도 자주 하고 있습니다.
							</p>
						)}
						{selected.name === 'Camera' && (
							<p>
								다이어리가 생각 위주의 기록 중심이라면 보는 것들은 카메라로 시간의 흔적들을 남기고 있습니다. 시간은 흘러가는 것이기에 잡을 수 없지만, 사진으로 그 시간을 보관하는 것은 가능하다고
								생각합니다. 필름 카메라, 폴라로이드, 하이엔드 카메라, 비디오 카메라 등을 사용하여 아름다운 풍경 뿐 아니라 인물들과의 시간을 남기며 인생의 주마등을 시각화 하고 있습니다.
							</p>
						)}
						{selected.name === 'Fashion' && (
							<p>
								'세이노의 가르침'이라는 책에서는 이런 말을 합니다. '부티보다 귀티나게 외모에도 신경쓰라' 라고 말입니다. 사람들은 외모는 중요하지 않다고들 하지만, 조선시대나 중국 당나라 등 관료를 뽑을
								때면 가장 중요한 인재 판별 기준 중 하나가 '외모'였다고 합니다. 10명 중 9명은 첫인상이나 외모로 사람을 1차적으로 판단합니다. 그렇기에 1명이 내면만 본다고 하여도 단정히 외모를 가꾸는
								것에 신경을 쓰며 9명에게도 점수를 따는 것은 중요한 처세 기술이라고 생각합니다. 건강해 보이고 밝은 인상 그리고 단정하고 유행을 적당히 고려한 옷차림을 늘 유념하며 사람들의 시선을
								신경쓰고 있습니다. 겉과 속이 모두 보기 좋은 사람이 되기 위해 항상 노력합니다.
							</p>
						)}
						{selected.name === 'Soccer' && (
							<p>
								공대 출신이기에 학교 선배들과의 대화 화제를 풍요롭게 하기 위한 소재 수집의 일환으로 해외 축구가 있었습니다. 만나면 날씨 얘기나 어제 본 프로그램 얘기를 많이 하는 것이 인사며 아이스
								브레이킹이 됩니다. 활동적인 운동에 관심을 가지며 다양한 사람들과 교류하기 위해 노력하고 있습니다.
							</p>
						)}
						{selected.name === 'Music' && (
							<p>
								음악은 기준과 의욕을 고양시키며, 좋은 노래로 사람들간의 정서 유대를 돈독하게 할 수 있습니다. 주로 흥겨운 락 음악이나 기분을 들뜨게 하는 EDM, 메시지에서 공감을 얻을 수 있는 랩이나
								대중가요를 듣고 추천해주는 것을 좋아합니다.
							</p>
						)}
						{selected.name === 'Perfume' && (
							<p>
								멋진 외관에는 패션도 중요하지만, 좋은 사람이 떠난 자리에는 향기가 남는다는 말이 있듯이 풍기는 향도 중요하다고 생각합니다. 봄엔 달콤한 꽃향기가 나는 플로럴계, 여름에는 상큼하고 시원한
								시트러스계, 가을에는 중후하고 세련된 우디계열, 겨울에는 포근한 머스크계 향수를 주로 씁니다. 가장 좋아하는 향수는 바이레도의 발다프리크 입니다. 레몬향과 자스민, 시더우드의 향이 어우러져
								상큼하지만 가볍진 않은 느낌을 줍니다. 저또한 인격적으로 밝지만 진지할때는 진지한 사람이 되고 싶어 이 향수를 시그니쳐처럼 사용하게 됐습니다.
							</p>
						)}
						{selected.name === 'ENTJ' && (
							<p>
								사람을 좋아하고 표현하는 걸 좋아하는 외향형 E와 공상과 상상을 즐기는 N, 감정도 중요하지만 좋고 싫은 것에 비해 옳고 그른 문제도 따지는 것을 좋아하는 T 그리고 계획적이고 체계적으로 일을
								진행하는 것을 좋아하는 J가 합쳐진 성격입니다. mbti로 사람을 단정짓는 것은 성급하다고 할 수 있지만, 바쁜 현대 사회에서 사람을 면밀히 관찰하며 파악하기란 쉽지 않습니다. 제 포트폴리오를
								통해서 적극적이고 주도적인 면이 강한 ENTJ스러운 면을 발견할 수 있으셨으면 좋겠습니다.
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default InterestBubbleChart;
