import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <li
              key={p.id}
              style={{ marginBottom: '2rem' }}>
              {/* 썸네일 먼저 */}
              {p.thumbnail?.url && (
                <div>
                  <img
                    src={p.thumbnail.url.startsWith('http') ? p.thumbnail.url : `${API_BASE}${p.thumbnail.url}`}
                    alt={p.thumbnail.name || '프로젝트 이미지'}
                    width="240"
                    style={{ marginBottom: '0.5rem', borderRadius: '8px' }}
                  />
                </div>
              )}

              <strong>
                <Link to={`/projects/${p.documentId}`}>{p.title}</Link>
              </strong>
              <br />

              {p.role && <p>👤 역할: {p.role}</p>}
              {p.period && <p>🗓️ 작업 기간: {p.period}</p>}

              {/* 태그 텍스트만 li로 출력 */}
              {p.tags && (
                <ul style={{ paddingLeft: '1rem' }}>
                  {p.tags.split(',').map((tag, index) => {
                    const trimmedTag = tag.trim(); // 공백 제거
                    return <li key={index}>{trimmedTag}</li>; // 태그 텍스트만 li로 출력
                  })}
                </ul>
              )}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
