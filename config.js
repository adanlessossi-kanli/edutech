const fs = require('fs');
const path = require('path');

const envFile = process.env.ENV_FILE || '.env.development';
const envPath = path.resolve(__dirname, envFile);

const config = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=');
      config[key] = value;
    }
  });
}

const envConfig = {
  production: process.env.PRODUCTION === 'true' || config.PRODUCTION === 'true',
  apiUrl: process.env.API_URL || config.API_URL || 'http://localhost:3000/api',
  apiTimeout: parseInt(process.env.API_TIMEOUT || config.API_TIMEOUT || '30000'),
  enableDebugTools: (process.env.ENABLE_DEBUG_TOOLS || config.ENABLE_DEBUG_TOOLS || 'true') === 'true',
  logLevel: process.env.LOG_LEVEL || config.LOG_LEVEL || 'debug',
  features: {
    enableNotifications: (process.env.ENABLE_NOTIFICATIONS || config.ENABLE_NOTIFICATIONS || 'true') === 'true',
    enableAnalytics: (process.env.ENABLE_ANALYTICS || config.ENABLE_ANALYTICS || 'false') === 'true',
    enableOfflineMode: (process.env.ENABLE_OFFLINE_MODE || config.ENABLE_OFFLINE_MODE || 'true') === 'true'
  },
  auth: {
    tokenKey: process.env.AUTH_TOKEN_KEY || config.AUTH_TOKEN_KEY || 'edutech_auth_token',
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || config.SESSION_TIMEOUT || '3600000')
  },
  thirdParty: {
    analyticsId: process.env.ANALYTICS_ID || config.ANALYTICS_ID || '',
    sentryDsn: process.env.SENTRY_DSN || config.SENTRY_DSN || '',
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || config.STRIPE_PUBLIC_KEY || ''
  }
};

const targetPath = path.resolve(__dirname, 'src/environments/environment.ts');
const content = `export const environment = ${JSON.stringify(envConfig, null, 2)};
`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log(`Environment file generated at ${targetPath}`);
