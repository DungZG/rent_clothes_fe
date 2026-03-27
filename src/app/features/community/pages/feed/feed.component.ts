import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge?: 'Pro' | 'Verified';
  };
  timestamp: string;
  content: string;
  images?: string[];
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isFeatured?: boolean;
}

interface TrendingTopic {
  id: string;
  category: string;
  hashtag: string;
  postCount: number;
}

interface Group {
  id: string;
  name: string;
  avatar: string;
  color: string;
}

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzAvatarModule,
    NzCardModule,
    NzTagModule,
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  newPostContent = '';
  searchQuery = '';

  posts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Minami Cosplay',
        avatar: 'https://i.pravatar.cc/150?img=5',
        badge: 'Pro',
      },
      timestamp: '15 phút trước',
      content:
        'Vừa nhận được bộ Genshin Impact từ shop, chất vải cực xịn luôn mọi người ạ! Đặc biệt là phần giáp nhựa rất chắc chắn. Có ai định đi fes cuối tuần này không?',
      images: [
        'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=600',
        'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600',
      ],
      hashtags: ['#GenshinCosplay', '#Review'],
      likes: 128,
      comments: 45,
      shares: 0,
    },
    {
      id: '2',
      author: {
        name: 'Hoàng Photo',
        avatar: 'https://i.pravatar.cc/150?img=8',
        badge: 'Verified',
      },
      timestamp: '2 giờ trước',
      content:
        'Góc Review Photographer: Gần đây mình có cơ hội làm việc với team Thuê Gì, trải nghiệm dịch vụ rất chuyên nghiệp. Các bạn coser cần chụp bộ ảnh Noel sắp tới thì inbox mình nhận slot nhé!',
      images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'],
      hashtags: ['#Photography', '#HoangPhoto'],
      likes: 2400,
      comments: 152,
      shares: 12,
      isLiked: true,
    },
  ];

  featuredPost: Post = {
    id: 'featured',
    author: {
      name: 'Admin',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    timestamp: '2 giờ trước',
    content:
      'Chia sẻ những lưu ý quan trọng khi chọn đồ cosplay cho mùa Halloween sắp tới, từ việc kiểm tra size đến cách bảo quản phụ kiện...',
    images: ['https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800'],
    hashtags: [],
    likes: 0,
    comments: 0,
    shares: 0,
    isFeatured: true,
  };

  trendingTopics: TrendingTopic[] = [
    { id: '1', category: 'Xu hướng Cosplay', hashtag: '#Halloween2023', postCount: 1240 },
    { id: '2', category: 'Game', hashtag: '#GenshinCosplay', postCount: 856 },
    { id: '3', category: 'Làm đẹp', hashtag: '#TipsMakeup', postCount: 521 },
    { id: '4', category: 'Sự kiện', hashtag: '#AnimeExpo', postCount: 312 },
  ];

  topGroups: Group[] = [
    { id: '1', name: 'Genshin Impact VN', avatar: 'GC', color: 'blue' },
    { id: '2', name: 'Cosplay Photography', avatar: 'CP', color: 'purple' },
    { id: '3', name: 'Makeup Artist Tips', avatar: 'MU', color: 'pink' },
  ];

  onCreatePost(): void {
    if (this.newPostContent.trim()) {
      console.log('Create post:', this.newPostContent);
      this.newPostContent = '';
    }
  }

  onLike(post: Post): void {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
  }

  onComment(post: Post): void {
    console.log('Comment on post:', post.id);
  }

  onShare(post: Post): void {
    console.log('Share post:', post.id);
  }

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }
}
