import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Progress } from '../../core/models/enhanced.model';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <h3>Your Learning Progress</h3>

      @for (progress of userProgress(); track progress.id) {
        <div class="progress-item">
          <div class="progress-header">
            <h4>{{ getWorkshopTitle(progress.workshopId) }}</h4>
            <span class="progress-percentage">{{ progress.completionPercentage }}%</span>
          </div>

          <div class="progress-bar">
            <div class="progress-fill" [style.width.%]="progress.completionPercentage"></div>
          </div>

          <div class="progress-details">
            <span class="last-accessed"
              >Last accessed: {{ progress.lastAccessed | date: 'short' }}</span
            >
            @if (progress.certificateIssued) {
              <span class="certificate-badge">🏆 Certificate Earned</span>
            }
          </div>

          @if (progress.completionPercentage === 100 && !progress.certificateIssued) {
            <button (click)="downloadCertificate(progress)" class="certificate-btn">
              Download Certificate
            </button>
          }
        </div>
      } @empty {
        <div class="no-progress">
          <p>No enrolled workshops yet.</p>
          <p>Start learning to track your progress!</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .progress-container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .progress-item {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 16px;
      }
      .progress-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .progress-header h4 {
        margin: 0;
        color: #374151;
      }
      .progress-percentage {
        font-weight: bold;
        color: #059669;
      }
      .progress-bar {
        width: 100%;
        height: 8px;
        background: #e5e7eb;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 12px;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #10b981, #059669);
        transition: width 0.3s ease;
      }
      .progress-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #6b7280;
      }
      .certificate-badge {
        color: #d97706;
        font-weight: 500;
      }
      .certificate-btn {
        background: #7c3aed;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 12px;
      }
      .certificate-btn:hover {
        background: #6d28d9;
      }
      .no-progress {
        text-align: center;
        color: #6b7280;
        padding: 40px 20px;
      }
    `,
  ],
})
export class ProgressTrackerComponent {
  userProgress = input<Progress[]>([]);

  // Mock workshop titles
  private workshopTitles: { [key: string]: string } = {
    '1': 'Advanced React Patterns',
    '2': 'Microservices with Node.js',
    '3': 'DevOps with Docker & Kubernetes',
  };

  getWorkshopTitle(workshopId: string): string {
    return this.workshopTitles[workshopId] || 'Unknown Workshop';
  }

  downloadCertificate(progress: Progress) {
    // Mock certificate download
    const certificateData = `
      CERTIFICATE OF COMPLETION
      
      This certifies that the student has successfully completed:
      ${this.getWorkshopTitle(progress.workshopId)}
      
      Completion Date: ${new Date().toLocaleDateString()}
      Certificate ID: ${progress.id}
    `;

    const blob = new Blob([certificateData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-${progress.workshopId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);

    // Update progress to show certificate issued
    progress.certificateIssued = true;
  }
}
