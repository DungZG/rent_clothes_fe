import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { finalize } from 'rxjs';
import { BookingService, CreateBookingPayload } from '../../services/booking.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-checkout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzDatePickerModule,
    NzRadioModule,
  ],
  template: `
    <section class="checkout-page">
      <div class="container page-shell">
        <header class="hero">
          <h1>Thuê sản phẩm</h1>
          <p>Hoàn tất thông tin thuê và xác nhận đơn ngay trong một bước.</p>
        </header>

        <div class="content-grid">
          <nz-card nzTitle="Thông tin thuê" class="form-card">
            <form nz-form nzLayout="vertical" [formGroup]="form" (ngSubmit)="submit()">
              <nz-form-item>
                <nz-form-label nzRequired>Mã sản phẩm</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <input nz-input formControlName="costumeId" placeholder="Ví dụ: costume_001" />
                </nz-form-control>
              </nz-form-item>

              <div class="grid cols-2">
                <nz-form-item>
                  <nz-form-label nzRequired>Ngày bắt đầu</nz-form-label>
                  <nz-form-control [nzErrorTip]="requiredTpl">
                    <nz-date-picker formControlName="startDate" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                  </nz-form-control>
                </nz-form-item>

                <nz-form-item>
                  <nz-form-label nzRequired>Ngày kết thúc</nz-form-label>
                  <nz-form-control [nzErrorTip]="endDateErrorTpl">
                    <nz-date-picker formControlName="endDate" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                  </nz-form-control>
                </nz-form-item>
              </div>

              <nz-form-item>
                <nz-form-label nzRequired>Số lượng</nz-form-label>
                <nz-form-control [nzErrorTip]="quantityErrorTpl">
                  <nz-input-number
                    formControlName="quantity"
                    [nzMin]="1"
                    [nzMax]="10"
                    style="width: 100%"
                  ></nz-input-number>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Phương thức nhận đồ</nz-form-label>
                <nz-form-control>
                  <nz-radio-group formControlName="deliveryMethod">
                    <label nz-radio nzValue="pickup">Nhận tại cửa hàng</label>
                    <label nz-radio nzValue="delivery">Giao tận nơi</label>
                  </nz-radio-group>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label [nzRequired]="isDelivery()">Địa chỉ nhận đồ</nz-form-label>
                <nz-form-control [nzErrorTip]="addressErrorTpl">
                  <input nz-input formControlName="deliveryAddress" placeholder="Số nhà, phường/xã, quận/huyện" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label>Ghi chú</nz-form-label>
                <nz-form-control>
                  <textarea nz-input rows="3" formControlName="note" placeholder="Thông tin thêm cho shop"></textarea>
                </nz-form-control>
              </nz-form-item>

              <div class="actions">
                <button nz-button nzType="default" type="button" (click)="reset()" [disabled]="submitting()">
                  Làm mới
                </button>
                <button nz-button nzType="primary" type="submit" [disabled]="form.invalid || dateRangeInvalid() || submitting()">
                  {{ submitting() ? 'Đang tạo đơn...' : 'Xác nhận thuê' }}
                </button>
              </div>
            </form>
          </nz-card>

          <nz-card nzTitle="Tóm tắt đơn thuê" class="summary-card">
            <div class="line-item">
              <span>Mã sản phẩm</span>
              <strong>{{ form.controls.costumeId.value || '-' }}</strong>
            </div>
            <div class="line-item">
              <span>Thời gian thuê</span>
              <strong>{{ rentalDays() }} ngày</strong>
            </div>
            <div class="line-item">
              <span>Số lượng</span>
              <strong>{{ form.controls.quantity.value }}</strong>
            </div>
            <div class="line-item">
              <span>Đơn giá giả lập</span>
              <strong>{{ unitPrice | number }} VND / ngày</strong>
            </div>
            <div class="line-item total">
              <span>Tạm tính</span>
              <strong>{{ estimatedTotal() | number }} VND</strong>
            </div>
            @if (dateRangeInvalid()) {
              <p class="error-text">Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.</p>
            }
          </nz-card>
        </div>
      </div>
    </section>

    <ng-template #requiredTpl>Trường này là bắt buộc.</ng-template>
    <ng-template #quantityErrorTpl>
      <span *ngIf="form.controls.quantity.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="form.controls.quantity.hasError('min')">Số lượng tối thiểu là 1.</span>
      <span *ngIf="form.controls.quantity.hasError('max')">Số lượng tối đa là 10.</span>
    </ng-template>
    <ng-template #endDateErrorTpl>
      <span *ngIf="form.controls.endDate.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="dateRangeInvalid()">Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.</span>
    </ng-template>
    <ng-template #addressErrorTpl>
      <span *ngIf="isDelivery() && form.controls.deliveryAddress.hasError('required')">Vui lòng nhập địa chỉ giao hàng.</span>
      <span *ngIf="isDelivery() && form.controls.deliveryAddress.hasError('minlength')">Địa chỉ tối thiểu 10 ký tự.</span>
    </ng-template>
  `,
  styles: [
    `
      .checkout-page {
        padding: 24px 0 48px;
        background: var(--primary-navy-50);
      }

      .page-shell {
        display: grid;
        gap: 18px;
      }

      .hero h1 {
        margin: 0 0 8px;
      }

      .hero p {
        margin: 0;
        color: var(--primary-navy-700);
      }

      .content-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 16px;
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

      .summary-card {
        height: fit-content;
      }

      .line-item {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--primary-navy-100);
      }

      .line-item.total {
        border-bottom: none;
      }

      .error-text {
        margin-top: 12px;
        color: var(--error);
      }

      @media (max-width: 992px) {
        .content-grid {
          grid-template-columns: 1fr;
        }

        .cols-2 {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CheckoutComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly defaultCustomerId = '00000000-0000-0000-0000-000000000001';
  private readonly defaultShopId = '00000000-0000-0000-0000-000000000001';

  readonly unitPrice = 180000;
  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    costumeId: ['', [Validators.required]],
    startDate: [null as Date | null, [Validators.required]],
    endDate: [null as Date | null, [Validators.required]],
    quantity: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    deliveryMethod: ['pickup' as 'pickup' | 'delivery', [Validators.required]],
    deliveryAddress: [''],
    note: [''],
  });

  readonly isDelivery = computed(() => this.form.controls.deliveryMethod.value === 'delivery');

  readonly dateRangeInvalid = computed(() => {
    const start = this.form.controls.startDate.value;
    const end = this.form.controls.endDate.value;

    if (!start || !end) {
      return false;
    }

    return end.getTime() < start.getTime();
  });

  readonly rentalDays = computed(() => {
    const start = this.form.controls.startDate.value;
    const end = this.form.controls.endDate.value;

    if (!start || !end || end.getTime() < start.getTime()) {
      return 1;
    }

    return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1);
  });

  readonly estimatedTotal = computed(() => {
    return this.rentalDays() * this.form.controls.quantity.value * this.unitPrice;
  });

  constructor() {
    this.form.controls.deliveryMethod.valueChanges.subscribe((method) => {
      const addressControl = this.form.controls.deliveryAddress;
      if (method === 'delivery') {
        addressControl.setValidators([Validators.required, Validators.minLength(10)]);
      } else {
        addressControl.clearValidators();
        addressControl.setValue('');
      }
      addressControl.updateValueAndValidity();
    });
  }

  reset(): void {
    this.form.reset({
      costumeId: '',
      startDate: null,
      endDate: null,
      quantity: 1,
      deliveryMethod: 'pickup',
      deliveryAddress: '',
      note: '',
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.dateRangeInvalid()) {
      this.notificationService.warning('Vui lòng kiểm tra lại thông tin thuê.');
      return;
    }

    const payload = this.buildPayload();
    this.submitting.set(true);

    this.bookingService
      .createBooking(payload)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (booking) => {
          this.notificationService.success(`Đã tạo đơn thuê #${booking.id}`);
          this.router.navigate(['/booking/confirmation', booking.id]);
        },
        error: (error: unknown) => {
          this.notificationService.error(
            this.resolveApiErrorMessage(error, 'Không thể tạo đơn thuê.')
          );
        },
      });
  }

  private resolveApiErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tạo đơn thuê.';
      }

      if (error.status === 403) {
        return 'Tài khoản hiện tại không có quyền tạo đơn thuê.';
      }

      if (error.status === 409) {
        return 'Khung thời gian thuê đã được đặt. Vui lòng chọn thời gian khác.';
      }
    }

    return defaultMessage;
  }

  private buildPayload(): CreateBookingPayload {
    const value = this.form.getRawValue();

    return {
      customerId: this.defaultCustomerId,
      shopId: this.defaultShopId,
      startDate: this.toIsoDate(value.startDate),
      endDate: this.toIsoDate(value.endDate),
      items: [
        {
          costumeId: value.costumeId,
          quantity: value.quantity,
        },
      ],
      notes: value.note,
    };
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
