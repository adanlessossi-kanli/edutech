import { TestBed } from '@angular/core/testing';
import { WorkshopService } from './workshop.service';
import { Workshop } from '../models/workshop.model';

describe('WorkshopService', () => {
  let service: WorkshopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return workshops', () => {
    const workshops = service.getWorkshops()();
    expect(workshops.length).toBeGreaterThan(0);
    expect(workshops[0].title).toBeDefined();
  });

  it('should find workshop by id', () => {
    const workshop = service.getWorkshopById('1');
    expect(workshop).toBeTruthy();
    expect(workshop?.id).toBe('1');
  });

  it('should return undefined for non-existent workshop', () => {
    const workshop = service.getWorkshopById('999');
    expect(workshop).toBeUndefined();
  });

  it('should search workshops by title', () => {
    const results = service.searchWorkshops('React');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title.toLowerCase()).toContain('react');
  });

  it('should search workshops by category', () => {
    const results = service.searchWorkshops('Frontend');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].category).toBe('Frontend');
  });

  it('should search workshops by tags', () => {
    const results = service.searchWorkshops('JavaScript');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].tags).toContain('JavaScript');
  });

  it('should add new workshop', () => {
    const initialCount = service.getWorkshops()().length;
    const newWorkshop: Workshop = {
      id: '999',
      title: 'Test Workshop',
      description: 'Test Description',
      instructor: 'Test Instructor',
      duration: 120,
      price: 99,
      category: 'Testing',
      level: 'Beginner',
      maxParticipants: 20,
      currentParticipants: 0,
      startDate: new Date(),
      endDate: new Date(),
      tags: ['test'],
      isLive: false
    };

    service.addWorkshop(newWorkshop);
    expect(service.getWorkshops()().length).toBe(initialCount + 1);
    expect(service.getWorkshopById('999')).toBeTruthy();
  });

  it('should enroll user successfully', () => {
    const result = service.enrollUser('1', 'user1');
    expect(result).toBe(true);
    
    const workshop = service.getWorkshopById('1');
    expect(workshop?.currentParticipants).toBeGreaterThan(0);
  });

  it('should not enroll when workshop is full', () => {
    const workshop = service.getWorkshopById('1');
    if (workshop) {
      workshop.currentParticipants = workshop.maxParticipants;
      const result = service.enrollUser('1', 'user1');
      expect(result).toBe(false);
    }
  });
});