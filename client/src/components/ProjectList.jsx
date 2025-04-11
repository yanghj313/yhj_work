import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => setProjects(res.data.data))
      .catch((err) => console.error('❌ 프로젝트 오류:', err));
  }, []);

  return (
    <div>
      <h2>📁 프로젝트</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.attributes.title}</strong>
            <br />
            {p.attributes.thumbnail?.data?.attributes?.url && (
              <img
                src={p.attributes.thumbnail.data.attributes.url}
                alt="썸네일"
                width="120"
              />
            )}
            <p>{p.attributes.period}</p>
            <a
              href={p.attributes.link}
              target="_blank"
              rel="noreferrer">
              🔗 사이트 바로가기
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
