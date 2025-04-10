import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // axios로 경험 목록 가져오기
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => {
        console.log('✅ 경험 데이터:', res.data);
        setExperiences(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 경험 데이터 오류:', err);
      });
  }, []);

  return (
    <div>
      <h2>💼 경험 목록</h2>
      <ul>
        {experiences.map((e) => (
          <li key={e.id}>
            <Link to={`/experience/${e.id}`}>{e.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
