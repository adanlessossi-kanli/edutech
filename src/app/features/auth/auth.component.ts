import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-form">
        <h2>{{ isLogin() ? 'Login' : 'Register' }}</h2>

        <form (ngSubmit)="onSubmit()">
          @if (!isLogin()) {
            <input
              type="text"
              placeholder="Full Name"
              [(ngModel)]="name"
              name="name"
              required
              class="form-input"
            />
          }

          <input
            type="email"
            placeholder="Email"
            [(ngModel)]="email"
            name="email"
            required
            class="form-input"
          />

          <input
            type="password"
            placeholder="Password"
            [(ngModel)]="password"
            name="password"
            required
            class="form-input"
          />

          <button type="submit" class="submit-btn">
            {{ isLogin() ? 'Login' : 'Register' }}
          </button>
        </form>

        <p class="toggle-text">
          {{ isLogin() ? "Don't have an account?" : 'Already have an account?' }}
          <button type="button" (click)="toggleMode()" class="toggle-btn">
            {{ isLogin() ? 'Register' : 'Login' }}
          </button>
        </p>

        <p class="admin-hint">Use email with 'admin' for admin access</p>
      </div>
    </div>
  `,
  styles: [
    `
      .auth-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60vh;
        padding: 20px;
      }
      .auth-form {
        background: white;
        padding: 32px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }
      .auth-form h2 {
        text-align: center;
        margin-bottom: 24px;
        color: #333;
      }
      .form-input {
        width: 100%;
        padding: 12px;
        margin-bottom: 16px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
      }
      .submit-btn {
        width: 100%;
        background: #2563eb;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      .submit-btn:hover {
        background: #1d4ed8;
      }
      .toggle-text {
        text-align: center;
        margin-top: 16px;
        color: #666;
      }
      .toggle-btn {
        background: none;
        border: none;
        color: #2563eb;
        cursor: pointer;
        text-decoration: underline;
      }
      .admin-hint {
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 8px;
      }
    `,
  ],
})
export class AuthComponent {
  private authService = inject(AuthService);

  isLogin = signal(true);
  email = '';
  password = '';
  name = '';

  toggleMode() {
    this.isLogin.set(!this.isLogin());
  }

  onSubmit() {
    if (this.isLogin()) {
      this.authService.login(this.email, this.password);
    } else {
      this.authService.register(this.email, this.password, this.name);
    }
  }
}
