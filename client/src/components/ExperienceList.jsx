import { useEffect, useState } from 'react';
import { getExperiences } from './api';

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
          <li key={e.id}>{e.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceList;
