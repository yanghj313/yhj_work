import React, { useRef } from 'react';
import '../assets/css/fullpage.css';

const markers = [
	{
		id: 'spot1',
		top: '30%',
		left: '20%',
		title: '제주도',
		description: '한라산과 돌하르방이 유명한 섬',
		image: 'https://picsum.photos/id/1015/300/200',
	},
	{
		id: 'spot2',
		top: '60%',
		left: '70%',
		title: '부산 해운대',
		description: '해변과 도심이 만나는 곳',
		image: 'https://picsum.photos/id/1025/300/200',
	},
];

const TravelMap = () => {
	const containerRef = useRef();

	const scrollToMarker = id => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
	};

	return (
		<div className="travel-map-wrapper" ref={containerRef}>
			<img src="/assets/images/travel-map.png" alt="여행 지도" className="map-image" />
			{markers.map(marker => (
				<div key={marker.id} id={marker.id} className="map-marker" style={{ top: marker.top, left: marker.left }} onClick={() => scrollToMarker(marker.id)}>
					<i className="fas fa-map-marker-alt"></i>
					<div className="marker-popup">
						<img src={marker.image} alt={marker.title} />
						<h3>{marker.title}</h3>
						<p>{marker.description}</p>
						<span className="marker-wave" />
					</div>
				</div>
			))}
		</div>
	);
};

export default TravelMap;
