import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => {
        console.log('🔥갤러리 데이터:', res.data.data);
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
                <img
                  src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`}
                  alt={g.image.name || '갤러리 이미지'}
                  width="240"
                  style={{ display: 'block', marginBottom: '0.5rem' }}
                />
              )}
              <strong>{g.title}</strong> {g.category && `(${g.category})`}
              <br />
              {g.description && <p>{g.description}</p>}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default GalleryList;
