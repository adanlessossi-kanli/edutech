import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Notification } from '../../core/models/enhanced.model';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notifications-container">
      <div class="notifications-header">
        <h3>Notifications</h3>
        <button (click)="markAllAsRead()" class="mark-read-btn">Mark All Read</button>
      </div>
      
      @if (notifications().length === 0) {
        <div class="no-notifications">
          <p>No notifications yet.</p>
        </div>
      } @else {
        @for (notification of notifications(); track notification.id) {
          <div class="notification-item" [class.unread]="!notification.read">
            <div class="notification-icon">
              {{ getNotificationIcon(notification.type) }}
            </div>
            <div class="notification-content">
              <h4>{{ notification.title }}</h4>
              <p>{{ notification.message }}</p>
              <span class="notification-time">{{ notification.createdAt | date:'short' }}</span>
            </div>
            @if (!notification.read) {
              <button (click)="markAsRead(notification)" class="read-btn">✓</button>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .notifications-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-height: 400px;
      overflow-y: auto;
    }
    .notifications-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .notifications-header h3 {
      margin: 0;
    }
    .mark-read-btn {
      background: #6b7280;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .notification-item {
      display: flex;
      align-items: flex-start;
      padding: 16px 20px;
      border-bottom: 1px solid #f3f4f6;
      transition: background 0.2s;
    }
    .notification-item:hover {
      background: #f9fafb;
    }
    .notification-item.unread {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
    }
    .notification-icon {
      font-size: 20px;
      margin-right: 12px;
      margin-top: 2px;
    }
    .notification-content {
      flex: 1;
    }
    .notification-content h4 {
      margin: 0 0 4px 0;
      font-size: 14px;
      color: #374151;
    }
    .notification-content p {
      margin: 0 0 4px 0;
      font-size: 13px;
      color: #6b7280;
    }
    .notification-time {
      font-size: 11px;
      color: #9ca3af;
    }
    .read-btn {
      background: #10b981;
      color: white;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 12px;
    }
    .no-notifications {
      padding: 40px 20px;
      text-align: center;
      color: #6b7280;
    }
  `]
})
export class NotificationsComponent implements OnInit {
  private authService = inject(AuthService);
  
  notifications = signal<Notification[]>([]);

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        userId: '1',
        type: 'workshop_reminder',
        title: 'Workshop Starting Soon',
        message: 'Your "Advanced React Patterns" workshop starts in 1 hour.',
        read: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: '2',
        userId: '1',
        type: 'new_workshop',
        title: 'New Workshop Available',
        message: 'Check out the new "Vue.js Masterclass" workshop.',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '3',
        userId: '1',
        type: 'completion',
        title: 'Workshop Completed',
        message: 'Congratulations! You completed "Node.js Fundamentals".',
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ];
    
    this.notifications.set(mockNotifications);
  }

  getNotificationIcon(type: string): string {
    const icons = {
      'workshop_reminder': '⏰',
      'new_workshop': '🆕',
      'completion': '🎉',
      'payment': '💳'
    };
    return icons[type as keyof typeof icons] || '📢';
  }

  markAsRead(notification: Notification) {
    notification.read = true;
    this.notifications.update(notifications => [...notifications]);
  }

  markAllAsRead() {
    this.notifications.update(notifications => 
      notifications.map(n => ({ ...n, read: true }))
    );
  }
}