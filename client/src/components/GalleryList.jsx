import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/galleries`)
      .then((res) => {
        setGalleries((res.data.data || []).filter(Boolean));
      })
      .catch((err) => {
        console.error('❌ 갤러리 데이터 오류:', err.message);
      });
  }, []);

  return (
    <div>
      <h2>🖼 갤러리</h2>
      <ul>{galleries.map((g) => (g?.title ? <li key={g.id}>{g.title}</li> : null))}</ul>
    </div>
  );
};

export default GalleryList;
