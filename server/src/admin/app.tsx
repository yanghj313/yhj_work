import type { StrapiApp } from '@strapi/strapi/admin';
import CloudinaryImageField from './components/CloudinaryImageField';

export default {
  config: {
    locales: [], // 필요한 언어가 있으면 여기에 추가
  },

  bootstrap(app: StrapiApp) {
    app.addFields({
      type: 'cloudinary-image',
      Component: CloudinaryImageField,
    });

    console.log('✅ Strapi Admin bootstrap complete');
  },
};
