import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => setGalleries(res.data.data || []))
      .catch((err) => console.error('❌ 갤러리 오류:', err));
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리</h2>
      <ul>
        {galleries.map((g) => {
          if (!g?.attributes) return null;
          const attr = g.attributes;
          const imageUrl = attr.image?.data?.attributes?.url;

          return (
            <li key={g.id}>
              <strong>{attr.title}</strong> ({attr.category})
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="갤러리 이미지"
                  width="120"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GalleryList;
