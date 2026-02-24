import { Directive, ElementRef, output, inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({ selector: '[appClickOutside]', standalone: true })
export class ClickOutsideDirective implements OnInit, OnDestroy {
  readonly clickOutside = output<void>();
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private handler?: (event: Event) => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.handler = (event: Event) => {
      if (!this.el.nativeElement.contains(event.target)) {
        this.clickOutside.emit();
      }
    };
    document.addEventListener('click', this.handler);
  }

  ngOnDestroy(): void {
    if (this.handler) {
      document.removeEventListener('click', this.handler);
    }
  }
}
