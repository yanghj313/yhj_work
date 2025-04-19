import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true, // ✅ 이걸 꼭 true로 설정해야 배포본에 소스맵이 포함됨
		rollupOptions: {
			output: {
				// 파일 단위로 나뉘게끔 설정 가능 (선택 사항)
				chunkFileNames: 'chunks/[name]-[hash].js',
				entryFileNames: 'entries/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]',
			},
		},
	},
	css: {
		devSourcemap: true,
	},
	server: {
		host: true,
		port: 5173,
		strictPort: true,
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5173,
		},
	},
});
