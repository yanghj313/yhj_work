import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/skills?populate=*`)
      .then((res) => {
        setSkills(
          (res.data.data || []).map((s) => ({
            id: s.id,
            ...s.attributes,
            icon: s.attributes.icon?.data?.attributes,
          }))
        );
      })
      .catch((err) => {
        console.error('❌ 스킬 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>🛠️ 스킬 목록</h2>
      <ul>
        {skills.map((s) =>
          s?.name ? (
            <li
              key={s.id}
              style={{ marginBottom: '1.5rem' }}>
              {/* 아이콘 먼저 */}
              {s.icon?.url && (
                <img
                  src={s.icon.url.startsWith('http') ? s.icon.url : `${API_BASE}${s.icon.url}`}
                  alt={s.icon.name || '스킬 아이콘'}
                  width="48"
                  style={{ display: 'block', marginBottom: '0.5rem' }}
                />
              )}

              <strong>{s.name}</strong>
              {s.level && <p>🎯 숙련도: {s.level}</p>}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default SkillList;
