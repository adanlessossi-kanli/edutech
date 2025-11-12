import { Pipe, PipeTransform, inject } from '@angular/core';
import { CdnService } from '../../core/services/cdn.service';

@Pipe({
  name: 'cdnUrl',
  standalone: true,
})
export class CdnUrlPipe implements PipeTransform {
  private cdnService = inject(CdnService);

  transform(path: string): string {
    return this.cdnService.getAssetUrl(path);
  }
}
