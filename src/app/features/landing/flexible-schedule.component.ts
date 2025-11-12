import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-flexible-schedule',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flexible-page">
      <header class="page-header">
        <h1>Learn On Your Schedule</h1>
        <p>Study anytime, anywhere at your own pace</p>
      </header>

      <section class="features">
        <div class="features-grid">
          @for (feature of features(); track feature.title) {
            <div class="feature-card">
              <span class="icon">{{ feature.icon }}</span>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          }
        </div>
      </section>

      <section class="formats">
        <h2>Learning Formats</h2>
        <div class="formats-grid">
          <div class="format">
            <span class="format-icon">🎥</span>
            <h3>Video Lessons</h3>
            <p>HD video content available 24/7</p>
          </div>
          <div class="format">
            <span class="format-icon">📱</span>
            <h3>Mobile Learning</h3>
            <p>Learn on any device, anywhere</p>
          </div>
          <div class="format">
            <span class="format-icon">⏯️</span>
            <h3>Pause & Resume</h3>
            <p>Pick up right where you left off</p>
          </div>
          <div class="format">
            <span class="format-icon">📥</span>
            <h3>Offline Access</h3>
            <p>Download content for offline viewing</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .flexible-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
      }
      .page-header {
        text-align: center;
        margin-bottom: 60px;
      }
      .page-header h1 {
        font-size: 2.5rem;
        color: #333;
        margin: 0 0 15px 0;
      }
      .page-header p {
        font-size: 1.2rem;
        color: #666;
      }
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
        margin-bottom: 80px;
      }
      .feature-card {
        background: white;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.3s;
      }
      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      .icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 15px;
      }
      .feature-card h3 {
        color: #667eea;
        margin: 0 0 10px 0;
        font-size: 1.3rem;
      }
      .feature-card p {
        color: #666;
        margin: 0;
        line-height: 1.6;
      }
      .formats h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 40px;
        color: #333;
      }
      .formats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
      }
      .format {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        padding: 40px 30px;
        text-align: center;
      }
      .format-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 15px;
      }
      .format h3 {
        margin: 0 0 10px 0;
        font-size: 1.3rem;
      }
      .format p {
        margin: 0;
        opacity: 0.9;
      }
    `,
  ],
})
export class FlexibleScheduleComponent {
  features = signal<Feature[]>([
    {
      title: 'Self-Paced Learning',
      description: 'Progress through courses at your own speed without deadlines',
      icon: '⏰',
    },
    {
      title: 'Lifetime Access',
      description: 'Access course materials forever, revisit anytime',
      icon: '♾️',
    },
    {
      title: 'No Fixed Schedule',
      description: 'Learn when it fits your lifestyle - morning, night, or weekends',
      icon: '📅',
    },
    {
      title: 'Quick Sessions',
      description: 'Bite-sized lessons that fit into busy schedules',
      icon: '⚡',
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey and achievements',
      icon: '📊',
    },
    {
      title: 'Flexible Deadlines',
      description: 'Set your own goals and adjust as needed',
      icon: '🎯',
    },
  ]);
}
