export const environment = {
  production: true,
  apiUrl: 'https://api.edutech.com/api',
  apiTimeout: 15000,
  enableDebugTools: false,
  logLevel: 'error',
  features: {
    enableNotifications: true,
    enableAnalytics: true,
    enableOfflineMode: true,
  },
  auth: {
    tokenKey: 'edutech_auth_token',
    sessionTimeout: 3600000,
  },
  thirdParty: {
    analyticsId: 'PROD_ANALYTICS_ID',
    sentryDsn: 'PROD_SENTRY_DSN',
    stripePublicKey: 'PROD_STRIPE_KEY',
  },
};
