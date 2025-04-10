import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import SkillList from './pages/SkillList';
import SkillDetail from './pages/SkillDetail';
import ExperienceList from './pages/ExperienceList';
import ExperienceDetail from './pages/ExperienceDetail';
import GalleryList from './pages/GalleryList';
import GalleryDetail from './pages/GalleryDetail';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ProjectList />}
        />

        <Route
          path="/projects"
          element={<ProjectList />}
        />
        <Route
          path="/project/:id"
          element={<ProjectDetail />}
        />

        <Route
          path="/skills"
          element={<SkillList />}
        />
        <Route
          path="/skill/:id"
          element={<SkillDetail />}
        />

        <Route
          path="/experiences"
          element={<ExperienceList />}
        />
        <Route
          path="/experience/:id"
          element={<ExperienceDetail />}
        />

        <Route
          path="/galleries"
          element={<GalleryList />}
        />
        <Route
          path="/gallery/:id"
          element={<GalleryDetail />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
