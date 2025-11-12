import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CdnService {
  getAssetUrl(path: string): string {
    if (!environment.cdn.enabled || !environment.cdn.baseUrl) {
      return path;
    }
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${environment.cdn.baseUrl}/${cleanPath}`;
  }

  getImageUrl(imagePath: string): string {
    return this.getAssetUrl(`images/${imagePath}`);
  }

  getVideoUrl(videoPath: string): string {
    return this.getAssetUrl(`videos/${videoPath}`);
  }

  getDocumentUrl(docPath: string): string {
    return this.getAssetUrl(`documents/${docPath}`);
  }
}
