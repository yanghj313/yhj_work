import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // axios로 기술 목록 가져오기
    axios
      .get(`${API_BASE}/api/skills?populate=*`)
      .then((res) => {
        console.log('✅ 기술 데이터:', res.data);
        setSkills(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 기술 데이터 오류:', err);
      });
  }, []);

  return (
    <div>
      <h2>🛠️ 기술 목록</h2>
      <ul>
        {skills.map((s) => (
          <li key={s.id}>
            <Link to={`/skill/${s.id}`}>{s.attributes.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
