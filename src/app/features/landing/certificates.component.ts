import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificate {
  name: string;
  description: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="certificates-page">
      <header class="page-header">
        <h1>Earn Industry-Recognized Certificates</h1>
        <p>Validate your skills and boost your career with professional certifications</p>
      </header>

      <section class="benefits">
        <div class="benefit">
          <span class="icon">✅</span>
          <h3>Verified Credentials</h3>
          <p>Certificates verified on blockchain technology</p>
        </div>
        <div class="benefit">
          <span class="icon">🌟</span>
          <h3>Industry Recognition</h3>
          <p>Accepted by top companies worldwide</p>
        </div>
        <div class="benefit">
          <span class="icon">📄</span>
          <h3>Shareable</h3>
          <p>Add to LinkedIn, resume, and portfolio</p>
        </div>
      </section>

      <section class="certificates">
        <h2>Available Certifications</h2>
        <div class="certificates-grid">
          @for (cert of certificates(); track cert.name) {
            <div class="certificate-card">
              <span class="cert-icon">{{ cert.icon }}</span>
              <h3>{{ cert.name }}</h3>
              <p>{{ cert.description }}</p>
              <div class="skills">
                <strong>Skills Covered:</strong>
                <div class="skills-list">
                  @for (skill of cert.skills; track skill) {
                    <span class="skill-badge">{{ skill }}</span>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .certificates-page {
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
    .benefits {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 80px;
    }
    .benefit {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .benefit .icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 15px;
    }
    .benefit h3 {
      color: #667eea;
      margin: 0 0 10px 0;
    }
    .benefit p {
      color: #666;
      margin: 0;
    }
    .certificates h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 40px;
      color: #333;
    }
    .certificates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 25px;
    }
    .certificate-card {
      background: white;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
      border: 2px solid #f0f0f0;
    }
    .certificate-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      border-color: #667eea;
    }
    .cert-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 15px;
    }
    .certificate-card h3 {
      color: #333;
      margin: 0 0 10px 0;
      font-size: 1.3rem;
    }
    .certificate-card p {
      color: #666;
      margin: 0 0 20px 0;
      line-height: 1.5;
    }
    .skills strong {
      color: #333;
      display: block;
      margin-bottom: 10px;
    }
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-badge {
      background: #667eea;
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
    }
  `]
})
export class CertificatesComponent {
  certificates = signal<Certificate[]>([
    {
      name: 'Full Stack Web Developer',
      description: 'Master both frontend and backend development with modern frameworks',
      icon: '🎓',
      skills: ['React', 'Node.js', 'MongoDB', 'REST APIs']
    },
    {
      name: 'Cloud Solutions Architect',
      description: 'Design and deploy scalable cloud infrastructure on AWS',
      icon: '☁️',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      name: 'Data Science Professional',
      description: 'Analyze data and build machine learning models',
      icon: '📊',
      skills: ['Python', 'ML', 'Data Analysis', 'TensorFlow']
    },
    {
      name: 'Mobile App Developer',
      description: 'Create cross-platform mobile applications',
      icon: '📱',
      skills: ['React Native', 'iOS', 'Android', 'Firebase']
    },
    {
      name: 'DevOps Engineer',
      description: 'Automate deployment and infrastructure management',
      icon: '⚙️',
      skills: ['Jenkins', 'Terraform', 'Ansible', 'Monitoring']
    },
    {
      name: 'UI/UX Designer',
      description: 'Design beautiful and user-friendly interfaces',
      icon: '🎨',
      skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research']
    }
  ]);
}
