import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const ExperienceDetail = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE}/api/experiences/${id}?populate=*`)
        .then((res) => {
          console.log('✅ 상세 경험 데이터:', res.data);
          setExperience(res.data.data);
        })
        .catch((err) => {
          console.error('❌ 상세 경험 데이터 오류:', err);
        });
    }
  }, [id]);

  if (!experience) return <p>📭 경험 정보를 불러오는 중...</p>;

  const { title, description } = experience.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ExperienceDetail;
