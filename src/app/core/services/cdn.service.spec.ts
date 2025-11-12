import { TestBed } from '@angular/core/testing';
import { CdnService } from './cdn.service';

describe('CdnService', () => {
  let service: CdnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return original path when CDN is disabled', () => {
    const path = '/assets/logo.png';
    const url = service.getAssetUrl(path);
    expect(url).toBe(path);
  });

  it('should return image URL', () => {
    const url = service.getImageUrl('logo.png');
    expect(url).toContain('logo.png');
  });

  it('should return video URL', () => {
    const url = service.getVideoUrl('intro.mp4');
    expect(url).toContain('intro.mp4');
  });

  it('should return document URL', () => {
    const url = service.getDocumentUrl('guide.pdf');
    expect(url).toContain('guide.pdf');
  });
});
