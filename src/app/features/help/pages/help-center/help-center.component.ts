import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

interface SupportCategory {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TopQuestion {
  id: string;
  question: string;
  link: string;
}

@Component({
  selector: 'app-help-center',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
  ],
  templateUrl: './help-center.component.html',
  styleUrls: ['./help-center.component.scss'],
})
export class HelpCenterComponent {
  searchQuery = '';

  categories: SupportCategory[] = [
    {
      id: '1',
      icon: 'rocket',
      title: 'Bắt đầu',
      description: 'Mới tham gia Thuê Gì? Tìm hiểu cách thuê hoặc cho thuê trang phục đầu tiên của bạn.',
    },
    {
      id: '2',
      icon: 'lock',
      title: 'Tài khoản & Bảo mật',
      description: 'Quản lý hồ sơ, cập nhật mật khẩu và bảo mật tài khoản với xác thực 2 yếu tố.',
    },
    {
      id: '3',
      icon: 'credit-card',
      title: 'Thuê & Thanh toán',
      description: 'Theo dõi giao dịch, hiểu phí dịch vụ và quản lý phương thức thanh toán.',
    },
    {
      id: '4',
      icon: 'home',
      title: 'Cho thuê trên Thuê Gì',
      description: 'Mẹo đăng trang phục, tương tác với người thuê và tối đa hóa thu nhập.',
    },
    {
      id: '5',
      icon: 'safety',
      title: 'Tin cậy & An toàn',
      description: 'Cam kết về an toàn. Tìm hiểu về bảo hiểm và tiêu chuẩn cộng đồng.',
    },
    {
      id: '6',
      icon: 'balance',
      title: 'Giải quyết tranh chấp',
      description: 'Cách giải quyết vấn đề với đơn thuê và xử lý khi trang phục bị hư hỏng.',
    },
  ];

  topQuestions: TopQuestion[] = [
    {
      id: '1',
      question: 'Làm thế nào để được hoàn tiền cho đơn đặt bị hủy?',
      link: '#',
    },
    {
      id: '2',
      question: 'Điều gì xảy ra nếu trang phục thuê bị trả lại hư hỏng?',
      link: '#',
    },
    {
      id: '3',
      question: 'Làm thế nào để xác minh danh tính với tư cách chủ cho thuê?',
      link: '#',
    },
    {
      id: '4',
      question: 'Khi nào tôi nhận được thanh toán từ việc cho thuê?',
      link: '#',
    },
    {
      id: '5',
      question: 'Yêu cầu bảo hiểm cho danh sách cho thuê là gì?',
      link: '#',
    },
  ];

  onSearch(): void {
    console.log('Search:', this.searchQuery);
  }

  onCategoryClick(category: SupportCategory): void {
    console.log('Category clicked:', category);
  }

  onQuestionClick(question: TopQuestion): void {
    console.log('Question clicked:', question);
  }

  onStartChat(): void {
    console.log('Start chat');
  }

  onJoinCommunity(): void {
    console.log('Join community');
  }
}
