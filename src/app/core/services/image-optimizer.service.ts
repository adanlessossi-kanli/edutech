import { Injectable, inject } from '@angular/core';
import { CdnService } from './cdn.service';

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

@Injectable({
  providedIn: 'root',
})
export class ImageOptimizerService {
  private cdnService = inject(CdnService);

  getOptimizedImageUrl(imagePath: string, options: ImageOptions = {}): string {
    const baseUrl = this.cdnService.getImageUrl(imagePath);
    const params = this.buildQueryParams(options);
    return params ? `${baseUrl}?${params}` : baseUrl;
  }

  private buildQueryParams(options: ImageOptions): string {
    const params: string[] = [];
    if (options.width) params.push(`w=${options.width}`);
    if (options.height) params.push(`h=${options.height}`);
    if (options.quality) params.push(`q=${options.quality}`);
    if (options.format) params.push(`f=${options.format}`);
    return params.join('&');
  }

  getResponsiveImageSrcset(imagePath: string, widths: number[]): string {
    return widths
      .map((width) => `${this.getOptimizedImageUrl(imagePath, { width })} ${width}w`)
      .join(', ');
  }
}
