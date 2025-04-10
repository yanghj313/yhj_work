import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSkills } from '../api';

const SkillList = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getSkills().then(setSkills);
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
