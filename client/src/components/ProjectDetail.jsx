import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_BASE}/api/projects/${id}?populate=*`)
        .then((res) => {
          console.log('✅ 상세 프로젝트 데이터:', res.data);
          setProject(res.data.data);
        })
        .catch((err) => {
          console.error('❌ 상세 프로젝트 데이터 오류:', err);
        });
    }
  }, [id]);

  if (!project) return <p>📭 프로젝트 정보를 불러오는 중...</p>;

  const { title, description } = project.attributes;

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProjectDetail;
