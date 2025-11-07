import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { WorkshopReviewsComponent } from './workshop-reviews.component';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Review } from '../../core/models/enhanced.model';
import { User } from '../../core/models/workshop.model';

describe('WorkshopReviewsComponent', () => {
  let component: WorkshopReviewsComponent;
  let fixture: ComponentFixture<WorkshopReviewsComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let authService: jasmine.SpyObj<AuthService>;

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'student',
    enrolledWorkshops: [],
    completedWorkshops: []
  };

  const mockReviews: Review[] = [
    {
      id: '1',
      workshopId: '1',
      userId: '1',
      userName: 'John Doe',
      rating: 5,
      comment: 'Great workshop!',
      createdAt: new Date()
    }
  ];

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getReviews']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [WorkshopReviewsComponent, FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopReviewsComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.componentRef.setInput('workshopId', '1');
    apiService.getReviews.and.returnValue(Promise.resolve(mockReviews));
    authService.isLoggedIn.and.returnValue(signal(true));
    authService.getCurrentUser.and.returnValue(signal(mockUser));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reviews on init', async () => {
    await component.ngOnInit();
    
    expect(apiService.getReviews).toHaveBeenCalledWith('1');
    expect(component.reviews().length).toBe(1);
  });

  it('should set rating when star is clicked', () => {
    component.setRating(4);
    expect(component.newReview.rating).toBe(4);
  });

  it('should submit review when form is valid', () => {
    component.newReview.rating = 5;
    component.newReview.comment = 'Excellent workshop!';
    
    const initialCount = component.reviews().length;
    component.submitReview();
    
    expect(component.reviews().length).toBe(initialCount + 1);
    expect(component.newReview.rating).toBe(0);
    expect(component.newReview.comment).toBe('');
  });

  it('should not submit review when rating is missing', () => {
    component.newReview.rating = 0;
    component.newReview.comment = 'Great workshop!';
    
    const initialCount = component.reviews().length;
    component.submitReview();
    
    expect(component.reviews().length).toBe(initialCount);
  });

  it('should not submit review when comment is empty', () => {
    component.newReview.rating = 5;
    component.newReview.comment = '';
    
    const initialCount = component.reviews().length;
    component.submitReview();
    
    expect(component.reviews().length).toBe(initialCount);
  });

  it('should display reviews', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    
    const reviewItems = fixture.nativeElement.querySelectorAll('.review-item');
    expect(reviewItems.length).toBe(1);
    
    const reviewerName = fixture.nativeElement.querySelector('.reviewer-name');
    expect(reviewerName.textContent).toBe('John Doe');
  });

  it('should show add review form when logged in', () => {
    fixture.detectChanges();
    
    const addReviewSection = fixture.nativeElement.querySelector('.add-review');
    expect(addReviewSection).toBeTruthy();
  });

  it('should not show add review form when not logged in', () => {
    authService.isLoggedIn.and.returnValue(signal(false));
    fixture.detectChanges();
    
    const addReviewSection = fixture.nativeElement.querySelector('.add-review');
    expect(addReviewSection).toBeFalsy();
  });

  it('should display star ratings correctly', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    
    const filledStars = fixture.nativeElement.querySelectorAll('.star.filled');
    expect(filledStars.length).toBe(5); // 5-star rating
  });

  it('should show no reviews message when empty', () => {
    component.reviews.set([]);
    fixture.detectChanges();
    
    const noReviews = fixture.nativeElement.querySelector('.no-reviews');
    expect(noReviews).toBeTruthy();
    expect(noReviews.textContent).toContain('No reviews yet');
  });
});
