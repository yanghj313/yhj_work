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
		<div className="timeline-container ex_wrap">
			{experiences.map((e, i) => (
				<div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={e.id}>
					<div className="timeline-content">
						<h3>{e.position || '포지션 미입력'}</h3>
						<span className="timeline-date">
							{e.startDate} ~ {e.endDate || '현재'}
						</span>
						<p>{e.description || '설명 없음'}</p>
						{e.logo?.url && <img src={e.logo.url.startsWith('http') ? e.logo.url : `${API_BASE}${e.logo.url}`} alt="logo" />}
					</div>
					<div className="timeline-year">{e.startDate?.slice(0, 4)}</div>
				</div>
			))}
		</div>
	);
};

export default ExperienceList;
