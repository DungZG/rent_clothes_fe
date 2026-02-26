import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-become-host',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzCardModule,
    NzTimelineModule,
    NzStatisticModule
  ],
  templateUrl: './become-host.component.html',
  styleUrls: ['./become-host.component.scss'],
})
export class BecomeHostComponent {
  benefits = [
    {
      title: 'Thu nhập hấp dẫn',
      desc: 'Tận dụng tủ đồ cosplay của bạn để tạo ra nguồn thu nhập thụ động mỗi tháng.',
      icon: 'money-collect'
    },
    {
      title: 'Linh hoạt tối đa',
      desc: 'Bạn toàn quyền quyết định giá thuê, thời gian thuê và đối tượng thuê.',
      icon: 'calendar'
    },
    {
      title: 'Cộng đồng văn minh',
      desc: 'Hệ thống đánh giá và xác minh giúp bạn yên tâm khi giao cho mượn trang phục.',
      icon: 'team'
    }
  ];
}
