import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExperienceDetail } from './api';

const ExperienceDetail = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    if (id) getExperienceDetail(id).then(setExperience);
  }, [id]);

  if (!experience) return <p>Loading...</p>;

  const { title, description } = experience.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ExperienceDetail;
