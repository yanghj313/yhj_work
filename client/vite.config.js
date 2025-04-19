import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		cssCodeSplit: true, // ✅ CSS 분리 필수
		sourcemap: true,
		rollupOptions: {
			output: {
				assetFileNames: info => {
					if (info.name?.endsWith('.css')) return 'styles/[name]-[hash][extname]';
					return 'assets/[name]-[hash][extname]';
				},
			},
		},
	},
	css: {
		devSourcemap: true, // 개발 중에도 원본 추적 가능
	},
});
