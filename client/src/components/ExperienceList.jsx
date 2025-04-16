import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/page.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ExperienceList = () => {
	const [experiences, setExperiences] = useState([]);

	useEffect(() => {
		axios
			.get(`${API_BASE}/api/experiences?populate=*&sort=createdAt:asc&pagination[limit]=100`)
			.then(res => {
				console.log('🔥 경험 데이터:', res.data.data);
				setExperiences((res.data.data || []).filter(Boolean));
			})
			.catch(err => {
				console.error('❌ 경험 데이터 오류:', err.message);
			});
	}, []);

	return (
		<div className="timeline-container">
			{experiences.map((e, i) => (
				<div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={e.id}>
					<div className="timeline-content">
						{/* ✅ 포지션이 있을 때만 출력 + 여백 포함 */}
						{e.position && <h5 className="timeline-position">{e.position}</h5>}

						<p>{e.title}</p>

						{/* ✅ 로고 이미지 */}
						{e.logo?.url && <img src={e.logo.url.startsWith('http') ? e.logo.url : `${API_BASE}${e.logo.url}`} alt="logo" className="timeline-logo" />}
					</div>

					{/* ✅ 연도만 중앙 표시 */}
					<div className="timeline-year">{`${e.startDate?.slice(0, 4)} - ${e.endDate ? e.endDate.slice(0, 4) : '현재'}`}</div>
				</div>
			))}
		</div>
	);
};

export default ExperienceList;
