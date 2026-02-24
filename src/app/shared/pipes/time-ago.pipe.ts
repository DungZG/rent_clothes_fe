import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timeAgo', standalone: true })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return 'vừa xong';
    if (diffSec < 3600) return Math.floor(diffSec / 60) + ' phút trước';
    if (diffSec < 86400) return Math.floor(diffSec / 3600) + ' giờ trước';
    if (diffSec < 2592000) return Math.floor(diffSec / 86400) + ' ngày trước';
    if (diffSec < 31536000) return Math.floor(diffSec / 2592000) + ' tháng trước';
    return Math.floor(diffSec / 31536000) + ' năm trước';
  }
}
