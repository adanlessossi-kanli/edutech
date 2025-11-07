import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  icon: string;
  tech: string[];
}

@Component({
  selector: 'app-hands-on-learning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hands-on-page">
      <header class="page-header">
        <h1>Learn By Building Real Projects</h1>
        <p>Gain practical experience through hands-on coding exercises and real-world projects</p>
      </header>

      <section class="features">
        <div class="feature">
          <span class="icon">💻</span>
          <h3>Interactive Coding</h3>
          <p>Write code directly in your browser with instant feedback</p>
        </div>
        <div class="feature">
          <span class="icon">🚀</span>
          <h3>Deploy Projects</h3>
          <p>Launch your projects to production and build your portfolio</p>
        </div>
        <div class="feature">
          <span class="icon">🔧</span>
          <h3>Real Tools</h3>
          <p>Work with industry-standard tools and frameworks</p>
        </div>
      </section>

      <section class="projects">
        <h2>Sample Projects You'll Build</h2>
        <div class="projects-grid">
          @for (project of projects(); track project.title) {
            <div class="project-card">
              <span class="project-icon">{{ project.icon }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="tech-stack">
                @for (tech of project.tech; track tech) {
                  <span class="tech-tag">{{ tech }}</span>
                }
              </div>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hands-on-page {
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
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 80px;
    }
    .feature {
      text-align: center;
      padding: 30px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .feature .icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 15px;
    }
    .feature h3 {
      color: #667eea;
      margin: 0 0 10px 0;
    }
    .feature p {
      color: #666;
      margin: 0;
    }
    .projects h2 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 40px;
      color: #333;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
    }
    .project-card {
      background: white;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.15);
    }
    .project-icon {
      font-size: 2.5rem;
      display: block;
      margin-bottom: 15px;
    }
    .project-card h3 {
      color: #333;
      margin: 0 0 10px 0;
    }
    .project-card p {
      color: #666;
      margin: 0 0 15px 0;
      line-height: 1.5;
    }
    .tech-stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tech-tag {
      background: #f0f0f0;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.8rem;
      color: #555;
    }
  `]
})
export class HandsOnLearningComponent {
  projects = signal<Project[]>([
    {
      title: 'E-Commerce Platform',
      description: 'Build a full-featured online store with cart, checkout, and payment integration',
      icon: '🛒',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Social Media Dashboard',
      description: 'Create a real-time analytics dashboard with data visualization',
      icon: '📊',
      tech: ['Vue.js', 'Firebase', 'Chart.js']
    },
    {
      title: 'Task Management App',
      description: 'Develop a collaborative project management tool with team features',
      icon: '✅',
      tech: ['Angular', 'Express', 'PostgreSQL']
    },
    {
      title: 'Video Streaming Service',
      description: 'Build a Netflix-like platform with video upload and streaming',
      icon: '🎬',
      tech: ['React', 'AWS', 'FFmpeg']
    },
    {
      title: 'AI Chatbot',
      description: 'Create an intelligent chatbot using machine learning APIs',
      icon: '🤖',
      tech: ['Python', 'TensorFlow', 'Flask']
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'Design a cross-platform mobile app for health and fitness tracking',
      icon: '💪',
      tech: ['React Native', 'Redux', 'SQLite']
    }
  ]);
}
