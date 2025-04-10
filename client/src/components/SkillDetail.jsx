import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE}/api/skills/${id}?populate=*`)
        .then((res) => {
          console.log('✅ 상세 기술 데이터:', res.data);
          setSkill(res.data.data);
        })
        .catch((err) => {
          console.error('❌ 상세 기술 데이터 오류:', err);
        });
    }
  }, [id]);

  if (!skill) return <p>📭 기술 정보를 불러오는 중...</p>;

  const { name, level } = skill.attributes;

  return (
    <div>
      <h2>{name}</h2>
      <p>숙련도: {level}</p>
    </div>
  );
};

export default SkillDetail;
