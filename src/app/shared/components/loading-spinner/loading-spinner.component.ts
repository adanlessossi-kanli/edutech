import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="spinner-container" [ngClass]="'spinner-' + size">
      <div class="spinner"></div>
      @if (message) {
        <p class="spinner-message">{{ message }}</p>
      }
    </div>
  `,
  styles: [
    `
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }
      .spinner {
        border: 3px solid #f3f3f3;
        border-top: 3px solid #2196f3;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      .spinner-small .spinner {
        width: 20px;
        height: 20px;
        border-width: 2px;
      }
      .spinner-medium .spinner {
        width: 40px;
        height: 40px;
      }
      .spinner-large .spinner {
        width: 60px;
        height: 60px;
        border-width: 4px;
      }
      .spinner-message {
        color: #666;
        font-size: 14px;
        margin: 0;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message?: string;
}
