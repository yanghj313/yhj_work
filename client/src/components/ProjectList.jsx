import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        setProjects((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 프로젝트 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>📁 프로젝트 목록</h2>
      <ul>
        {projects.map((p) =>
          p?.title ? (
            <li key={p.id}>
              <Link to={`/project/${p.id}`}>{p.title}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
