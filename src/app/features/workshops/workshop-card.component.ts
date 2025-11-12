import { Component, input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workshop } from '../../core/models/workshop.model';
import { AuthService } from '../../core/services/auth.service';
import { WorkshopService } from '../../core/services/workshop.service';

@Component({
  selector: 'app-workshop-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="workshop-card">
      <div class="workshop-header">
        <h3>{{ workshop().title }}</h3>
        <span class="live-badge" *ngIf="workshop().isLive">LIVE</span>
      </div>
      <p class="instructor">by {{ workshop().instructor }}</p>
      <p class="description">{{ workshop().description }}</p>
      <div class="workshop-meta">
        <span class="category">{{ workshop().category }}</span>
        <span class="level">{{ workshop().level }}</span>
        <span class="duration">{{ workshop().duration }}min</span>
      </div>
      <div class="workshop-footer">
        <span class="price">\${{ workshop().price }}</span>
        <span class="participants"
          >{{ workshop().currentParticipants }}/{{ workshop().maxParticipants }}</span
        >
      </div>
      <div class="workshop-actions">
        <button class="enroll-btn" (click)="onEnroll()" [disabled]="!canEnroll()">
          {{ getEnrollButtonText() }}
        </button>
        <button (click)="toggleReviews()" class="reviews-btn">
          {{ showReviews() ? 'Hide' : 'Show' }} Reviews
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .workshop-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 20px;
        margin: 16px 0;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
      }
      .workshop-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
      .workshop-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }
      .workshop-header h3 {
        margin: 0;
        color: #333;
      }
      .live-badge {
        background: #ff4444;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
      }
      .instructor {
        color: #666;
        margin: 4px 0;
        font-style: italic;
      }
      .description {
        color: #555;
        margin: 12px 0;
        line-height: 1.4;
      }
      .workshop-meta {
        display: flex;
        gap: 12px;
        margin: 12px 0;
      }
      .workshop-meta span {
        background: #f0f0f0;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
      }
      .workshop-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
      }
      .price {
        font-size: 18px;
        font-weight: bold;
        color: #2196f3;
      }
      .participants {
        color: #666;
        font-size: 14px;
      }
      .workshop-actions {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }
      .enroll-btn {
        flex: 1;
        background: #2196f3;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      }
      .reviews-btn {
        background: #6b7280;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
      }
      .reviews-btn:hover {
        background: #4b5563;
      }
      .enroll-btn:hover:not(:disabled) {
        background: #1976d2;
      }
      .enroll-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    `,
  ],
})
export class WorkshopCardComponent {
  workshop = input.required<Workshop>();
  private authService = inject(AuthService);
  private workshopService = inject(WorkshopService);

  showPayment = signal(false);
  showReviews = signal(false);
  isEnrolled = signal(false);

  constructor() {
    // Listen for payment close event
    window.addEventListener('closePayment', () => {
      this.showPayment.set(false);
    });
  }

  canEnroll(): boolean {
    const user = this.authService.getCurrentUser()();
    const workshop = this.workshop();
    return !!user && workshop.currentParticipants < workshop.maxParticipants && !this.isEnrolled();
  }

  getEnrollButtonText(): string {
    const user = this.authService.getCurrentUser()();
    const workshop = this.workshop();

    if (!user) return 'Login to Enroll';
    if (this.isEnrolled()) return 'Enrolled';
    if (workshop.currentParticipants >= workshop.maxParticipants) return 'Full';
    return 'Enroll Now';
  }

  onEnroll() {
    const user = this.authService.getCurrentUser()();
    if (user && this.canEnroll()) {
      this.isEnrolled.set(true);
      this.workshopService.enrollUser(this.workshop().id, user.id);
      this.showPayment.set(true);
    }
  }

  toggleReviews() {
    this.showReviews.update((show) => !show);
  }
}
