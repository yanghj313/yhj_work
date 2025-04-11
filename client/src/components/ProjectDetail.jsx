import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects/${id}?populate=*`)
      .then((res) => {
        setProjects([res.data.data]); // 배열로 감싸서 map 돌리게
      })
      .catch((err) => {
        console.error('❌ 프로젝트 상세 오류:', err.message);
      });
  }, [id]);

  return (
    <div style={{ padding: '1rem' }}>
      {projects.map((p) =>
        p?.title ? (
          <div key={p.id}>
            <h2>{p.title}</h2>

            {p.role && <p>👤 역할: {p.role}</p>}
            {p.period && <p>📅 작업 기간: {p.period}</p>}
            {p.link && (
              <p>
                🔗{' '}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  프로젝트 링크
                </a>
              </p>
            )}

            {p.images?.length > 0 && (
              <div>
                <h4>🖼 상세 이미지</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {p.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.url.startsWith('http') ? img.url : `${API_BASE}${img.url}`}
                      alt={img.name}
                      style={{ width: '200px', borderRadius: '6px' }}
                    />
                  ))}
                </div>
              </div>
            )}

            {Array.isArray(p.description) && p.description.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h4>📘 설명</h4>
                {p.description.map((block, idx) => {
                  if (block.type === 'paragraph') {
                    return <p key={idx}>{block.children.map((c) => c.text).join('')}</p>;
                  }
                  if (block.type === 'heading') {
                    return <h3 key={idx}>{block.children.map((c) => c.text).join('')}</h3>;
                  }
                  return null;
                })}
              </div>
            )}

            <br />
            <Link to="/projects">← 목록으로</Link>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ProjectDetail;
