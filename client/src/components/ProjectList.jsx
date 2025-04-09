import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/projects?populate=*')
      .then((res) => {
        console.log('📦 API 응답:', res.data); // 구조 확인용
        setProjects(res.data?.data || []);
      })
      .catch((err) => console.error('❌ 데이터 불러오기 실패:', err));
  }, []);

  return (
    <div>
      <h2>📁 Project</h2>
      <ul>
        {projects.map((project) => {
          const id = project?.id;
          const attributes = project?.attributes || {};
          const title = attributes.title || '제목 없음';
          const description = attributes.description || '설명 없음';

          return (
            <li key={id}>
              <Link to={`/project/${id}`}>
                <h3>{title}</h3>
              </Link>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectList;
