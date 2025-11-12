import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { App } from './app';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/workshop.model';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'student',
    enrolledWorkshops: [],
    completedWorkshops: []
  };

  const mockAdmin: User = {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    enrolledWorkshops: [],
    completedWorkshops: []
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getCurrentUser', 'isAdmin', 'logout']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.isLoggedIn.and.returnValue(signal(false));
    authService.getCurrentUser.and.returnValue(signal(null));
    authService.isAdmin.and.returnValue(false);

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
    expect(component['title']()).toBe('EduTech Pro');
  });

  it('should initialize with landing view', () => {
    expect(component.currentView()).toBe('landing');
  });

  it('should show login button when not logged in', () => {
    authService.isLoggedIn.and.returnValue(signal(false));
    fixture.detectChanges();
    
    const loginBtn = fixture.nativeElement.querySelector('button[class*="nav-btn"]:last-child');
    expect(loginBtn.textContent.trim()).toBe('Login');
  });

  it('should show user info when logged in', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    authService.isAdmin.and.returnValue(false);
    fixture.detectChanges();
    
    const userInfo = fixture.nativeElement.querySelector('.user-info');
    expect(userInfo.textContent).toBe('Test User');
  });

  it('should show logout button when logged in', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    authService.isAdmin.and.returnValue(false);
    fixture.detectChanges();
    
    const logoutBtn = fixture.nativeElement.querySelector('.logout-btn');
    expect(logoutBtn.textContent).toBe('Logout');
  });

  it('should show publish button for admin users', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockAdmin));
    authService.isAdmin.and.returnValue(true);
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.nav-btn');
    const publishBtn = Array.from(buttons).find((btn: any) => btn.textContent.trim() === 'Publish');
    expect(publishBtn).toBeTruthy();
  });

  it('should not show publish button for regular users', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    authService.isAdmin.and.returnValue(false);
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.nav-btn');
    const publishBtn = Array.from(buttons).find((btn: any) => btn.textContent.includes('Publish'));
    expect(publishBtn).toBeFalsy();
  });

  it('should show dashboard button when logged in', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    authService.isAdmin.and.returnValue(false);
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.nav-btn');
    const dashboardBtn = Array.from(buttons).find((btn: any) => btn.textContent.trim() === 'Dashboard');
    expect(dashboardBtn).toBeTruthy();
  });

  it('should navigate to different views', () => {
    component.showLanding();
    expect(component.currentView()).toBe('landing');
    
    component.showWorkshops();
    expect(component.currentView()).toBe('workshops');
    
    component.showAuth();
    expect(component.currentView()).toBe('auth');
    
    component.showDashboard();
    expect(component.currentView()).toBe('dashboard');
    
    component.showAdmin();
    expect(component.currentView()).toBe('admin');
  });

  it('should call logout service and reset view', () => {
    component.showDashboard();
    
    component.logout();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(component.currentView()).toBe('workshops');
  });

  it('should display landing by default', () => {
    authService.isLoggedIn.and.returnValue(signal(false));
    fixture.detectChanges();
    
    const landing = fixture.nativeElement.querySelector('app-landing');
    expect(landing).toBeTruthy();
  });

  it('should display auth component when in auth view', () => {
    component.showAuth();
    fixture.detectChanges();
    
    const authComponent = fixture.nativeElement.querySelector('app-auth');
    expect(authComponent).toBeTruthy();
  });

  it('should display dashboard when logged in and in dashboard view', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    component.showDashboard();
    fixture.detectChanges();
    
    const dashboard = fixture.nativeElement.querySelector('app-user-dashboard');
    expect(dashboard).toBeTruthy();
  });

  it('should display admin form when admin and in admin view', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockAdmin));
    authService.isAdmin.and.returnValue(true);
    component.showAdmin();
    fixture.detectChanges();
    
    const adminForm = fixture.nativeElement.querySelector('app-admin-workshop-form');
    expect(adminForm).toBeTruthy();
  });

  it('should highlight active navigation button', () => {
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    authService.isAdmin.and.returnValue(false);
    component.showDashboard();
    fixture.detectChanges();
    
    const buttons = fixture.nativeElement.querySelectorAll('.nav-btn');
    const dashboardBtn = Array.from(buttons).find((btn: any) => btn.textContent.trim() === 'Dashboard');
    expect(dashboardBtn).toBeTruthy();
    expect((dashboardBtn as HTMLElement).classList.contains('active')).toBe(true);
  });
});