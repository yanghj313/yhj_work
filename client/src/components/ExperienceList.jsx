import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => setExperiences(res.data.data))
      .catch((err) => console.error('❌ 경험 오류:', err));
  }, []);

  return (
    <div>
      <h2>📘 경력사항</h2>
      <ul>
        {experiences.map((e) => (
          <li key={e.id}>
            <strong>{e.attributes.position}</strong> - {e.attributes.Career}
            <br />
            {e.attributes.title}
            <br />
            {e.attributes.logo?.data?.attributes?.url && (
              <img
                src={e.attributes.logo.data.attributes.url}
                alt="로고"
                width="60"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
