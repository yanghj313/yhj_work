import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('✅ 프로젝트 데이터:', res.data);
        setProjects(res.data.data || []);
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
          p?.attributes?.title ? (
            <li key={p.id}>
              <Link to={`/project/${p.id}`}>{p.attributes.title}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
