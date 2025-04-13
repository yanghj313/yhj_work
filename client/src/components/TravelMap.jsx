import React, { useState } from 'react';
import '../assets/css/fullpage.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const markers = [
	{
		id: 1,
		name: '부산 도서관',
		description: '부산 시민을 위한 열린 공간과 자료를 제공합니다.',
		image: 'https://source.unsplash.com/400x200/?library',
		x: '45%',
		y: '30%',
	},
	{
		id: 2,
		name: '해운대 해수욕장',
		description: '부산을 대표하는 바다 관광지입니다.',
		image: 'https://source.unsplash.com/400x200/?beach',
		x: '70%',
		y: '55%',
	},
	{
		id: 3,
		name: '감천문화마을',
		description: '예술과 전통이 어우러진 아름다운 마을입니다.',
		image: 'https://source.unsplash.com/400x200/?village',
		x: '35%',
		y: '65%',
	},
];

const TravelMap = () => {
	const [activeId, setActiveId] = useState(null);

	return (
		<div className="travel-map-wrapper">
			<div className="travel-map">
				<div className="map-background"></div>

				{markers.map(marker => (
					<div key={marker.id} className="circle-marker" style={{ left: marker.x, top: marker.y }} onClick={() => setActiveId(marker.id)}></div>
				))}

				{markers.map(marker =>
					marker.id === activeId ? (
						<React.Fragment key={`active-${marker.id}`}>
							<div className="active-marker" style={{ left: marker.x, top: marker.y }}>
								<FaMapMarkerAlt size={28} />
							</div>

							<div key={`popup-${marker.id}`} className="map-popup" style={{ top: marker.y, left: marker.x }}>
								<img src={marker.image} alt={marker.name} />
								<h3>{marker.name}</h3>
								<p>{marker.description}</p>
								<div className="popup-tail"></div>
							</div>
						</React.Fragment>
					) : null
				)}
			</div>
		</div>
	);
};

export default TravelMap;
