import { Injectable, signal } from '@angular/core';
import { Workshop } from '../models/workshop.model';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  private workshops = signal<Workshop[]>([
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
      isLive: false
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
      isLive: true
    }
  ]);

  getWorkshops() {
    return this.workshops.asReadonly();
  }

  getWorkshopById(id: string) {
    return this.workshops().find(w => w.id === id);
  }

  searchWorkshops(query: string) {
    return this.workshops().filter(w => 
      w.title.toLowerCase().includes(query.toLowerCase()) ||
      w.category.toLowerCase().includes(query.toLowerCase()) ||
      w.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }

  addWorkshop(workshop: Workshop) {
    this.workshops.update(workshops => [...workshops, workshop]);
  }

  enrollUser(workshopId: string, userId: string): boolean {
    const workshop = this.getWorkshopById(workshopId);
    if (workshop && workshop.currentParticipants < workshop.maxParticipants) {
      this.workshops.update(workshops => 
        workshops.map(w => 
          w.id === workshopId 
            ? { ...w, currentParticipants: w.currentParticipants + 1 }
            : w
        )
      );
      return true;
    }
    return false;
  }
}