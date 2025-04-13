import React, { useRef } from 'react';
import '../assets/css/fullpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
const locations = [
	{ id: 1, name: '부산역', left: '30%', top: '20%', image: '/img/place1.jpg', desc: '부산의 관문, 여행의 시작점' },
	{ id: 2, name: '해운대', left: '60%', top: '40%', image: '/img/place2.jpg', desc: '부산의 대표 해수욕장' },
	{ id: 3, name: '감천문화마을', left: '40%', top: '60%', image: '/img/place3.jpg', desc: '알록달록한 벽화마을' },
];

const TravelMap = () => {
	const [active, setActive] = useState(null);

	return (
		<div className="travel-map">
			<div className="map-background" />

			{locations.map(loc => (
				<div key={loc.id} className="circle-marker" style={{ left: loc.left, top: loc.top }} onClick={() => setActive(loc)} />
			))}

			{active && (
				<>
					<div className="active-marker" style={{ left: active.left, top: active.top }}>
						<FontAwesomeIcon icon={faLocationDot} size="2x" />
					</div>
					<div className="map-popup" style={{ left: active.left, top: `calc(${active.top} + 40px)` }}>
						<img src={active.image} alt={active.name} />
						<h3>{active.name}</h3>
						<p>{active.desc}</p>
						<div className="popup-tail" />
					</div>
				</>
			)}
		</div>
	);
};

export default TravelMap;
