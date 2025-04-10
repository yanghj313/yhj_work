import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:1337';
console.log('✅ 현재 API 주소:', API_BASE);

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

// 공통 요청 함수 (axios로)
const getData = async <T>(endpoint: string): Promise<StrapiItem<T>[]> => {
  try {
    const res = await axios.get<StrapiResponse<T>>(`${API_BASE}${endpoint}?populate=*`);
    return res.data.data;
  } catch (error) {
    console.error(`❌ ${endpoint} 호출 실패:`, error);
    return [];
  }
};

// API 함수들
export const getProjects = () => getData<Project>('/api/projects');
export const getSkills = () => getData<Skill>('/api/skills');
export const getExperiences = () => getData<Experience>('/api/experiences');
export const getGalleries = () => getData<Gallery>('/api/galleries');
