import { Directive, ElementRef, inject, input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: 'img[appLazyImage]', standalone: true })
export class LazyImageDirective implements OnInit {
  readonly src = input.required<string>({ alias: 'appLazyImage' });
  readonly placeholder = input<string>('assets/images/placeholder.webp');

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const img = this.el.nativeElement as HTMLImageElement;
    img.src = this.placeholder();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        img.src = this.src();
        observer.disconnect();
      }
    });
    observer.observe(img);
  }
}
