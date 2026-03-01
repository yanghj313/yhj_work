import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const flattenItem = (item) => {
	if (!item) return null;
	const { id, documentId, attributes } = item;
	if (!attributes) return item;
	const flat = { id, documentId, ...attributes };
	Object.keys(flat).forEach(key => {
		const val = flat[key];
		if (val && typeof val === 'object' && val.data !== undefined) {
			if (val.data === null) flat[key] = null;
			else if (Array.isArray(val.data)) flat[key] = val.data.map(flattenItem);
			else flat[key] = flattenItem(val.data);
		}
	});
	return flat;
};

const SkillDetail = () => {
	const { id } = useParams();
	const [skill, setSkill] = useState(null);

	useEffect(() => {
		if (id) {
			axios
				.get(`${API_BASE}/api/skills/${id}?populate=*`)
				.then(res => {
					setSkill(flattenItem(res.data.data));
				})
				.catch(err => {
					console.error('❌ 상세 기술 데이터 오류:', err);
				});
		}
	}, [id]);

	if (!skill) return <p>📭 기술 정보를 불러오는 중...</p>;

	return (
		<div>
			<h2>{skill.name}</h2>
			<p>숙련도: {skill.level}</p>
		</div>
	);
};

export default SkillDetail;
