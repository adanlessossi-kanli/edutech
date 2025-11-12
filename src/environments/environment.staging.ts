export const environment = {
  production: true,
  apiUrl: 'https://staging-api.edutech.com/api',
  apiTimeout: 20000,
  enableDebugTools: true,
  logLevel: 'warn',
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
    analyticsId: 'STAGING_ANALYTICS_ID',
    sentryDsn: 'STAGING_SENTRY_DSN',
    stripePublicKey: 'STAGING_STRIPE_KEY',
  },
};
