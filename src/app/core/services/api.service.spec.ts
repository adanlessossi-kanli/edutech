import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get workshops with loading state', async () => {
    expect(service.getLoading()()).toBe(false);
    
    const workshopsPromise = service.getWorkshops();
    expect(service.getLoading()()).toBe(true);
    
    const workshops = await workshopsPromise;
    expect(service.getLoading()()).toBe(false);
    expect(workshops.length).toBeGreaterThan(0);
  });

  it('should enroll in workshop', async () => {
    const result = await service.enrollInWorkshop('1', 'user1');
    expect(result).toBe(true);
  });

  it('should get reviews for workshop', async () => {
    const reviews = await service.getReviews('1');
    expect(reviews).toBeDefined();
    expect(Array.isArray(reviews)).toBe(true);
  });

  it('should handle errors properly', () => {
    expect(service.getError()()).toBe(null);
  });
});