import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSkillDetail } from './api';

const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    if (id) getSkillDetail(id).then(setSkill);
  }, [id]);

  if (!skill) return <p>Loading...</p>;

  const { name, level } = skill.attributes;

  return (
    <div>
      <h2>{name}</h2>
      <p>숙련도: {level}</p>
    </div>
  );
};

export default SkillDetail;
