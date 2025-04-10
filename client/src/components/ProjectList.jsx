import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 환경 변수 또는 기본값 설정
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('🔥 프로젝트 실제 데이터:', res.data.data); // 👉 콘솔 확인용
        setProjects((res.data.data || []).filter(Boolean)); // null 방지
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
          ) : (
            <li key={p?.id || Math.random()}>❌ 데이터 없음</li>
          )
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
