import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => {
        setExperiences(
          (res.data.data || []).map((e) => ({
            id: e.id,
            ...e.attributes,
            logo: e.attributes.logo?.data?.attributes,
          }))
        );
      })
      .catch((err) => {
        console.error('❌ 경험 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>📘 경력사항</h2>
      <ul>
        {experiences.map((e) => (
          <li key={e.id}>
            <strong>{e.position}</strong> ({e.Career})<br />
            {e.title}
            <br />
            {e.startDate} ~ {e.endDate}
            <br />
            {e.logo?.url && (
              <img
                src={API_BASE + e.logo.url}
                alt={e.logo.name || '로고'}
                width="100"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
