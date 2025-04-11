import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt } from 'react-icons/fa';

// 아이콘 이미지 경로 (실제 경로로 수정)
const photoshopIcon = '/path/to/photoshop-icon.png'; // 실제 경로로 수정
const illustratorIcon = '/path/to/illustrator-icon.png'; // 실제 경로로 수정

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const getIcon = (tag) => {
  switch (tag.toLowerCase()) {
    case 'react':
      return <FaReact />;
    case 'javascript':
      return <FaJsSquare />;
    case 'html':
      return <FaHtml5 />;
    case 'css':
      return <FaCss3Alt />;
    case 'photoshop':
      return (
        <img
          src={photoshopIcon}
          alt="Photoshop"
          style={{ width: '24px', height: '24px' }}
        />
      );
    case 'illustrator':
      return (
        <img
          src={illustratorIcon}
          alt="Illustrator"
          style={{ width: '24px', height: '24px' }}
        />
      );
    default:
      return <span>{tag}</span>; // 아이콘이 없으면 텍스트로 태그 출력
  }
};

const TagIcons = ({ tags }) => {
  // 쉼표나 띄어쓰기로 구분된 태그를 배열로 변환
  const tagArray = tags.split(' ').map((tag) => tag.trim());

  return (
    <div>
      {tagArray.map((tag, index) => (
        <span
          key={index}
          style={{ display: 'inline-flex', alignItems: 'center', margin: '0 8px' }}>
          {getIcon(tag)} {/* 아이콘 출력 또는 텍스트 출력 */}
          <span style={{ marginLeft: '4px' }}>{tag}</span> {/* 태그 텍스트 출력 */}
        </span>
      ))}
    </div>
  );
};

// ProjectList 컴포넌트: 프로젝트 목록을 가져와서 표시
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
              {/* 썸네일 */}
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

              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  🔗 프로젝트 바로가기
                </a>
              )}
              <br />

              {p.role && <p>👤 역할: {p.role}</p>}
              {p.period && <p>🗓️ 작업 기간: {p.period}</p>}

              {/* 아이콘 형태로 태그 출력 */}
              {p.tags && <TagIcons tags={p.tags} />}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
