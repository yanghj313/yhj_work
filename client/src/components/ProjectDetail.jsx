import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectDetail = () => {
  const { id } = useParams();
  const [p, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects/${id}?populate=*`)
      .then((res) => {
        setProject(res.data.data?.attributes || null);
      })
      .catch((err) => {
        console.error('❌ 상세 프로젝트 오류:', err.message);
      });
  }, [id]);

  if (!p) return <p>📭 상세 데이터를 불러오는 중...</p>;

  return (
    <div style={{ padding: '1rem' }}>
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

      {p.images?.data?.length > 0 && (
        <div>
          <h4>🖼 상세 이미지</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {p.images.data.map((img) => (
              <img
                key={img.id}
                src={img.attributes.url.startsWith('http') ? img.attributes.url : `${API_BASE}${img.attributes.url}`}
                alt={img.attributes.name}
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
  );
};

export default ProjectDetail;
