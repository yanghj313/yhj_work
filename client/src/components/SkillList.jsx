import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/skills?populate=*`)
      .then((res) => setSkills(res.data.data || []))
      .catch((err) => console.error('❌ 스킬 오류:', err));
  }, []);

  return (
    <div>
      <h2>🛠️ 스킬 목록</h2>
      <ul>
        {skills.map((s) => {
          if (!s?.attributes) return null;
          const attr = s.attributes;
          const iconUrl = attr.icon?.data?.attributes?.url;

          return (
            <li key={s.id}>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={attr.name}
                  width="40"
                />
              )}
              <strong>{attr.name}</strong> - {attr.level}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SkillList;
