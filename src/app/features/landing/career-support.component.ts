import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-career-support',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="career-page">
      <header class="page-header">
        <h1>Advance Your Tech Career</h1>
        <p>Get personalized guidance and support to land your dream job</p>
      </header>

      <section class="services">
        <h2>Career Services</h2>
        <div class="services-grid">
          @for (service of services(); track service.title) {
            <div class="service-card">
              <span class="icon">{{ service.icon }}</span>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          }
        </div>
      </section>

      <section class="stats">
        <div class="stat">
          <h3>85%</h3>
          <p>Job Placement Rate</p>
        </div>
        <div class="stat">
          <h3>$95K</h3>
          <p>Average Starting Salary</p>
        </div>
        <div class="stat">
          <h3>500+</h3>
          <p>Hiring Partners</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .career-page {
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
    .services h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 40px;
      color: #333;
    }
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 25px;
      margin-bottom: 80px;
    }
    .service-card {
      background: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s;
    }
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    .icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 15px;
    }
    .service-card h3 {
      color: #667eea;
      margin: 0 0 10px 0;
      font-size: 1.3rem;
    }
    .service-card p {
      color: #666;
      margin: 0;
      line-height: 1.6;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
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
  `]
})
export class CareerSupportComponent {
  services = signal<Service[]>([
    {
      title: 'Resume Review',
      description: 'Get expert feedback on your resume and optimize it for tech roles',
      icon: '📝'
    },
    {
      title: 'Interview Prep',
      description: 'Practice with mock interviews and learn to ace technical questions',
      icon: '🎯'
    },
    {
      title: 'Portfolio Building',
      description: 'Create a standout portfolio that showcases your best projects',
      icon: '💼'
    },
    {
      title: 'Job Matching',
      description: 'Connect with companies actively hiring for your skill set',
      icon: '🤝'
    },
    {
      title: 'Salary Negotiation',
      description: 'Learn strategies to negotiate the best compensation package',
      icon: '💰'
    },
    {
      title: 'Career Coaching',
      description: 'One-on-one mentorship to guide your career path',
      icon: '🎓'
    }
  ]);
}
