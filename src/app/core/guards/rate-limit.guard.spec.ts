import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { rateLimitGuard } from './rate-limit.guard';

describe('rateLimitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should allow first request', () => {
    const route = { routeConfig: { path: 'test' } } as ActivatedRouteSnapshot;
    const result = TestBed.runInInjectionContext(() => rateLimitGuard(route, {} as any));
    expect(result).toBe(true);
  });

  it('should allow requests within limit', () => {
    const route = { routeConfig: { path: 'test-limit' } } as ActivatedRouteSnapshot;
    
    for (let i = 0; i < 50; i++) {
      const result = TestBed.runInInjectionContext(() => rateLimitGuard(route, {} as any));
      expect(result).toBe(true);
    }
  });

  it('should block requests exceeding limit', () => {
    const route = { routeConfig: { path: 'test-exceed' } } as ActivatedRouteSnapshot;
    
    for (let i = 0; i < 100; i++) {
      TestBed.runInInjectionContext(() => rateLimitGuard(route, {} as any));
    }
    
    const result = TestBed.runInInjectionContext(() => rateLimitGuard(route, {} as any));
    expect(result).toBe(false);
  });
});
