import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <h2>User Settings</h2>
      <form>
        <label>
          <input type="checkbox" name="emailNotifications" [(ngModel)]="emailNotifications" />
          Email Notifications
        </label>
        <button type="button" (click)="save()">Save</button>
      </form>
    </div>
  `,
  styles: [
    `
      .settings-container {
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
      }
      label {
        display: block;
        margin: 16px 0;
      }
      button {
        padding: 8px 16px;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `,
  ],
})
export class UserSettingsComponent {
  emailNotifications = signal(false);

  ngOnInit() {
    const saved = localStorage.getItem('emailNotifications');
    if (saved) this.emailNotifications.set(saved === 'true');
  }

  save() {
    localStorage.setItem('emailNotifications', String(this.emailNotifications()));
  }
}
