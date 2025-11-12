import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="community-page">
      <header class="page-header">
        <h1>Join Our Global Community</h1>
        <p>Connect with thousands of learners and professionals worldwide</p>
      </header>

      <section class="stats">
        <div class="stat">
          <h3>50K+</h3>
          <p>Active Members</p>
        </div>
        <div class="stat">
          <h3>150+</h3>
          <p>Countries</p>
        </div>
        <div class="stat">
          <h3>24/7</h3>
          <p>Support Available</p>
        </div>
      </section>

      <section class="features">
        <h2>Community Features</h2>
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
    </div>
  `,
  styles: [
    `
      .community-page {
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
      .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 30px;
        margin-bottom: 80px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 60px 40px;
        border-radius: 15px;
      }
      .stat {
        text-align: center;
        color: white;
      }
      .stat h3 {
        font-size: 3rem;
        margin: 0 0 10px 0;
      }
      .stat p {
        font-size: 1.1rem;
        margin: 0;
        opacity: 0.9;
      }
      .features h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 40px;
        color: #333;
      }
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
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
    `,
  ],
})
export class CommunityComponent {
  features = signal<Feature[]>([
    {
      title: 'Discussion Forums',
      description: 'Ask questions and share knowledge with peers',
      icon: '💬',
    },
    {
      title: 'Study Groups',
      description: 'Join or create groups to learn together',
      icon: '👥',
    },
    {
      title: 'Live Events',
      description: 'Attend webinars, workshops, and networking events',
      icon: '🎤',
    },
    {
      title: 'Mentorship',
      description: 'Get guidance from experienced professionals',
      icon: '🤝',
    },
    {
      title: 'Code Reviews',
      description: 'Receive feedback on your projects from peers',
      icon: '👨‍💻',
    },
    {
      title: 'Job Board',
      description: 'Access exclusive job opportunities from partners',
      icon: '💼',
    },
  ]);
}
