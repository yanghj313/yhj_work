import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => {
        console.log('🔥경험 데이터:', res.data.data);
        setExperiences((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 경험 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>📘 경력사항</h2>
      <ul>
        {experiences.map((e) =>
          e?.position ? (
            <li
              key={e.id}
              style={{ marginBottom: '2rem' }}>
              {/* 로고 먼저 */}
              {e.logo?.url && (
                <img
                  src={e.logo.url.startsWith('http') ? e.logo.url : `${API_BASE}${e.logo.url}`}
                  alt={e.logo.name || '로고'}
                  width="120"
                  style={{ display: 'block', marginBottom: '0.5rem' }}
                />
              )}
              <strong>{e.position}</strong> ({e.Career})
              <br />
              {e.startDate} ~ {e.endDate}
              <br />
              {e.description && <p>{e.description}</p>}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ExperienceList;
