import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'https://yhjwork-production.up.railway.app'; // Strapi API 주소

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios로 프로젝트 데이터 가져오기
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('✅ 프로젝트 데이터:', res.data);
        setProjects(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 프로젝트 데이터 오류:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>📭 데이터 로딩 중...</p>;

  return (
    <div className="App">
      <h1>📁 프로젝트 목록</h1>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.attributes.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
