import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import SkillList from './components/SkillList';
import SkillDetail from './components/SkillDetail';
import ExperienceList from './components/ExperienceList';
import ExperienceDetail from './components/ExperienceDetail';
import GalleryList from './components/GalleryList';
import GalleryDetail from './components/GalleryDetail';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<App />}
        />
        <Route
          path="/projects"
          element={<ProjectList />}
        />
        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />{' '}
        {/* ✅ 여기 복수형 */}
        <Route
          path="/skills"
          element={<SkillList />}
        />
        <Route
          path="/skills/:id"
          element={<SkillDetail />}
        />
        <Route
          path="/experiences"
          element={<ExperienceList />}
        />
        <Route
          path="/experiences/:id"
          element={<ExperienceDetail />}
        />
        <Route
          path="/galleries"
          element={<GalleryList />}
        />
        <Route
          path="/galleries/:id"
          element={<GalleryDetail />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
