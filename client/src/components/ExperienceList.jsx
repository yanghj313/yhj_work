import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => {
        const formatted = (res.data.data || []).map((item) => {
          const attr = item.attributes || {};
          const logo = attr.logo?.data?.attributes || null;

          return {
            id: item.id,
            position: attr.position || '',
            Career: attr.Career || '',
            startDate: attr.startDate || '',
            endDate: attr.endDate || '',
            description: attr.description || '',
            logo: logo
              ? {
                  url: logo.url.startsWith('http') ? logo.url : `${API_BASE}${logo.url}`,
                  name: logo.name || 'logo',
                }
              : null,
          };
        });

        setExperiences(formatted);
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
          e.position ? (
            <li
              key={e.id}
              style={{ marginBottom: '2rem' }}>
              {/* 로고 먼저 출력 */}
              {e.logo && (
                <img
                  src={e.logo.url}
                  alt={e.logo.name}
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
