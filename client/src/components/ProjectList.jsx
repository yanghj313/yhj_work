import { useEffect, useState } from 'react';
import { getProjects } from '../api';

const ProjectList = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>📁 프로젝트 목록</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
