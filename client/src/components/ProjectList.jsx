import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // axios로 프로젝트 리스트 가져오기
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('✅ 프로젝트 데이터:', res.data);
        setProjects(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 프로젝트 데이터 오류:', err);
      });
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
