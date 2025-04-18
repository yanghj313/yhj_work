import React, { useState } from 'react';
import '../assets/css/fullpage.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const markers = [
	{
		id: 1,
		name: '부산 도서관',
		description: '부산 시민을 위한 열린 공간과 자료를 제공합니다.',
		image: 'https://source.unsplash.com/400x200/?library',
		x: '47%',
		y: '51%',
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
		x: '32%',
		y: '52%',
	},
	{
		id: 4,
		name: '감천문화마을',
		description: '예술과 전통이 어우러진 아름다운 마을입니다.',
		image: 'https://source.unsplash.com/400x200/?village',
		x: '40%',
		y: '90%',
	},
	{
		id: 5,
		name: '감천문화마을',
		description: '예술과 전통이 어우러진 아름다운 마을입니다.',
		image: 'https://source.unsplash.com/400x200/?village',
		x: '38%',
		y: '59%',
	},
];

const TravelMap = () => {
	const [activeId, setActiveId] = useState(null);

	return (
		<div className="travel-map-wrapper">
			<div className="travel-map">
				<div className="map-background"></div>

				{markers.map(marker => (
					<div
						key={marker.id}
						className={`circle-marker ${activeId === marker.id ? 'hidden' : ''} circle-marker--${marker.id}`}
						style={{ left: marker.x, top: marker.y }}
						onClick={() => setActiveId(marker.id)}
					/>
				))}

				{markers.map(
					marker =>
						marker.id === activeId && (
							<React.Fragment key={`active-${marker.id}`}>
								<div className={`active-marker active-marker--${marker.id}`}>
									<FaMapMarkerAlt size={28} />
									<div className="marker-wave"></div>
									<div className="marker-wave marker-wave--inner"></div>
								</div>

								<div className={`map-popup map-popup--${marker.id}`} style={{ left: `calc(${marker.x} + 60px)`, top: `calc(${marker.y} - 30px)` }}>
									{/* ✅ 닫기 버튼 추가 */}
									<button className="custom-close-btn" aria-label="닫기" onClick={() => setActiveId(null)}>
										<svg viewBox="0 0 24 24" className="close-icon" xmlns="http://www.w3.org/2000/svg">
											<line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
											<line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
										</svg>
									</button>

									<div className="popup-tail left" />
									<img src={marker.image} alt={marker.name} />
									<h3>{marker.name}</h3>
									<p>{marker.description}</p>
								</div>
							</React.Fragment>
						)
				)}
			</div>
		</div>
	);
};

export default TravelMap;
