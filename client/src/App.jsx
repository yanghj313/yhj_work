import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'https://yhjwork-production.up.railway.app';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/projects?populate=*`)
      .then((res) => {
        console.log('✅ 프로젝트 데이터:', res.data.data);
        setProjects(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ 프로젝트 데이터 오류:', err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>📭 데이터 로딩 중...</p>;

  return (
    <div className="App">
      <h1>📁 프로젝트 목록</h1>
      <ul>{projects.map((p) => (p?.attributes?.title ? <li key={p.id}>{p.attributes.title}</li> : null))}</ul>
    </div>
  );
}

export default App;
