import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/skills?populate=*`)
      .then((res) => setSkills(res.data.data))
      .catch((err) => console.error('❌ 스킬 오류:', err));
  }, []);

  return (
    <div>
      <h2>🛠️ 스킬 목록</h2>
      <ul>
        {skills.map((s) => (
          <li key={s.id}>
            <strong>{s.attributes.name}</strong> - {s.attributes.level}
            {s.attributes.icon?.data?.attributes?.url && (
              <img
                src={s.attributes.icon.data.attributes.url}
                alt="아이콘"
                width="40"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
