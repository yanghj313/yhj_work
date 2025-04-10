// config/middlewares.ts or config/middlewares.js
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173', // 로컬 React 앱 주소
        'https://yhjwork-production.up.railway.app', // 배포된 React 앱 주소
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메소드들
      headers: ['Content-Type', 'Authorization'], // 허용할 헤더들
      credentials: true, // 쿠키나 인증 토큰을 함께 보내는 경우 true로 설정
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
