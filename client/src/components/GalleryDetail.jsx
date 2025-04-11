import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryDetail = () => {
  const { id } = useParams();
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    if (id) {
      console.log('🆔 현재 상세 페이지 ID:', id);
      axios
        .get(`${API_BASE}/api/galleries?filters[documentId][$eq]=${id}&populate=*`)
        .then((res) => {
          const data = res.data.data;
          if (Array.isArray(data) && data.length > 0) {
            setGalleries(data);
          } else {
            console.warn('🚫 갤러리 항목 없음');
            setGalleries([]);
          }
        })
        .catch((err) => {
          console.error('❌ 갤러리 상세 오류:', err.message);
        });
    }
  }, [id]);

  return (
    <div style={{ padding: '1rem' }}>
      {galleries.map((g) =>
        g?.title ? (
          <div key={g.id}>
            <h2>{g.title}</h2>

            {/* 이미지가 있을 경우 */}
            {g.image?.url && (
              <div>
                <img
                  src={g.image.url.startsWith('http') ? g.image.url : `${API_BASE}${g.image.url}`}
                  alt={g.image.name || '갤러리 이미지'}
                  style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '1rem' }}
                />
              </div>
            )}

            {g.category && <p>📂 분류: {g.category}</p>}

            <Link to="/galleries">← 목록으로</Link>
          </div>
        ) : null
      )}
    </div>
  );
};

export default GalleryDetail;
