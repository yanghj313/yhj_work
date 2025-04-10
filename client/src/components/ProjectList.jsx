import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]); // ✅ JSX에서는 타입 제거!

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  return (
    <div>
      <h2>📁 프로젝트 목록</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link to={`/project/${p.id}`}>{p.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
