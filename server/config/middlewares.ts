export default [
  // 로그 미들웨어
  'strapi::logger',

  // 에러 처리 미들웨어
  'strapi::errors',

  // 보안 관련 설정 미들웨어 (CSP)
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'img-src': ["'self'", 'data:', 'https://yhj-work.vercel.app'],
          'script-src': ["'self'", "'unsafe-inline'", 'https://yhj-work.vercel.app'],
          'frame-src': ["'self'", 'https://yhj-work.vercel.app'],
        },
      },
    },
  },

  // CORS 설정 미들웨어
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://yhj-work.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization', 'Origin'],
      exposeHeaders: ['X-Total-Count'],
      credentials: true,
    },
  },

  // PoweredBy 헤더 미들웨어
  'strapi::poweredBy',

  // 쿼리 관련 설정 미들웨어
  'strapi::query',

  // 바디 파싱 미들웨어
  'strapi::body',

  // 세션 관련 미들웨어
  'strapi::session',

  // 파비콘 설정 미들웨어
  'strapi::favicon',

  // 정적 파일 관련 미들웨어
  'strapi::public',
];
