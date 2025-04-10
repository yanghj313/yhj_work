import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/skills?populate=*`)
      .then((res) => {
        setSkills((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 스킬 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>⚙️ 스킬</h2>
      <ul>{skills.map((s) => (s?.attributes?.name ? <li key={s.id}>{s.attributes.name}</li> : null))}</ul>
    </div>
  );
};

export default SkillList;
