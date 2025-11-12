export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  enableDebugTools: true,
  logLevel: 'debug',
  features: {
    enableNotifications: true,
    enableAnalytics: false,
    enableOfflineMode: true,
  },
  auth: {
    tokenKey: 'edutech_auth_token',
    sessionTimeout: 3600000,
  },
  thirdParty: {
    analyticsId: '',
    sentryDsn: '',
    stripePublicKey: '',
  },
  cdn: {
    baseUrl: '',
    enabled: false,
  },
};
