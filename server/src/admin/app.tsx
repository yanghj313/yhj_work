import type { StrapiApp } from '@strapi/strapi/admin';
import CloudinaryImageField from './components/CloudinaryImageField';

export default {
  config: {
    locales: [],
  },
  bootstrap(app) {
    console.log('✅ 커스텀 필드 등록 중...');
    app.addFields({
      type: 'cloudinary-image', // 👈 이 이름 중요!
      Component: CloudinaryImageField,
    });
  },
};
