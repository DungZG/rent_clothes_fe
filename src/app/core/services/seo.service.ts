import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateTitle(pageTitle: string): void {
    this.title.setTitle(pageTitle + ' | Thuê Gì');
  }

  updateMeta(description: string, keywords?: string): void {
    this.meta.updateTag({ name: 'description', content: description });
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  updateOgTags(data: { title: string; description: string; image?: string; url?: string }): void {
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    if (data.image) this.meta.updateTag({ property: 'og:image', content: data.image });
    if (data.url) this.meta.updateTag({ property: 'og:url', content: data.url });
  }
}
