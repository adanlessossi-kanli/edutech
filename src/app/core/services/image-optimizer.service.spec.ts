import { TestBed } from '@angular/core/testing';
import { ImageOptimizerService } from './image-optimizer.service';
import { CdnService } from './cdn.service';

describe('ImageOptimizerService', () => {
  let service: ImageOptimizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdnService],
    });
    service = TestBed.inject(ImageOptimizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return base URL without options', () => {
    const url = service.getOptimizedImageUrl('test.jpg');
    expect(url).toContain('test.jpg');
  });

  it('should add width parameter', () => {
    const url = service.getOptimizedImageUrl('test.jpg', { width: 800 });
    expect(url).toContain('w=800');
  });

  it('should add height parameter', () => {
    const url = service.getOptimizedImageUrl('test.jpg', { height: 600 });
    expect(url).toContain('h=600');
  });

  it('should add quality parameter', () => {
    const url = service.getOptimizedImageUrl('test.jpg', { quality: 80 });
    expect(url).toContain('q=80');
  });

  it('should add format parameter', () => {
    const url = service.getOptimizedImageUrl('test.jpg', { format: 'webp' });
    expect(url).toContain('f=webp');
  });

  it('should combine multiple parameters', () => {
    const url = service.getOptimizedImageUrl('test.jpg', {
      width: 800,
      height: 600,
      quality: 80,
      format: 'webp',
    });
    expect(url).toContain('w=800');
    expect(url).toContain('h=600');
    expect(url).toContain('q=80');
    expect(url).toContain('f=webp');
  });

  it('should generate responsive srcset', () => {
    const srcset = service.getResponsiveImageSrcset('test.jpg', [400, 800, 1200]);
    expect(srcset).toContain('400w');
    expect(srcset).toContain('800w');
    expect(srcset).toContain('1200w');
  });
});
