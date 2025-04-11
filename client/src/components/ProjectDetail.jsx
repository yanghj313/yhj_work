import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects/${id}?populate=*`)
      .then((res) => {
        console.log('🔥 상세 데이터:', res.data.data);
        setProject(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 상세 프로젝트 오류:', err.message);
      });
  }, [id]);

  if (!project) return <p>📭 상세 데이터를 불러오는 중...</p>;

  const data = project.attributes;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{data.title}</h2>

      {/* 역할, 기간, 링크 */}
      {data.role && <p>👤 역할: {data.role}</p>}
      {data.period && <p>📅 작업 기간: {data.period}</p>}
      {data.link && (
        <p>
          🔗{' '}
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer">
            프로젝트 링크
          </a>
        </p>
      )}

      {/* 이미지들 출력 */}
      {data.images?.data?.length > 0 && (
        <div>
          <h4>🖼 상세 이미지</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.images.data.map((img) => {
              const url = img.attributes.url;
              return (
                <img
                  key={img.id}
                  src={url.startsWith('http') ? url : `${API_BASE}${url}`}
                  alt={img.attributes.name}
                  style={{ width: '200px', borderRadius: '6px' }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Rich Text 설명 */}
      {Array.isArray(data.description) && data.description.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>📘 설명</h4>
          {data.description.map((block, idx) => {
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
