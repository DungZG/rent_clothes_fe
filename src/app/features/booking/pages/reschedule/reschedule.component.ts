import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { finalize } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-reschedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzFormModule,
    NzDatePickerModule,
  ],
  template: `
    <section class="reschedule-page">
      <div class="container page-shell">
        <nz-card nzTitle="Đổi lịch thuê" class="card-shell">
          @if (!bookingId()) {
            <p>Không có mã đơn hợp lệ.</p>
            <button nz-button nzType="primary" [routerLink]="['/booking/checkout']">Về trang thuê</button>
          } @else {
            <p class="subtitle">Đơn đang xử lý: <strong>#{{ bookingId() }}</strong></p>

            <form nz-form nzLayout="vertical" [formGroup]="form" (ngSubmit)="submit()">
              <div class="grid cols-2">
                <nz-form-item>
                  <nz-form-label nzRequired>Ngày bắt đầu mới</nz-form-label>
                  <nz-form-control [nzErrorTip]="requiredTpl">
                    <nz-date-picker formControlName="startDate" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                  </nz-form-control>
                </nz-form-item>

                <nz-form-item>
                  <nz-form-label nzRequired>Ngày kết thúc mới</nz-form-label>
                  <nz-form-control [nzErrorTip]="endDateErrorTpl">
                    <nz-date-picker formControlName="endDate" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                  </nz-form-control>
                </nz-form-item>
              </div>

              <div class="actions">
                <button nz-button nzType="default" type="button" [routerLink]="['/booking/confirmation', bookingId()]" [disabled]="submitting()">
                  Quay lại chi tiết đơn
                </button>
                <button nz-button nzType="primary" type="submit" [disabled]="form.invalid || dateRangeInvalid() || submitting()">
                  {{ submitting() ? 'Đang cập nhật...' : 'Xác nhận đổi lịch' }}
                </button>
              </div>
            </form>
          }
        </nz-card>
      </div>
    </section>

    <ng-template #requiredTpl>Trường này là bắt buộc.</ng-template>
    <ng-template #endDateErrorTpl>
      <span *ngIf="form.controls.endDate.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="dateRangeInvalid()">Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.</span>
    </ng-template>
  `,
  styles: [
    `
      .reschedule-page {
        padding: 24px 0 48px;
        background: var(--primary-navy-50);
      }

      .subtitle {
        margin-bottom: 12px;
        color: var(--primary-navy-700);
      }

      .grid {
        display: grid;
        gap: 12px;
      }

      .cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .actions {
        margin-top: 12px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }

      @media (max-width: 768px) {
        .cols-2 {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class RescheduleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly notificationService = inject(NotificationService);

  readonly submitting = signal(false);
  readonly bookingId = signal<string>('');

  readonly form = this.fb.nonNullable.group({
    startDate: [null as Date | null, [Validators.required]],
    endDate: [null as Date | null, [Validators.required]],
  });

  readonly dateRangeInvalid = computed(() => {
    const start = this.form.controls.startDate.value;
    const end = this.form.controls.endDate.value;

    if (!start || !end) {
      return false;
    }

    return end.getTime() < start.getTime();
  });

  constructor() {
    this.bookingId.set(this.route.snapshot.paramMap.get('id') ?? '');
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.dateRangeInvalid() || !this.bookingId()) {
      return;
    }

    const startDate = this.toIsoDate(this.form.controls.startDate.value);
    const endDate = this.toIsoDate(this.form.controls.endDate.value);

    this.submitting.set(true);
    this.bookingService
      .rescheduleBooking(this.bookingId(), startDate, endDate)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (booking) => {
          this.notificationService.success(`Đã cập nhật lịch thuê cho đơn #${booking.id}.`);
          this.router.navigate(['/booking/confirmation', booking.id]);
        },
        error: () => {
          this.notificationService.error('Không thể đổi lịch thuê.');
        },
      });
  }

  private toIsoDate(date: Date | null): string {
    if (!date) {
      return '';
    }

    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      .toISOString()
      .slice(0, 10);
  }
}
