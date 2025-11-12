import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { WorkshopCardComponent } from './workshop-card.component';
import { AuthService } from '../../core/services/auth.service';
import { WorkshopService } from '../../core/services/workshop.service';

describe('WorkshopCardComponent', () => {
  let component: WorkshopCardComponent;
  let fixture: ComponentFixture<WorkshopCardComponent>;
  let mockAuthService: any;
  let mockWorkshopService: any;

  beforeEach(async () => {
    mockAuthService = {
      getCurrentUser: jasmine.createSpy().and.returnValue(signal({ id: '1', name: 'Test' })),
    };
    mockWorkshopService = jasmine.createSpyObj('WorkshopService', ['enroll']);

    await TestBed.configureTestingModule({
      imports: [WorkshopCardComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: WorkshopService, useValue: mockWorkshopService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('workshop', {
      id: '1',
      title: 'Test',
      description: 'Desc',
      instructor: 'John',
      duration: 60,
      price: 100,
      category: 'Tech',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 5,
      startDate: new Date(),
      endDate: new Date(),
      tags: [],
      isLive: true,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user can enroll', () => {
    expect(component.canEnroll()).toBe(true);
  });

  it('should get enroll button text', () => {
    expect(component.getEnrollButtonText()).toBe('Enroll Now');
  });

  it('should toggle reviews', () => {
    component.toggleReviews();
    expect(component.showReviews()).toBe(true);
  });
});
