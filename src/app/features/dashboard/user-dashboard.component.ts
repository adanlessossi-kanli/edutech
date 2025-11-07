import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ProgressTrackerComponent } from './progress-tracker.component';
import { NotificationsComponent } from './notifications.component';
import { Progress } from '../../core/models/enhanced.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ProgressTrackerComponent, NotificationsComponent],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Welcome back, {{ currentUser()?.name }}!</h1>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ enrolledCount() }}</h3>
            <p>Enrolled Workshops</p>
          </div>
          <div class="stat-card">
            <h3>{{ completedCount() }}</h3>
            <p>Completed</p>
          </div>
          <div class="stat-card">
            <h3>{{ certificatesCount() }}</h3>
            <p>Certificates</p>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="main-content">
          <app-progress-tracker [userProgress]="userProgress()"></app-progress-tracker>
        </div>
        
        <div class="sidebar-content">
          <app-notifications></app-notifications>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .dashboard-header h1 {
      margin-bottom: 20px;
      color: #374151;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    .stat-card h3 {
      font-size: 2rem;
      margin: 0 0 8px 0;
      color: #059669;
    }
    .stat-card p {
      margin: 0;
      color: #6b7280;
      font-weight: 500;
    }
    .dashboard-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 30px;
    }
    @media (max-width: 768px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  
  currentUser = this.authService.getCurrentUser();
  userProgress = signal<Progress[]>([]);
  
  enrolledCount = signal(0);
  completedCount = signal(0);
  certificatesCount = signal(0);

  ngOnInit() {
    this.loadUserProgress();
  }

  loadUserProgress() {
    // Mock user progress data
    const mockProgress: Progress[] = [
      {
        id: '1',
        userId: this.currentUser()?.id || '',
        workshopId: '1',
        completionPercentage: 75,
        lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        certificateIssued: false
      },
      {
        id: '2',
        userId: this.currentUser()?.id || '',
        workshopId: '2',
        completionPercentage: 100,
        lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000),
        certificateIssued: true
      }
    ];
    
    this.userProgress.set(mockProgress);
    this.enrolledCount.set(mockProgress.length);
    this.completedCount.set(mockProgress.filter(p => p.completionPercentage === 100).length);
    this.certificatesCount.set(mockProgress.filter(p => p.certificateIssued).length);
  }
}