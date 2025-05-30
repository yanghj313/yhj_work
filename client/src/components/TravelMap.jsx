import React, { useState } from 'react';
import '../assets/css/fullpage.css';
import { FaMapMarkerAlt } from 'react-icons/fa';

const markers = [
	{
		id: 1,
		name: '튀르기예',
		description: '카파도키아와 파묵칼레에서 봤던 경치는 잊을 수 없는 장관이었습니다. 해외 여행 중 가장 기억에 남는 곳을 묻는다면 단연 튀르기예입니다.',
		image: '/main_img/tur_03.JPG',
	},
	{
		id: 2,
		name: '미국',
		description: '처음으로 갔던 해외 여행지 입니다. 시카고를 거쳐 켄자스 시티에서 낭만을 즐기고, 커니에서 현지 학생들과 공부를 했던 때가 가끔 그립습니다.',
		image: '/main_img/ame.JPG',
	},
	{
		id: 3,
		name: '중국',
		description:
			'상하이는 현대적인 도시 풍경과 전통적인 문화의 조화가 근사한 곳이었습니다. 특히 동방명주 타워는 야경의 아름다움을 더해줘 황홀했던 기억이 있습니다. 광활한 규모의 디즈니랜드도 인상적이었습니다.',
		image: '/main_img/sang_01.JPG',
	},
	{
		id: 4,
		name: '스페인',
		description: '바르셀로나와 마드리드는 각자의 매력이 있었습니다. 마드리드의 광장과 미술관의 예술작품도 근사했고, 사진으로만 보던 바르셀로나의 가우디 건축물은 실물이 훨씬 감동적이었습니다.',
		image: '/main_img/spa_01.jpg',
	},
	{
		id: 5,
		name: '포르투갈',
		description: '포르투의 와인과 리스본의 아기자기한 매력을 느꼈습니다. 특히 리스본의 트램은 독특한 경험이었습니다. ',
		image: '/main_img/port.jpg',
	},
	{
		id: 6,
		name: '대한민국',
		description:
			'국내 여행도 무척 좋아합니다. 서울에 있었을 때는 강원도 여행을 자주 갔었습니다. 삼척의 장호항은 사진으로 그 아름다움이 전해지지 않아 아쉽습니다. 지리산 종주도 힘들었지만, 보람있는 경험이었습니다. 제주도 여행도 즐깁니다. ',
		image: '/main_img/tour_01.JPG',
	},
];

const TravelMap = () => {
	const [activeId, setActiveId] = useState(null);
	const popupRef = useRef(null); // ✅ 팝업 참조용 ref

	// ✅ 외부 클릭 감지
	useEffect(() => {
		const handleClickOutside = e => {
			if (popupRef.current && !popupRef.current.contains(e.target)) {
				setActiveId(null);
			}
		};
		if (activeId !== null) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [activeId]);

	return (
		<div className="travel-map-wrapper">
			<p className="map_description">지도 위 노랑색 마크를 클릭해주세요!</p>
			<div className="travel-map">
				<div className="map-background"></div>

				{markers.map(marker => (
					<div key={marker.id} className={`circle-marker ${activeId === marker.id ? 'hidden' : ''} circle-marker--${marker.id}`} onClick={() => setActiveId(marker.id)} />
				))}

				{markers.map(
					marker =>
						marker.id === activeId && (
							<React.Fragment key={`active-${marker.id}`}>
								<div className={`active-marker active-marker--${marker.id}`}>
									<FaMapMarkerAlt size={28} />
									<div className="marker-wave">
										<div className="marker-wave__scale"></div>
									</div>
									<div className="marker-wave marker-wave--inner">
										<div className="marker-wave__scale"></div>
									</div>
								</div>

								<div
									ref={popupRef} // ✅ 팝업에 ref 적용
									className={`map-popup map-popup--${marker.id}`}
									style={{ left: `calc(${marker.x} + 60px)`, top: `calc(${marker.y} - 30px)` }}
								>
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
