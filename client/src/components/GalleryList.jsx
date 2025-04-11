import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => {
        setGalleries(
          (res.data.data || []).map((g) => ({
            id: g.id,
            ...g.attributes,
            image: g.attributes.image?.data?.attributes,
          }))
        );
      })
      .catch((err) => {
        console.error('❌ 갤러리 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리</h2>
      <ul>
        {galleries.map((g) => (
          <li key={g.id}>
            <strong>{g.title}</strong> ({g.category})<br />
            {g.image?.url && (
              <img
                src={API_BASE + g.image.url}
                alt={g.image.name || '갤러리 이미지'}
                width="160"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
