import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/projects?populate=*')
      .then((res) => {
        console.log('✅ API 응답:', res.data);
        setProjects(res.data?.data || []);
      })
      .catch((err) => console.error('❌ 에러:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>📁 프로젝트 목록</h2>

      {projects.length === 0 ? (
        <p>⛔ 등록된 프로젝트가 없습니다.</p>
      ) : (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
          {projects.map((project) => {
            const id = project?.id;
            const attributes = project?.attributes;

            if (!attributes) return null;

            const { title = '제목 없음', description = '설명 없음', role, skills, link, period, thumbnail } = attributes;

            const thumbnailUrl = thumbnail?.data?.attributes?.url ? `http://localhost:1337${thumbnail.data.attributes.url}` : 'https://via.placeholder.com/300x200?text=No+Image';

            return (
              <li
                key={id}
                style={{
                  width: '300px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <img
                  src={thumbnailUrl}
                  alt={title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h3 style={{ margin: '16px 0 8px 0' }}>{title}</h3>
                <p style={{ flexGrow: 1 }}>{description}</p>
                {role && (
                  <p>
                    <strong>역할:</strong> {role}
                  </p>
                )}
                {skills && (
                  <p>
                    <strong>기술:</strong> {skills}
                  </p>
                )}
                {period && (
                  <p>
                    <strong>기간:</strong> {period}
                  </p>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '10px', color: '#007acc' }}>
                    🔗 프로젝트 링크
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;
