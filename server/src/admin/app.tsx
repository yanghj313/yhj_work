import CloudinaryImageField from './components/CloudinaryImageField';

import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  bootstrap(app: StrapiApp) {
    app.addFields({
      type: 'cloudinary-image',
      Component: CloudinaryImageField,
    });
  },
};
