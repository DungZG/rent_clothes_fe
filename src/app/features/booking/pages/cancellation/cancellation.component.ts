import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { finalize } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-cancellation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ],
  template: `
    <section class="cancellation-page">
      <div class="container page-shell">
        <nz-card nzTitle="Hủy đơn thuê" class="card-shell">
          @if (!bookingId()) {
            <p>Không có mã đơn hợp lệ.</p>
            <button nz-button nzType="primary" [routerLink]="['/booking/checkout']">Về trang thuê</button>
          } @else {
            <p class="subtitle">Bạn đang hủy đơn <strong>#{{ bookingId() }}</strong>. Vui lòng nhập lý do để hoàn tất.</p>

            <form nz-form nzLayout="vertical" [formGroup]="form" (ngSubmit)="submit()">
              <nz-form-item>
                <nz-form-label nzRequired>Lý do hủy</nz-form-label>
                <nz-form-control [nzErrorTip]="reasonErrorTpl">
                  <textarea nz-input rows="4" formControlName="reason" placeholder="Ví dụ: đổi lịch sự kiện, không còn nhu cầu"></textarea>
                </nz-form-control>
              </nz-form-item>

              <div class="actions">
                <button nz-button nzType="default" type="button" [routerLink]="['/booking/confirmation', bookingId()]" [disabled]="submitting()">
                  Quay lại đơn thuê
                </button>
                <button nz-button nzDanger type="submit" [disabled]="form.invalid || submitting()">
                  {{ submitting() ? 'Đang hủy...' : 'Xác nhận hủy đơn' }}
                </button>
              </div>
            </form>
          }
        </nz-card>
      </div>
    </section>

    <ng-template #reasonErrorTpl>
      <span *ngIf="form.controls.reason.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="form.controls.reason.hasError('minlength')">Lý do hủy tối thiểu 10 ký tự.</span>
    </ng-template>
  `,
  styles: [
    `
      .cancellation-page {
        padding: 24px 0 48px;
        background: var(--primary-navy-50);
      }

      .subtitle {
        color: var(--primary-navy-700);
        margin-bottom: 12px;
      }

      .actions {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    `,
  ],
})
export class CancellationComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly notificationService = inject(NotificationService);

  readonly submitting = signal(false);
  readonly bookingId = signal<string>('');

  readonly form = this.fb.nonNullable.group({
    reason: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor() {
    this.bookingId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.bookingId()) {
      return;
    }

    this.submitting.set(true);
    this.bookingService
      .cancelBooking(this.bookingId(), this.form.controls.reason.value)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (booking) => {
          this.notificationService.success(`Đơn #${booking.id} đã được hủy.`);
          this.router.navigate(['/booking/confirmation', booking.id]);
        },
        error: () => {
          this.notificationService.error('Không thể hủy đơn thuê.');
        },
      });
  }
}
