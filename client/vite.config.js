import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 외부 접근 허용
    port: 5173, // 포트 고정
    strictPort: true, // 포트 충돌 시 실패 (자동 변경 막음)
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
