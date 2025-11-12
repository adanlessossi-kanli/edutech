import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Benefit {
  icon: string;
  title: string;
  description: string;
  action: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing">
      <section class="hero">
        <h1>Transform Your Tech Career</h1>
        <p>Learn from industry experts and master in-demand skills</p>
        <button class="cta-btn" (click)="getStarted.emit()">Get Started</button>
      </section>

      <section class="benefits">
        <h2>Why Choose EduTech?</h2>
        <div class="benefits-grid">
          @for (benefit of benefits; track benefit.title) {
            <div class="benefit" (click)="onBenefitClick(benefit.action)">
              <span class="icon">{{ benefit.icon }}</span>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
              <button class="learn-more">Learn More →</button>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .landing {
        min-height: 100vh;
      }
      .hero {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-align: center;
        padding: 100px 20px;
      }
      .hero h1 {
        font-size: 3rem;
        margin: 0 0 20px 0;
      }
      .hero p {
        font-size: 1.5rem;
        margin: 0 0 40px 0;
      }
      .cta-btn {
        background: white;
        color: #667eea;
        border: none;
        padding: 15px 40px;
        font-size: 1.2rem;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
      }
      .cta-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
      .benefits {
        max-width: 1200px;
        margin: 0 auto;
        padding: 80px 20px;
      }
      .benefits h2 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 60px;
        color: #333;
      }
      .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
      }
      .benefit {
        text-align: center;
        padding: 30px;
        border-radius: 10px;
        transition: transform 0.3s;
        cursor: pointer;
        background: white;
      }
      .benefit:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
      .learn-more {
        margin-top: 15px;
        background: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
      }
      .learn-more:hover {
        background: #5568d3;
      }
      .icon {
        font-size: 4rem;
        display: block;
        margin-bottom: 20px;
      }
      .benefit h3 {
        font-size: 1.5rem;
        margin: 0 0 15px 0;
        color: #667eea;
      }
      .benefit p {
        color: #666;
        line-height: 1.6;
      }
    `,
  ],
})
export class LandingComponent {
  getStarted = output<void>();
  viewWorkshops = output<void>();
  viewInstructors = output<void>();
  viewHandsOn = output<void>();
  viewCertificates = output<void>();
  viewCareer = output<void>();
  viewFlexible = output<void>();
  viewCommunity = output<void>();

  benefits: Benefit[] = [
    {
      icon: '🎓',
      title: 'Expert Instructors',
      description: 'Learn from professionals with real-world experience',
      action: 'instructors',
    },
    {
      icon: '⚡',
      title: 'Hands-On Learning',
      description: 'Build projects and gain practical skills',
      action: 'hands-on',
    },
    {
      icon: '🏆',
      title: 'Certificates',
      description: 'Earn recognized certifications upon completion',
      action: 'certificates',
    },
    {
      icon: '💼',
      title: 'Career Support',
      description: 'Get guidance to advance your career',
      action: 'career',
    },
    {
      icon: '🌐',
      title: 'Flexible Schedule',
      description: 'Learn at your own pace, anytime, anywhere',
      action: 'flexible',
    },
    {
      icon: '👥',
      title: 'Community',
      description: 'Connect with peers and build your network',
      action: 'community',
    },
  ];

  onBenefitClick(action: string) {
    if (action === 'workshops') {
      this.viewWorkshops.emit();
    } else if (action === 'instructors') {
      this.viewInstructors.emit();
    } else if (action === 'hands-on') {
      this.viewHandsOn.emit();
    } else if (action === 'certificates') {
      this.viewCertificates.emit();
    } else if (action === 'career') {
      this.viewCareer.emit();
    } else if (action === 'flexible') {
      this.viewFlexible.emit();
    } else if (action === 'community') {
      this.viewCommunity.emit();
    }
  }
}
