export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5173'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      headers: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query', // ✅ 이 줄 꼭 필요!!
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
