import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337'; // 환경 변수 + fallback

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        // ✅ 여기! setProjects 전에 넣어야 데이터 구조 확인 가능
        console.log('🔥 프로젝트 실제 데이터:', res.data.data);
  
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
