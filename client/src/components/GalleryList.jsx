import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => setGalleries(res.data.data))
      .catch((err) => console.error('❌ 갤러리 오류:', err));
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리</h2>
      <ul>
        {galleries.map((g) => (
          <li key={g.id}>
            <strong>{g.attributes.title}</strong> ({g.attributes.category})
            {g.attributes.image?.data?.attributes?.url && (
              <img
                src={g.attributes.image.data.attributes.url}
                alt="갤러리 이미지"
                width="120"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
