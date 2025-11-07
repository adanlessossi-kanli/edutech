import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Instructor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  image: string;
  rating: number;
  students: number;
}

@Component({
  selector: 'app-instructors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="instructors-page">
      <header class="page-header">
        <h1>Meet Our Expert Instructors</h1>
        <p>Learn from industry professionals with years of real-world experience</p>
      </header>

      <div class="instructors-grid">
        @for (instructor of instructors(); track instructor.id) {
          <div class="instructor-card">
            <div class="instructor-avatar">{{ instructor.image }}</div>
            <h3>{{ instructor.name }}</h3>
            <p class="title">{{ instructor.title }}</p>
            <div class="stats">
              <span>⭐ {{ instructor.rating }}</span>
              <span>👥 {{ instructor.students }}+ students</span>
            </div>
            <div class="expertise">
              @for (skill of instructor.expertise; track skill) {
                <span class="skill-tag">{{ skill }}</span>
              }
            </div>
            <p class="bio">{{ instructor.bio }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .instructors-page {
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
    .instructors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
    }
    .instructor-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .instructor-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    .instructor-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      margin: 0 auto 20px;
    }
    .instructor-card h3 {
      text-align: center;
      margin: 0 0 5px 0;
      color: #333;
      font-size: 1.5rem;
    }
    .title {
      text-align: center;
      color: #667eea;
      font-weight: 600;
      margin: 0 0 15px 0;
    }
    .stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      color: #666;
      font-size: 0.9rem;
    }
    .expertise {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
    }
    .skill-tag {
      background: #f0f0f0;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
      color: #555;
    }
    .bio {
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
    }
  `]
})
export class InstructorsComponent {
  instructors = signal<Instructor[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Frontend Developer',
      expertise: ['React', 'TypeScript', 'UI/UX'],
      bio: '10+ years building scalable web applications at top tech companies.',
      image: '👩‍💻',
      rating: 4.9,
      students: 15000
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Backend Architect',
      expertise: ['Node.js', 'Python', 'AWS'],
      bio: 'Expert in microservices and cloud architecture with Fortune 500 experience.',
      image: '👨‍💻',
      rating: 4.8,
      students: 12000
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Full Stack Engineer',
      expertise: ['JavaScript', 'MongoDB', 'DevOps'],
      bio: 'Passionate about teaching modern web development and best practices.',
      image: '👩‍🏫',
      rating: 4.9,
      students: 18000
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Mobile Development Lead',
      expertise: ['React Native', 'iOS', 'Android'],
      bio: 'Built mobile apps used by millions. Former tech lead at major startups.',
      image: '👨‍🔬',
      rating: 4.7,
      students: 9000
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      title: 'Data Science Expert',
      expertise: ['Python', 'ML', 'AI'],
      bio: 'PhD in Computer Science. Specializes in machine learning and data analytics.',
      image: '👩‍🔬',
      rating: 4.9,
      students: 14000
    },
    {
      id: '6',
      name: 'James Wilson',
      title: 'DevOps Engineer',
      expertise: ['Docker', 'Kubernetes', 'CI/CD'],
      bio: 'Infrastructure expert helping teams deploy faster and more reliably.',
      image: '👨‍🚀',
      rating: 4.8,
      students: 11000
    }
  ]);
}
