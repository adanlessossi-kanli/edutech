import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { OptimizedImageDirective } from './optimized-image.directive';
import { ImageOptimizerService } from '../../core/services/image-optimizer.service';
import { CdnService } from '../../core/services/cdn.service';

@Component({
  template: `<img appOptimizedImage="test.jpg" [width]="width" />`,
  standalone: true,
  imports: [OptimizedImageDirective],
})
class TestComponent {
  width?: number;
}

describe('OptimizedImageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [ImageOptimizerService, CdnService],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set optimized image URL on init', () => {
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('test.jpg');
  });

  it('should set lazy loading', () => {
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.loading).toBe('lazy');
  });

  it('should apply width option', () => {
    component.width = 800;
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('w=800');
  });
});
