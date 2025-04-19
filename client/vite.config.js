import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		sourcemap: true, // ✅ JS, CSS map 파일 생성
		cssCodeSplit: true, // ✅ CSS 파일을 컴포넌트 단위로 분리
		rollupOptions: {
			output: {
				entryFileNames: 'entries/[name]-[hash].js', // JS 엔트리
				chunkFileNames: 'chunks/[name]-[hash].js', // JS 청크
				assetFileNames: assetInfo => {
					if (assetInfo.name && assetInfo.name.endsWith('.css')) {
						return 'styles/[name]-[hash][extname]'; // ✅ CSS 파일은 styles 폴더로
					}
					return 'assets/[name]-[hash][extname]'; // 나머지 자산
				},
			},
		},
	},
	css: {
		devSourcemap: true, // ✅ 개발환경에서도 CSS map 사용
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
