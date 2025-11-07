import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user successfully', () => {
    const result = service.login('test@example.com', 'password');
    
    expect(result).toBe(true);
    expect(service.isLoggedIn()()).toBe(true);
    expect(service.getCurrentUser()()?.email).toBe('test@example.com');
    expect(service.getCurrentUser()()?.role).toBe('student');
  });

  it('should login admin user', () => {
    service.login('admin@example.com', 'password');
    
    expect(service.getCurrentUser()()?.role).toBe('admin');
    expect(service.isAdmin()).toBe(true);
  });

  it('should register user successfully', () => {
    const result = service.register('new@example.com', 'password', 'New User');
    
    expect(result).toBe(true);
    expect(service.isLoggedIn()()).toBe(true);
    expect(service.getCurrentUser()()?.name).toBe('New User');
  });

  it('should logout user', () => {
    service.login('test@example.com', 'password');
    service.logout();
    
    expect(service.isLoggedIn()()).toBe(false);
    expect(service.getCurrentUser()()).toBe(null);
  });

  it('should check admin role correctly', () => {
    service.login('user@example.com', 'password');
    expect(service.isAdmin()).toBe(false);
    
    service.login('admin@example.com', 'password');
    expect(service.isAdmin()).toBe(true);
  });
});