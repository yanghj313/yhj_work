export default [
	'strapi::logger',
	'strapi::errors',

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

	{
		name: 'strapi::cors',
		config: {
			enabled: true,
			origin: [
				'https://yhj-work.vercel.app',
				'https://yhj-work-git-main-yanghj313s-projects.vercel.app',
				'https://yhj-work-yanghj313s-projects.vercel.app',
				'http://localhost:3000',
				'http://localhost:5173',
			],
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization'],
			credentials: true,
		},
	},

	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
];
