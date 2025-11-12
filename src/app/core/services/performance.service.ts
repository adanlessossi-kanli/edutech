import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  constructor(private loggingService: LoggingService) {}

  measureWebVitals(): void {
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }
  }

  private observeLCP(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.loggingService.info('LCP', { value: lastEntry.startTime });
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private observeFID(): void {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.loggingService.info('FID', { value: entry.processingStart - entry.startTime });
      });
    });
    observer.observe({ entryTypes: ['first-input'] });
  }

  private observeCLS(): void {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.loggingService.info('CLS', { value: clsValue });
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  }
}
