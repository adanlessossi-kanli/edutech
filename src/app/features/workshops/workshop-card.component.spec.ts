import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { WorkshopCardComponent } from './workshop-card.component';
import { AuthService } from '../../core/services/auth.service';
import { WorkshopService } from '../../core/services/workshop.service';
import { Workshop, User } from '../../core/models/workshop.model';

describe('WorkshopCardComponent', () => {
  let component: WorkshopCardComponent;
  let fixture: ComponentFixture<WorkshopCardComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let workshopService: jasmine.SpyObj<WorkshopService>;

  const mockWorkshop: Workshop = {
    id: '1',
    title: 'Test Workshop',
    description: 'Test Description',
    instructor: 'Test Instructor',
    duration: 120,
    price: 99,
    category: 'Testing',
    level: 'Beginner',
    maxParticipants: 20,
    currentParticipants: 5,
    startDate: new Date(),
    endDate: new Date(),
    tags: ['test'],
    isLive: false
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'student',
    enrolledWorkshops: [],
    completedWorkshops: []
  };

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'isLoggedIn']);
    const workshopServiceSpy = jasmine.createSpyObj('WorkshopService', ['enrollUser']);

    await TestBed.configureTestingModule({
      imports: [WorkshopCardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: WorkshopService, useValue: workshopServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopCardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    workshopService = TestBed.inject(WorkshopService) as jasmine.SpyObj<WorkshopService>;

    fixture.componentRef.setInput('workshop', mockWorkshop);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display workshop information', () => {
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('h3');
    const instructor = fixture.nativeElement.querySelector('.instructor');
    const price = fixture.nativeElement.querySelector('.price');
    
    expect(title.textContent).toBe('Test Workshop');
    expect(instructor.textContent).toBe('by Test Instructor');
    expect(price.textContent).toBe('$99');
  });

  it('should show live badge for live workshops', () => {
    const liveWorkshop = { ...mockWorkshop, isLive: true };
    fixture.componentRef.setInput('workshop', liveWorkshop);
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const liveBadge = fixture.nativeElement.querySelector('.live-badge');
    expect(liveBadge).toBeTruthy();
    expect(liveBadge.textContent).toBe('LIVE');
  });

  it('should not show live badge for non-live workshops', () => {
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const liveBadge = fixture.nativeElement.querySelector('.live-badge');
    expect(liveBadge).toBeFalsy();
  });

  it('should show "Login to Enroll" when user not logged in', () => {
    authService.getCurrentUser.and.returnValue(signal(null));
    fixture.detectChanges();
    
    const buttonText = component.getEnrollButtonText();
    expect(buttonText).toBe('Login to Enroll');
  });

  it('should show "Full" when workshop is at capacity', () => {
    const fullWorkshop = { ...mockWorkshop, currentParticipants: 20 };
    fixture.componentRef.setInput('workshop', fullWorkshop);
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const buttonText = component.getEnrollButtonText();
    expect(buttonText).toBe('Full');
  });

  it('should show "Enroll Now" when user can enroll', () => {
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const buttonText = component.getEnrollButtonText();
    expect(buttonText).toBe('Enroll Now');
  });

  it('should allow enrollment when conditions are met', () => {
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const canEnroll = component.canEnroll();
    expect(canEnroll).toBe(true);
  });

  it('should not allow enrollment when user not logged in', () => {
    authService.getCurrentUser.and.returnValue(signal(null));
    fixture.detectChanges();
    
    const canEnroll = component.canEnroll();
    expect(canEnroll).toBe(false);
  });

  it('should not allow enrollment when workshop is full', () => {
    const fullWorkshop = { ...mockWorkshop, currentParticipants: 20 };
    fixture.componentRef.setInput('workshop', fullWorkshop);
    authService.getCurrentUser.and.returnValue(signal(mockUser));
    fixture.detectChanges();
    
    const canEnroll = component.canEnroll();
    expect(canEnroll).toBe(false);
  });

  it('should toggle reviews visibility', () => {
    expect(component.showReviews()).toBe(false);
    
    component.toggleReviews();
    expect(component.showReviews()).toBe(true);
    
    component.toggleReviews();
    expect(component.showReviews()).toBe(false);
  });
});
