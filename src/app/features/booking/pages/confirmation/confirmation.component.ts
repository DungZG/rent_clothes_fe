import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { finalize } from 'rxjs';
import { BookingService, BookingSummary } from '../../services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-confirmation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, NzCardModule, NzButtonModule, NzTagModule],
  template: `
    <section class="confirmation-page">
      <div class="container page-shell">
        <nz-card nzTitle="Chi tiết đơn thuê" class="card-shell">
          @if (loading()) {
            <p>Đang tải thông tin đơn thuê...</p>
          } @else if (booking()) {
            <div class="line"><span>Mã đơn</span><strong>#{{ booking()!.id }}</strong></div>
            <div class="line"><span>Mã sản phẩm</span><strong>{{ booking()!.costumeId }}</strong></div>
            <div class="line"><span>Thời gian</span><strong>{{ booking()!.startDate }} → {{ booking()!.endDate }}</strong></div>
            <div class="line"><span>Số lượng</span><strong>{{ booking()!.quantity }}</strong></div>
            <div class="line"><span>Tổng tiền</span><strong>{{ booking()!.totalAmount | number }} VND</strong></div>
            <div class="line"><span>Trạng thái</span>
              <nz-tag [nzColor]="booking()!.status === 'confirmed' ? 'green' : (booking()!.status === 'cancelled' ? 'red' : 'blue')">
                {{ booking()!.status | uppercase }}
              </nz-tag>
            </div>

            <div class="actions">
              <button nz-button nzType="default" [routerLink]="['/booking/checkout']">Tạo đơn mới</button>
              <button nz-button nzType="primary" [routerLink]="['/booking/reschedule', booking()!.id]">Đổi lịch thuê</button>
              <button nz-button nzDanger [routerLink]="['/booking/cancel', booking()!.id]">Hủy đơn</button>
            </div>
          } @else {
            <p>Không tìm thấy đơn thuê.</p>
            <button nz-button nzType="primary" [routerLink]="['/booking/checkout']">Quay lại tạo đơn</button>
          }
        </nz-card>
      </div>
    </section>
  `,
  styles: [
    `
      .confirmation-page {
        padding: 24px 0 48px;
        background: var(--primary-navy-50);
      }

      .card-shell {
        border-radius: 12px;
      }

      .line {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--primary-navy-100);
      }

      .actions {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    `,
  ],
})
export class ConfirmationComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);
  private readonly notificationService = inject(NotificationService);

  readonly loading = signal(true);
  readonly booking = signal<BookingSummary | null>(null);

  constructor() {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (!bookingId) {
      this.loading.set(false);
      return;
    }

    this.bookingService
      .getBookingDetail(bookingId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (result) => this.booking.set(result),
        error: (error: unknown) => {
          this.notificationService.error(
            this.resolveApiErrorMessage(error, 'Không thể tải chi tiết đơn thuê.')
          );
          this.router.navigate(['/booking/checkout']);
        },
      });
  }

  private resolveApiErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để xem đơn thuê.';
      }

      if (error.status === 403) {
        return 'Bạn không có quyền xem đơn thuê này.';
      }

      if (error.status === 409) {
        return 'Đơn thuê đang xung đột trạng thái. Vui lòng thử lại sau.';
      }
    }

    return defaultMessage;
  }
}
