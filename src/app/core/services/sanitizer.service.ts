import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SanitizerService {
  constructor(private domSanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.domSanitizer.sanitize(1, html) || '';
  }

  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  sanitizeUrl(url: string): string {
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    try {
      const parsed = new URL(url);
      if (!allowedProtocols.includes(parsed.protocol)) {
        return '';
      }
      return url;
    } catch {
      return '';
    }
  }
}
