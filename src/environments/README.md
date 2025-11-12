# Environment Configuration

## Setup

1. Copy `.env.example` to `.env.development`:
```bash
cp .env.example .env.development
```

2. Update values in `.env.development` for local development

3. For staging/production, create `.env.staging` and `.env.production` with appropriate values

## Files

- `.env.example` - Template with all available variables
- `.env.development` - Development environment variables (gitignored)
- `.env.staging` - Staging environment variables (gitignored)
- `.env.production` - Production environment variables (gitignored)
- `environment.ts` - Generated from env files
- `environment.staging.ts` - Staging fallback
- `environment.prod.ts` - Production fallback

## Usage

### Development
```bash
npm start  # Automatically runs config:dev
```

### Generate Config Manually
```bash
npm run config:dev      # Development
npm run config:staging  # Staging
npm run config:prod     # Production
```

### Build
```bash
npm run build           # Production
npm run build:staging   # Staging
```

## Environment Variables

### API Configuration
- `API_URL` - Backend API base URL
- `API_TIMEOUT` - Request timeout in milliseconds

### Feature Flags
- `ENABLE_NOTIFICATIONS` - Enable notifications feature
- `ENABLE_ANALYTICS` - Enable analytics tracking
- `ENABLE_OFFLINE_MODE` - Enable offline support

### Authentication
- `AUTH_TOKEN_KEY` - LocalStorage key for auth token
- `SESSION_TIMEOUT` - Session timeout in milliseconds

### Third-party Services
- `ANALYTICS_ID` - Analytics tracking ID
- `SENTRY_DSN` - Sentry error tracking DSN
- `STRIPE_PUBLIC_KEY` - Stripe public key

### Application
- `LOG_LEVEL` - Logging level (debug, warn, error)
- `ENABLE_DEBUG_TOOLS` - Enable Angular debug tools

## Security

- Never commit `.env.*` files (except `.env.example`)
- Use CI/CD secrets for staging/production variables
- Rotate secrets regularly
