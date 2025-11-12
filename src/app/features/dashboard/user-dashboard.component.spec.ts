import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { UserDashboardComponent } from './user-dashboard.component';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/workshop.model';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'student',
    enrolledWorkshops: [],
    completedWorkshops: [],
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [UserDashboardComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.getCurrentUser.and.returnValue(signal(mockUser));

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user welcome message', () => {
    fixture.detectChanges();

    const welcomeMessage = fixture.nativeElement.querySelector('h1');
    expect(welcomeMessage.textContent).toContain('Welcome back, Test User!');
  });

  it('should load user progress on init', () => {
    component.ngOnInit();

    expect(component.userProgress().length).toBeGreaterThan(0);
    expect(component.enrolledCount()).toBeGreaterThan(0);
  });

  it('should calculate stats correctly', () => {
    component.ngOnInit();

    expect(component.enrolledCount()).toBe(2);
    expect(component.completedCount()).toBe(1);
    expect(component.certificatesCount()).toBe(1);
  });

  it('should display stats cards', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const statCards = fixture.nativeElement.querySelectorAll('.stat-card');
    expect(statCards.length).toBe(3);

    const statValues = fixture.nativeElement.querySelectorAll('.stat-card h3');
    expect(statValues[0].textContent).toBe('2'); // enrolled
    expect(statValues[1].textContent).toBe('1'); // completed
    expect(statValues[2].textContent).toBe('1'); // certificates
  });

  it('should display stat labels', () => {
    fixture.detectChanges();

    const statLabels = fixture.nativeElement.querySelectorAll('.stat-card p');
    expect(statLabels[0].textContent).toBe('Enrolled Workshops');
    expect(statLabels[1].textContent).toBe('Completed');
    expect(statLabels[2].textContent).toBe('Certificates');
  });

  it('should include progress tracker component', () => {
    fixture.detectChanges();

    const progressTracker = fixture.nativeElement.querySelector('app-progress-tracker');
    expect(progressTracker).toBeTruthy();
  });

  it('should include notifications component', () => {
    fixture.detectChanges();

    const notifications = fixture.nativeElement.querySelector('app-notifications');
    expect(notifications).toBeTruthy();
  });

  it('should have responsive layout', () => {
    fixture.detectChanges();

    const dashboardContent = fixture.nativeElement.querySelector('.dashboard-content');
    expect(dashboardContent).toBeTruthy();

    const mainContent = fixture.nativeElement.querySelector('.main-content');
    const sidebarContent = fixture.nativeElement.querySelector('.sidebar-content');

    expect(mainContent).toBeTruthy();
    expect(sidebarContent).toBeTruthy();
  });

  it('should display stats grid', () => {
    fixture.detectChanges();

    const statsGrid = fixture.nativeElement.querySelector('.stats-grid');
    expect(statsGrid).toBeTruthy();
  });

  it('should handle user with no progress', () => {
    fixture.detectChanges();

    component.userProgress.set([]);
    component.enrolledCount.set(0);
    component.completedCount.set(0);
    component.certificatesCount.set(0);

    fixture.detectChanges();

    const statValues = fixture.nativeElement.querySelectorAll('.stat-card h3');
    expect(statValues[0].textContent).toBe('0');
    expect(statValues[1].textContent).toBe('0');
    expect(statValues[2].textContent).toBe('0');
  });
});
