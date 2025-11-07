# EduTech Application Architecture

## Folder Structure

```
src/app/
├── core/                          # Singleton services and models
│   ├── models/                    # Data models and interfaces
│   │   ├── workshop.model.ts      # Workshop, User, Enrollment models
│   │   ├── enhanced.model.ts      # Review, Instructor, Payment, Progress, Notification
│   │   └── index.ts               # Barrel export
│   ├── services/                  # Core business logic services
│   │   ├── auth.service.ts        # Authentication & authorization
│   │   ├── workshop.service.ts    # Workshop management
│   │   ├── api.service.ts         # API communication layer
│   │   └── index.ts               # Barrel export
│   └── guards/                    # Route guards (future)
│
├── features/                      # Feature modules (lazy-loadable)
│   ├── auth/                      # Authentication feature
│   │   ├── auth.component.ts
│   │   └── auth.component.spec.ts
│   │
│   ├── workshops/                 # Workshop browsing & enrollment
│   │   ├── workshop-list.component.ts
│   │   ├── workshop-card.component.ts
│   │   ├── workshop-filters.component.ts
│   │   ├── workshop-reviews.component.ts
│   │   └── *.spec.ts
│   │
│   ├── dashboard/                 # User dashboard feature
│   │   ├── user-dashboard.component.ts
│   │   ├── progress-tracker.component.ts
│   │   ├── notifications.component.ts
│   │   └── *.spec.ts
│   │
│   ├── admin/                     # Admin management feature
│   │   ├── admin-workshop-form.component.ts
│   │   └── *.spec.ts
│   │
│   └── landing/                   # Landing & marketing pages
│       ├── landing.component.ts
│       ├── instructors.component.ts
│       ├── hands-on-learning.component.ts
│       ├── certificates.component.ts
│       ├── career-support.component.ts
│       ├── flexible-schedule.component.ts
│       ├── community.component.ts
│       └── *.spec.ts
│
├── shared/                        # Reusable components, pipes, directives
│   ├── components/                # Shared UI components
│   ├── pipes/                     # Custom pipes
│   └── directives/                # Custom directives
│
├── app.ts                         # Root component
├── app.config.ts                  # App configuration
└── app.routes.ts                  # Route definitions
```

## Architecture Principles

### 1. Feature-Based Organization
- Each feature is self-contained in its own folder
- Features can be lazy-loaded for better performance
- Clear separation of concerns

### 2. Core Module
- **Services**: Singleton services used across the app
- **Models**: Shared data models and interfaces
- **Guards**: Route protection (auth, role-based)

### 3. Shared Module
- Reusable UI components
- Custom pipes and directives
- No business logic

### 4. Component Strategy
- Standalone components (Angular 14+)
- Signal-based state management
- Inline templates for small components

## Best Practices Applied

✅ **Separation of Concerns**: Features, core, and shared are clearly separated
✅ **Single Responsibility**: Each service/component has one purpose
✅ **DRY Principle**: Shared code in core/shared folders
✅ **Scalability**: Easy to add new features without affecting existing code
✅ **Testability**: Each component/service has its own test file
✅ **Lazy Loading Ready**: Feature-based structure supports code splitting

## Import Patterns

```typescript
// Core imports
import { AuthService, WorkshopService } from '@app/core/services';
import { Workshop, User } from '@app/core/models';

// Feature imports
import { WorkshopListComponent } from '@app/features/workshops/workshop-list.component';

// Shared imports
import { CustomPipe } from '@app/shared/pipes/custom.pipe';
```

## Next Steps

1. Configure path aliases in `tsconfig.json` for cleaner imports
2. Implement proper routing with lazy loading
3. Add route guards for protected routes
4. Create shared components (buttons, cards, modals)
5. Add interceptors for HTTP requests
6. Implement state management if needed (NgRx/Signals)
