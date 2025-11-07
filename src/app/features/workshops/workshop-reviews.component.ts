import { Component, input, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Review } from '../../core/models/enhanced.model';

@Component({
  selector: 'app-workshop-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="reviews-container">
      <h3>Reviews & Ratings</h3>
      
      @if (authService.isLoggedIn()()) {
        <div class="add-review">
          <h4>Add Your Review</h4>
          <div class="rating-input">
            @for (star of [1,2,3,4,5]; track star) {
              <button 
                (click)="setRating(star)" 
                class="star-btn"
                [class.active]="star <= newReview.rating">
                ★
              </button>
            }
          </div>
          <textarea 
            [(ngModel)]="newReview.comment" 
            placeholder="Share your experience..."
            class="review-textarea"></textarea>
          <button (click)="submitReview()" class="submit-btn">Submit Review</button>
        </div>
      }

      <div class="reviews-list">
        @for (review of reviews(); track review.id) {
          <div class="review-item">
            <div class="review-header">
              <span class="reviewer-name">{{ review.userName }}</span>
              <div class="rating">
                @for (star of [1,2,3,4,5]; track star) {
                  <span class="star" [class.filled]="star <= review.rating">★</span>
                }
              </div>
            </div>
            <p class="review-comment">{{ review.comment }}</p>
            <span class="review-date">{{ review.createdAt | date:'short' }}</span>
          </div>
        } @empty {
          <p class="no-reviews">No reviews yet. Be the first to review!</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .reviews-container {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-top: 20px;
    }
    .add-review {
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }
    .rating-input {
      margin: 10px 0;
    }
    .star-btn {
      background: none;
      border: none;
      font-size: 24px;
      color: #d1d5db;
      cursor: pointer;
    }
    .star-btn.active {
      color: #fbbf24;
    }
    .review-textarea {
      width: 100%;
      min-height: 80px;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .submit-btn {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    .review-item {
      border-bottom: 1px solid #f3f4f6;
      padding: 16px 0;
    }
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .reviewer-name {
      font-weight: 600;
    }
    .rating .star {
      color: #d1d5db;
    }
    .rating .star.filled {
      color: #fbbf24;
    }
    .review-comment {
      margin: 8px 0;
      color: #374151;
    }
    .review-date {
      font-size: 12px;
      color: #6b7280;
    }
    .no-reviews {
      text-align: center;
      color: #6b7280;
      font-style: italic;
    }
  `]
})
export class WorkshopReviewsComponent implements OnInit {
  workshopId = input.required<string>();
  
  private apiService = inject(ApiService);
  protected authService = inject(AuthService);
  
  reviews = signal<Review[]>([]);
  newReview = { rating: 0, comment: '' };

  async ngOnInit() {
    const reviews = await this.apiService.getReviews(this.workshopId());
    this.reviews.set(reviews);
  }

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  submitReview() {
    if (this.newReview.rating && this.newReview.comment.trim()) {
      const review: Review = {
        id: Date.now().toString(),
        workshopId: this.workshopId(),
        userId: this.authService.getCurrentUser()()?.id || '',
        userName: this.authService.getCurrentUser()()?.name || '',
        rating: this.newReview.rating,
        comment: this.newReview.comment,
        createdAt: new Date()
      };
      
      this.reviews.update(reviews => [review, ...reviews]);
      this.newReview = { rating: 0, comment: '' };
    }
  }
}