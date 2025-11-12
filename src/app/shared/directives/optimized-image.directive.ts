import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ImageOptimizerService } from '../../core/services/image-optimizer.service';

@Directive({
  selector: 'img[appOptimizedImage]',
  standalone: true,
})
export class OptimizedImageDirective implements OnInit {
  @Input() appOptimizedImage!: string;
  @Input() width?: number;
  @Input() height?: number;
  @Input() quality?: number;
  @Input() format?: 'webp' | 'jpeg' | 'png' | 'avif';

  private el = inject(ElementRef);
  private imageOptimizer = inject(ImageOptimizerService);

  ngOnInit() {
    const optimizedUrl = this.imageOptimizer.getOptimizedImageUrl(this.appOptimizedImage, {
      width: this.width,
      height: this.height,
      quality: this.quality,
      format: this.format,
    });
    this.el.nativeElement.src = optimizedUrl;
    this.el.nativeElement.loading = 'lazy';
  }
}
