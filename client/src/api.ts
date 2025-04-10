// src/api.ts

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export const getProjects = () =>
  fetch(`${API_BASE}/api/projects?populate=*`)
    .then((res) => res.json())
    .then((res) => res.data);
export const getSkills = () =>
  fetch(`${API_BASE}/api/skills?populate=*`)
    .then((res) => res.json())
    .then((res) => res.data);
export const getExperiences = () =>
  fetch(`${API_BASE}/api/experiences?populate=*`)
    .then((res) => res.json())
    .then((res) => res.data);
export const getGalleries = () =>
  fetch(`${API_BASE}/api/galleries?populate=*`)
    .then((res) => res.json())
    .then((res) => res.data);
