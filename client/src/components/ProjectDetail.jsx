import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const ProjectDetail = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (id) {
      console.log('🆔 현재 상세 페이지 ID:', id); // <- 콘솔 찍어보기
      axios
        .get(`${API_BASE}/api/projects?filters[documentId][$eq]=${id}&populate=*`)
        .then((res) => {
          const data = res.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data); // 배열로 set
          } else {
            console.warn('🚫 프로젝트를 찾을 수 없음');
            setProjects([]);
          }
        })
        .catch((err) => {
          console.error('❌ 프로젝트 상세 오류:', err.message);
        });
    }
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
                  const childrenText = Array.isArray(block.children) ? block.children.map((c) => c.text).join('') : '';

                  switch (block.type) {
                    case 'heading':
                    case 'heading-one':
                    case 'heading-two':
                      return <h3 key={idx}>{childrenText}</h3>;

                    case 'paragraph':
                      return <p key={idx}>{childrenText}</p>;

                    case 'list':
                    case 'bulleted-list':
                    case 'numbered-list':
                      return (
                        <ul key={idx}>
                          {block.children?.map((li, i) => (
                            <li key={i}>{Array.isArray(li.children) ? li.children.map((c) => c.text).join('') : ''}</li>
                          ))}
                        </ul>
                      );

                    case 'quote':
                      return <blockquote key={idx}>{childrenText}</blockquote>;

                    default:
                      return <p key={idx}>{childrenText}</p>;
                  }
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
