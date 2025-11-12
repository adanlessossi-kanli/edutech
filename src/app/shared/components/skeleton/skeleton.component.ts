import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'skeleton skeleton-' + type",
    '[style.width]': 'width',
    '[style.height]': 'height',
  },
  template: ``,
  styles: [
    `
      :host {
        display: block;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
        border-radius: 4px;
      }
      :host(.skeleton-text) {
        height: 16px;
        margin-bottom: 8px;
      }
      :host(.skeleton-title) {
        height: 24px;
        margin-bottom: 12px;
      }
      :host(.skeleton-avatar) {
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
      :host(.skeleton-card) {
        height: 200px;
      }
      :host(.skeleton-button) {
        height: 40px;
        width: 120px;
      }
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
})
export class SkeletonComponent {
  @Input() type: 'text' | 'title' | 'avatar' | 'card' | 'button' = 'text';
  @Input() width?: string;
  @Input() height?: string;
}
