import { Component } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzCardModule,
    NzTagModule,
    NzAvatarModule,
    NzSelectModule,
    NzDatePickerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  featuredCostumes = [
    {
      id: 1,
      name: 'Kamado Tanjiro (Demon Slayer)',
      price: '150,000đ',
      unit: '/ngày',
      image: 'https://images.unsplash.com/photo-1627637454030-5ddd536e06e5?q=80&w=600&auto=format',
      rating: 4.9,
      reviews: 128,
      category: 'Anime'
    },
    {
      id: 2,
      name: 'Yae Miko (Genshin Impact)',
      price: '250,000đ',
      unit: '/ngày',
      image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format',
      rating: 4.8,
      reviews: 85,
      category: 'Game'
    },
    {
      id: 3,
      name: 'Spider-man (Miles Morales)',
      price: '180,000đ',
      unit: '/ngày',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format',
      rating: 4.7,
      reviews: 210,
      category: 'Movie'
    },
    {
      id: 4,
      name: 'Hatsune Miku (Standard)',
      price: '120,000đ',
      unit: '/ngày',
      image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=600&auto=format',
      rating: 4.5,
      reviews: 56,
      category: 'Vocaloid'
    }
  ];

  categories = [
    { name: 'Anime', count: 1250, icon: 'fire', color: '#ff4d4f' },
    { name: 'Game', count: 840, icon: 'rocket', color: '#1890ff' },
    { name: 'Movie', count: 420, icon: 'video-camera', color: '#722ed1' },
    { name: 'Original', count: 310, icon: 'bulb', color: '#faad14' }
  ];

  testimonials = [
    {
      name: 'Nguyễn An',
      role: 'Cosplayer',
      content: 'Trang phục rất mới và thơm. Chủ shop hỗ trợ nhiệt tình, 10 điểm!',
      avatar: 'https://i.pravatar.cc/150?u=a1'
    },
    {
      name: 'Trần Bình',
      role: 'Nhiếp ảnh gia',
      content: 'Chất liệu lên hình cực đẹp. Quy trình thuê nhanh gọn hơn tôi tưởng.',
      avatar: 'https://i.pravatar.cc/150?u=a2'
    }
  ];

  // Hero search (UI only)
  search = {
    category: null as string | null,
    character: '',
    dateRange: null as [Date, Date] | null
  };

  categoryOptions = [
    { label: 'Anime', value: 'anime' },
    { label: 'Game', value: 'game' },
    { label: 'Movie', value: 'movie' },
    { label: 'Original', value: 'original' }
  ];

  onSearch(): void {
    // TODO: wire với route / search API sau
    // Hiện tại chỉ đảm bảo layout Stitch và không gây lỗi runtime.
    // eslint-disable-next-line no-console
    console.log('[Home] search', this.search);
  }
}
