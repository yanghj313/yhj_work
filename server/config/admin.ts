export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'someAdminJwtSecret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'yourVerySecretSalt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'yourSuperSecretTransferSalt'),
    },
  },
});
