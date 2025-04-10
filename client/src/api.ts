const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';
console.log('✅ 현재 API 주소:', API_BASE); // ←

// 공통 타입
type StrapiItem<T> = {
  id: number;
  attributes: T;
};

type StrapiResponse<T> = {
  data: StrapiItem<T>[];
};

// 각 항목의 속성 타입 정의
type Project = {
  title: string;
  description?: string;
};

type Skill = {
  name: string;
  level?: string;
};

type Experience = {
  title: string;
  description?: string;
};

type Gallery = {
  title: string;
  description?: string;
};

// API 함수들
export const getProjects = async (): Promise<StrapiItem<Project>[]> => {
  const res = await fetch(`${API_BASE}/api/projects?populate=*`);
  const json: StrapiResponse<Project> = await res.json();
  return json.data;
};

export const getSkills = async (): Promise<StrapiItem<Skill>[]> => {
  const res = await fetch(`${API_BASE}/api/skills?populate=*`);
  const json: StrapiResponse<Skill> = await res.json();
  return json.data;
};

export const getExperiences = async (): Promise<StrapiItem<Experience>[]> => {
  const res = await fetch(`${API_BASE}/api/experiences?populate=*`);
  const json: StrapiResponse<Experience> = await res.json();
  return json.data;
};

export const getGalleries = async (): Promise<StrapiItem<Gallery>[]> => {
  const res = await fetch(`${API_BASE}/api/galleries?populate=*`);
  const json: StrapiResponse<Gallery> = await res.json();
  return json.data;
};
