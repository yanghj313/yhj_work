import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => setProjects(res.data.data || []))
      .catch((err) => console.error('❌ 프로젝트 오류:', err));
  }, []);

  return (
    <div>
      <h2>📁 프로젝트 목록</h2>
      <ul>
        {projects.map((p) => {
          if (!p?.attributes) return null;

          const attr = p.attributes;
          const imgUrl = attr.thumbnail?.data?.attributes?.url;

          return (
            <li key={p.id}>
              <strong>{attr.title}</strong>
              <br />
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={attr.title}
                  width="120"
                />
              )}
              <p>{attr.period}</p>
              {attr.link && (
                <a
                  href={attr.link}
                  target="_blank"
                  rel="noreferrer">
                  🔗 바로가기
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
