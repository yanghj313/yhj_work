// src/components/ExperienceList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '../api';

const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    getExperiences().then(setExperiences);
  }, []);

  return (
    <div>
      <h2>💼 경험 목록</h2>
      <ul>
        {experiences.map((e) => (
          <li key={e.id}>
            <Link to={`/experience/${e.id}`}>{e.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
