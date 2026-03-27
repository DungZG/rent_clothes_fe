import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzGridModule,
    NzTagModule,
    NzIconModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  searchQuery = '';

  blogPosts: BlogPost[] = [
    {
      id: '1',
      slug: 'cach-chon-lens-cosplay',
      title: 'Cách chọn Lens an toàn cho buổi chụp hình Cosplay',
      excerpt: 'Những lưu ý quan trọng để bảo vệ đôi mắt khi sử dụng các dòng lens màu đặc biệt...',
      category: 'Hướng dẫn',
      imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800',
      author: {
        name: 'Minh Cosplay',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      publishedAt: '24/05/2023',
      readTime: '5 phút đọc'
    },
    {
      id: '2',
      slug: 'top-5-shop-thue-trang-phuc',
      title: 'Top 5 địa chỉ thuê trang phục Anime uy tín tại TP.HCM',
      excerpt: 'Tổng hợp các shop có chất lượng vải tốt, giặt ủi sạch sẽ và giá cả phải chăng nhất...',
      category: 'Review',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      author: {
        name: 'An Nguyễn',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      publishedAt: '20/05/2023',
      readTime: '8 phút đọc'
    },
    {
      id: '3',
      slug: 'bi-quyet-tao-dang-fest',
      title: 'Bí quyết tạo dáng khi đi Fest cho người mới bắt đầu',
      excerpt: 'Làm thế nào để không bị "đơ" trước ống kính? Hãy cùng khám phá các tips từ Pro Photographer...',
      category: 'Nhiếp ảnh',
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
      author: {
        name: 'Hoàng Photo',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      publishedAt: '18/05/2023',
      readTime: '6 phút đọc'
    }
  ];

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }
}
