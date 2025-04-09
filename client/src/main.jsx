import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Header from './components/Header.jsx';
import ProjectList from './components/ProjectList.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
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
          path="/project/:id"
          element={<ProjectDetail />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
