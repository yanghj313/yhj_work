import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true, // 💡 반드시 true로 (JS/CSS 모두)
		cssCodeSplit: true, // 💡 CSS도 파일별로 나뉘게
		rollupOptions: {
			output: {
				entryFileNames: 'entries/[name]-[hash].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
				assetFileNames: assetInfo => {
					if (assetInfo.name?.endsWith('.css')) {
						return 'styles/[name]-[hash][extname]'; // 💡 파일 이름 유지
					}
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
	},
	css: {
		devSourcemap: true, // 개발 중에도 원본 추적 가능
	},
});
