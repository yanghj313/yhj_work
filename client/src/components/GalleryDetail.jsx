import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const GalleryDetail = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE}/api/galleries/${id}?populate=*`)
        .then((res) => {
          console.log('✅ 상세 갤러리 데이터:', res.data);
          setGallery(res.data.data);
        })
        .catch((err) => {
          console.error('❌ 상세 갤러리 데이터 오류:', err);
        });
    }
  }, [id]);

  if (!gallery) return <p>📭 갤러리 정보를 불러오는 중...</p>;

  const { title, description } = gallery.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default GalleryDetail;
