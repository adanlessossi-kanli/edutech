import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="error-container">
      <div class="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <button (click)="goHome()" class="home-btn">Go to Home</button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
    }
    .error-content {
      text-align: center;
      max-width: 500px;
    }
    h1 {
      font-size: 120px;
      margin: 0;
      color: #2563eb;
    }
    h2 {
      font-size: 32px;
      margin: 16px 0;
      color: #333;
    }
    p {
      font-size: 18px;
      color: #666;
      margin-bottom: 32px;
    }
    .home-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .home-btn:hover {
      background: #1d4ed8;
    }
  `]
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
