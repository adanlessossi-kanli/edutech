import { TestBed } from '@angular/core/testing';
import { SanitizerService } from './sanitizer.service';

describe('SanitizerService', () => {
  let service: SanitizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sanitize malicious input', () => {
    const malicious = '<script>alert("xss")</script>';
    const sanitized = service.sanitizeInput(malicious);
    expect(sanitized).not.toContain('<script>');
  });

  it('should sanitize javascript protocol', () => {
    const malicious = 'javascript:alert("xss")';
    const sanitized = service.sanitizeInput(malicious);
    expect(sanitized).not.toContain('javascript:');
  });

  it('should allow valid URLs', () => {
    const validUrl = 'https://example.com';
    const sanitized = service.sanitizeUrl(validUrl);
    expect(sanitized).toBe(validUrl);
  });

  it('should block invalid protocols', () => {
    const invalidUrl = 'javascript:alert("xss")';
    const sanitized = service.sanitizeUrl(invalidUrl);
    expect(sanitized).toBe('');
  });
});
