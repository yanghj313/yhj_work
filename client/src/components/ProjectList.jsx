import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('🔥 프로젝트 데이터:', res.data.data);
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
            <li key={p.id} style={{ marginBottom: '2rem' }}>
              <strong>{p.title}</strong>
              <br />

              {/* 프로젝트 링크 */}
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  🔗 프로젝트 바로가기
                </a>
              )}
              <br />

              {/* 썸네일 이미지 */}
              {p.thumbnail?.url && (
                <div>
                  <img
                    src={API_BASE + p.thumbnail.url}
                    alt={p.thumbnail.name || '프로젝트 이미지'}
                    width="240"
                    style={{ marginTop: '0.5rem', borderRadius: '8px' }}
                  />
                </div>
              )}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
