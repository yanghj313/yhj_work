import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => {
        console.log('🔥 갤러리 데이터:', res.data.data);
        setGalleries((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 갤러리 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리</h2>
      <ul>
        {galleries.map((g) =>
          g?.title ? (
            <li
              key={g.id}
              style={{ marginBottom: '2rem' }}>
              {/* 이미지 먼저 */}
              {g.image?.url && (
                <div>
                  <img
                    src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`}
                    alt={g.image.name || '갤러리 이미지'}
                    width="240"
                    style={{ marginBottom: '0.5rem', borderRadius: '8px' }}
                  />
                </div>
              )}

              <strong>
                {' '}
                <Link to={`/gallery/${g.documentId}`}>{g.title}</Link>
              </strong>
              {g.category && <p>📂 카테고리: {g.category}</p>}
              <ul style={{ paddingLeft: '1rem' }}>
                {g.description &&
                  g.description
                    .replace(/<[^>]+>/g, '')
                    .split(/\n|\r|\r\n/)
                    .filter(Boolean)
                    .map((line, idx) => <li key={idx}>{line}</li>)}
              </ul>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default GalleryList;
