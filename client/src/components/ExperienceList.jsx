import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/experiences?populate=*`)
      .then((res) => {
        setExperiences((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 경력 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>💼 경력사항</h2>
      <ul>{experiences.map((e) => (e?.attributes?.title ? <li key={e.id}>{e.attributes.title}</li> : null))}</ul>
    </div>
  );
};

export default ExperienceList;
