import { TestBed } from '@angular/core/testing';
import { CdnUrlPipe } from './cdn-url.pipe';
import { CdnService } from '../../core/services/cdn.service';

describe('CdnUrlPipe', () => {
  let pipe: CdnUrlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdnService, CdnUrlPipe],
    });
    pipe = TestBed.inject(CdnUrlPipe);
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform path using CDN service', () => {
    const result = pipe.transform('/assets/logo.png');
    expect(result).toBe('/assets/logo.png');
  });
});
