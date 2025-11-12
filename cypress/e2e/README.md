# E2E Test Suite Documentation

## Test Categories

### 1. Smoke Tests (`smoke-tests.cy.ts`)
Critical path tests that verify basic functionality:
- Application loads
- Navigation works
- Login/logout functionality
- Core features accessible

### 2. Complete User Journey (`complete-user-journey.cy.ts`)
End-to-end user flows:
- Registration to enrollment
- Workshop browsing and filtering
- Complete user lifecycle

### 3. Admin Complete Flow (`admin-complete-flow.cy.ts`)
Admin-specific workflows:
- Workshop creation
- Workshop management
- Admin dashboard access

### 4. Edge Cases (`edge-cases.cy.ts`)
Error scenarios and boundary conditions:
- Invalid credentials
- Empty search results
- Network errors
- Session timeout
- Form validation

### 5. Security Tests (`security.cy.ts`)
Security vulnerability checks:
- XSS prevention
- SQL injection prevention
- Authentication enforcement
- Input sanitization
- CSRF protection

### 6. API Integration (`api-integration.cy.ts`)
Backend integration tests:
- API response handling
- Rate limiting
- Retry logic
- Timeout handling
- Error responses

### 7. Cross-Browser (`cross-browser.cy.ts`)
Multi-device and viewport testing:
- Desktop, laptop, tablet, mobile
- Orientation changes
- Responsive design

### 8. Internationalization (`internationalization.cy.ts`)
Multi-language support:
- Language switching
- Translation verification
- RTL support
- Locale-specific formatting

### 9. State Management (`state-management.cy.ts`)
Application state handling:
- Session persistence
- State synchronization
- Navigation state
- Form state restoration

### 10. Data Persistence (`data-persistence.cy.ts`)
Data storage and retrieval:
- Enrollment data
- User preferences
- Progress tracking
- Offline sync

### 11. Load Testing (`load-testing.cy.ts`)
Performance under load:
- Large datasets
- Pagination
- Lazy loading
- Rapid interactions
- Concurrent operations

### 12. Visual Regression (`visual-regression.cy.ts`)
UI consistency checks:
- Screenshot comparisons
- Layout verification
- Responsive layouts

### 13. Regression Suite (`regression-suite.cy.ts`)
Tests for previously fixed bugs:
- Authentication issues
- Workshop management
- Search functionality
- Form validation

### 14. Integration Tests (`integration-tests.cy.ts`)
Component interaction tests:
- User-workshop integration
- Admin-workshop integration
- Search-filter integration
- Notification-action integration

## Running Tests

### Run all tests
```bash
npm run e2e
```

### Run specific test file
```bash
npx cypress run --spec "cypress/e2e/smoke-tests.cy.ts"
```

### Run tests in headed mode
```bash
npm run e2e:open
```

### Run tests by tag
```bash
npx cypress run --spec "cypress/e2e/*smoke*.cy.ts"
```

## Test Data

Test fixtures are located in `cypress/fixtures/`:
- `test-data.json` - User credentials
- `workshops.json` - Workshop test data

## Page Objects

Reusable page objects in `cypress/support/page-objects/`:
- `auth.page.ts` - Authentication pages
- `workshops.page.ts` - Workshop listing
- `admin.page.ts` - Admin panel
- `dashboard.page.ts` - User dashboard
- `enrollment.page.ts` - Enrollment flows

## Custom Commands

Custom Cypress commands in `cypress/support/commands.ts`:
- `cy.login(email, password)` - Login with credentials
- `cy.loginAsAdmin()` - Quick admin login
- `cy.loginAsUser()` - Quick user login
- `cy.logout()` - Logout
- `cy.register(name, email, password)` - Register new user
- `cy.enrollInWorkshop(title)` - Enroll in workshop
- `cy.createWorkshop(data)` - Create workshop (admin)
- `cy.waitForPageLoad()` - Wait for page ready
- `cy.checkAccessibility()` - Basic a11y checks

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Use `afterEach` to clean up state
3. **Fixtures**: Use fixtures for test data
4. **Page Objects**: Use page objects for reusability
5. **Custom Commands**: Create commands for common actions
6. **Assertions**: Use meaningful assertions
7. **Waits**: Avoid hard waits, use cy.wait() with aliases
8. **Selectors**: Use data-* attributes for stability

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Main branch commits
- Scheduled nightly runs

## Reporting

Test results are available:
- Console output
- Video recordings in `cypress/videos/`
- Screenshots in `cypress/screenshots/`
- HTML reports (if configured)
