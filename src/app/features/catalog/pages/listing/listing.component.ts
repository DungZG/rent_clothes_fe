import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzRateModule } from 'ng-zorro-antd/rate';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzSliderModule,
    NzCheckboxModule,
    NzPaginationModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzRateModule
  ],
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  priceRange: [number, number] = [0, 1000000];

  categories = [
    { label: 'Anime/Manga', value: 'anime', checked: false },
    { label: 'Game', value: 'game', checked: false },
    { label: 'Movie/TV Series', value: 'movie', checked: false },
    { label: 'Original/Concept', value: 'original', checked: false },
    { label: 'Vocaloid', value: 'vocaloid', checked: false }
  ];

  sizes = [
    { label: 'S', checked: false },
    { label: 'M', checked: false },
    { label: 'L', checked: false },
    { label: 'XL', checked: false }
  ];

  costumes = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    name: `Trang phục Cosplay #${i + 1}`,
    price: (Math.floor(Math.random() * 5) + 1) * 100000,
    image: `https://picsum.photos/seed/${i + 10}/400/500`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 100),
    category: i % 2 === 0 ? 'Anime' : 'Game'
  }));

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
}
