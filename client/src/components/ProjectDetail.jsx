import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { id } = useParams(); // 주소에서 /project/:id → id 추출
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:1337/api/projects/${id}?populate=*`)
      .then((res) => {
        console.log('✅ 상세 API 응답:', res.data);
        setProject(res.data.data);
      })
      .catch((err) => {
        console.error('❌ 상세 데이터 실패:', err);
      });
  }, [id]);

  if (!project) return <p>📭 프로젝트 정보를 불러오는 중...</p>;

  const { title, description } = project.attributes;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProjectDetail;
