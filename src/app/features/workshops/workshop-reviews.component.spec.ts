import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { WorkshopReviewsComponent } from './workshop-reviews.component';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';

describe('WorkshopReviewsComponent', () => {
  let component: WorkshopReviewsComponent;
  let fixture: ComponentFixture<WorkshopReviewsComponent>;
  let mockApiService: any;
  let mockAuthService: any;

  beforeEach(async () => {
    mockApiService = {
      getReviews: jasmine.createSpy().and.returnValue(Promise.resolve([])),
    };
    mockAuthService = {
      isLoggedIn: jasmine.createSpy().and.returnValue(signal(true)),
      getCurrentUser: jasmine.createSpy().and.returnValue(signal({ id: '1', name: 'Test' })),
    };

    await TestBed.configureTestingModule({
      imports: [WorkshopReviewsComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopReviewsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('workshopId', '1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set rating', () => {
    component.setRating(5);
    expect(component.newReview.rating).toBe(5);
  });

  it('should submit review', () => {
    component.newReview = { rating: 5, comment: 'Great' };
    component.submitReview();
    expect(component.reviews().length).toBe(1);
  });
});
