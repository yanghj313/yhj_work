/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // 추가적인 환경 변수를 여기에 선언
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
