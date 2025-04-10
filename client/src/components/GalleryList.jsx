import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const GalleryList = () => {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    // axios로 갤러리 목록 가져오기
    axios
      .get(`${API_BASE}/api/galleries?populate=*`)
      .then((res) => {
        console.log('✅ 갤러리 데이터:', res.data);
        setGalleries(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 갤러리 데이터 오류:', err);
      });
  }, []);

  return (
    <div>
      <h2>🖼️ 갤러리 목록</h2>
      <ul>
        {galleries.map((g) => (
          <li key={g.id}>
            <Link to={`/gallery/${g.id}`}>{g.attributes.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GalleryList;
