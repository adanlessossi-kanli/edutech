import { TestBed } from '@angular/core/testing';
import { Route } from '@angular/router';
import { of } from 'rxjs';
import { CustomPreloadStrategy } from './preload-strategy.service';

describe('CustomPreloadStrategy', () => {
  let service: CustomPreloadStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPreloadStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should preload route with preload flag', (done) => {
    const route: Route = {
      path: 'test',
      data: { preload: true }
    };
    const loadFn = () => of('loaded');

    service.preload(route, loadFn).subscribe(result => {
      expect(result).toBe('loaded');
      done();
    });
  });

  it('should not preload route without preload flag', (done) => {
    const route: Route = {
      path: 'test'
    };
    const loadFn = () => of('loaded');

    service.preload(route, loadFn).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});
