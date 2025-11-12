import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PerformanceService } from './core/services/performance.service';

describe('App', () => {
  beforeEach(async () => {
    const performanceSpy = jasmine.createSpyObj('PerformanceService', ['measureWebVitals']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: PerformanceService, useValue: performanceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('EduTech Pro');
  });

  it('should initialize performance monitoring', () => {
    const performanceService = TestBed.inject(PerformanceService);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    expect(performanceService.measureWebVitals).toHaveBeenCalled();
  });
});
