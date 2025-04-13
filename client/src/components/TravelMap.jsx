import React, { useState } from 'react';
import '../assets/css/fullpage.css';

const markers = [
	{
		id: 1,
		name: '부산타워',
		x: '30%', // 이미지 기준 위치
		y: '40%',
		image: 'https://picsum.photos/id/1018/300/200',
		description: '부산타워는 부산의 전망 명소로, 야경이 멋집니다.',
	},
	{
		id: 2,
		name: '해운대 해수욕장',
		x: '60%',
		y: '70%',
		image: 'https://picsum.photos/id/1015/300/200',
		description: '해운대는 여름이면 많은 관광객이 찾는 부산의 대표 해변입니다.',
	},
];

const TravelMap = () => {
	const [selected, setSelected] = useState(null);

	return (
		<div className="travel-map-wrapper">
			<div className="map-image">
				{markers.map(marker => (
					<div key={marker.id} className="marker" style={{ left: marker.x, top: marker.y }} onClick={() => setSelected(marker)} />
				))}
				{selected && (
					<div className="popup" style={{ left: selected.x, top: selected.y }}>
						<h3>{selected.name}</h3>
						<img src={selected.image} alt={selected.name} />
						<p>{selected.description}</p>
						<button onClick={() => setSelected(null)}>닫기</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default TravelMap;
