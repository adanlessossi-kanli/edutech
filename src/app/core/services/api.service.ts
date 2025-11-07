import { Injectable, signal } from '@angular/core';
import { Workshop, User } from '../models/workshop.model';
import { Review, Instructor, Payment, Progress } from '../models/enhanced.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private loading = signal(false);
  private error = signal<string | null>(null);

  getLoading() { return this.loading.asReadonly(); }
  getError() { return this.error.asReadonly(); }

  // Mock API calls with loading states
  async getWorkshops(): Promise<Workshop[]> {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        {
          id: '1',
          title: 'Advanced React Patterns',
          description: 'Master advanced React patterns including hooks, context, and performance optimization',
          instructor: 'Sarah Chen',
          duration: 180,
          price: 149,
          category: 'Frontend',
          level: 'Advanced',
          maxParticipants: 25,
          currentParticipants: 18,
          startDate: new Date('2024-02-15T14:00:00'),
          endDate: new Date('2024-02-15T17:00:00'),
          tags: ['React', 'JavaScript', 'Performance'],
          isLive: false,
          imageUrl: 'https://via.placeholder.com/400x200?text=React+Workshop'
        },
        {
          id: '2',
          title: 'Microservices with Node.js',
          description: 'Build scalable microservices architecture using Node.js and Docker',
          instructor: 'Mike Rodriguez',
          duration: 240,
          price: 199,
          category: 'Backend',
          level: 'Intermediate',
          maxParticipants: 30,
          currentParticipants: 22,
          startDate: new Date('2024-02-20T10:00:00'),
          endDate: new Date('2024-02-20T14:00:00'),
          tags: ['Node.js', 'Microservices', 'Docker'],
          isLive: true,
          imageUrl: 'https://via.placeholder.com/400x200?text=Node.js+Workshop'
        }
      ];
    } catch (err) {
      this.error.set('Failed to load workshops');
      throw err;
    } finally {
      this.loading.set(false);
    }
  }

  async enrollInWorkshop(workshopId: string, userId: string): Promise<boolean> {
    this.loading.set(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      this.error.set('Enrollment failed');
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async getReviews(workshopId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      {
        id: '1',
        workshopId,
        userId: '1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Excellent workshop! Learned a lot.',
        createdAt: new Date()
      }
    ];
  }
}