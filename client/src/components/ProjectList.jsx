import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('🔥 프로젝트 데이터:', res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => console.error('❌ 프로젝트 오류:', err));
  }, []);

  return (
    <div>
      <h2>📁 프로젝트</h2>
      <ul>
        {projects.map((p) => {
          const attr = p.attributes;
          const thumbnailUrl = attr.thumbnail?.data?.attributes?.url;

          return (
            <li
              key={p.id}
              style={{ marginBottom: '2rem' }}>
              <strong>{attr.title}</strong>
              <br />
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt={attr.title || '썸네일'}
                  width="120"
                />
              )}
              {attr.period && <p>{attr.period}</p>}
              {attr.link && (
                <a
                  href={attr.link}
                  target="_blank"
                  rel="noreferrer">
                  🔗 프로젝트 바로가기
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProjectList;
