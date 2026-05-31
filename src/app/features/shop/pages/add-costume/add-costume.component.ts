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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { finalize } from 'rxjs';
import {
  CostumeService,
  CreateCostumePayload,
} from '../../services/costume.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-add-costume',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTagModule,
    NzIconModule,
  ],
  template: `
    <section class="add-costume-page">
      <div class="container page-shell">
        <div class="intro-block">
          <h1>Đăng sản phẩm cho thuê</h1>
          <p>
            Hoàn thiện thông tin sản phẩm để khách có thể thuê ngay. Form này kết
            nối API <code>/api/listings</code>.
          </p>
        </div>

        <nz-card nzTitle="Thông tin trang phục" class="form-card">
          <form [formGroup]="form" (ngSubmit)="submit()" nz-form nzLayout="vertical">
            <div class="grid cols-2">
              <nz-form-item>
                <nz-form-label nzRequired>Tên sản phẩm</nz-form-label>
                <nz-form-control [nzErrorTip]="titleErrorTpl">
                  <input nz-input formControlName="title" placeholder="Ví dụ: Kimono Nhật Bản" />
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Danh mục</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <nz-select formControlName="category" nzPlaceHolder="Chọn danh mục">
                    <nz-option nzValue="cosplay" nzLabel="Cosplay"></nz-option>
                    <nz-option nzValue="dac-biet" nzLabel="Dạ hội"></nz-option>
                    <nz-option nzValue="ao-dai" nzLabel="Áo dài"></nz-option>
                    <nz-option nzValue="su-kien" nzLabel="Sự kiện"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>
            </div>

            <div class="grid cols-3">
              <nz-form-item>
                <nz-form-label nzRequired>Kích cỡ</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <nz-select formControlName="size" nzPlaceHolder="Chọn size">
                    <nz-option nzValue="XS" nzLabel="XS"></nz-option>
                    <nz-option nzValue="S" nzLabel="S"></nz-option>
                    <nz-option nzValue="M" nzLabel="M"></nz-option>
                    <nz-option nzValue="L" nzLabel="L"></nz-option>
                    <nz-option nzValue="XL" nzLabel="XL"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Tình trạng</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <nz-select formControlName="condition" nzPlaceHolder="Chọn tình trạng">
                    <nz-option nzValue="new" nzLabel="Mới"></nz-option>
                    <nz-option nzValue="good" nzLabel="Rất tốt"></nz-option>
                    <nz-option nzValue="fair" nzLabel="Đã qua sử dụng"></nz-option>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Khu vực nhận đồ</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <input nz-input formControlName="location" placeholder="Quận 1, TP.HCM" />
                </nz-form-control>
              </nz-form-item>
            </div>

            <div class="grid cols-2">
              <nz-form-item>
                <nz-form-label nzRequired>Giá thuê/ngày (VND)</nz-form-label>
                <nz-form-control [nzErrorTip]="priceErrorTpl">
                  <nz-input-number
                    formControlName="pricePerDay"
                    [nzMin]="50000"
                    [nzStep]="50000"
                    [nzFormatter]="formatVnd"
                    [nzParser]="parseNumber"
                    style="width: 100%"
                  ></nz-input-number>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Tiền cọc (VND)</nz-form-label>
                <nz-form-control [nzErrorTip]="depositErrorTpl">
                  <nz-input-number
                    formControlName="deposit"
                    [nzMin]="0"
                    [nzStep]="50000"
                    [nzFormatter]="formatVnd"
                    [nzParser]="parseNumber"
                    style="width: 100%"
                  ></nz-input-number>
                </nz-form-control>
              </nz-form-item>
            </div>

            <div class="grid cols-2">
              <nz-form-item>
                <nz-form-label nzRequired>Từ ngày</nz-form-label>
                <nz-form-control [nzErrorTip]="requiredTpl">
                  <nz-date-picker formControlName="availableFrom" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-label nzRequired>Đến ngày</nz-form-label>
                <nz-form-control [nzErrorTip]="dateRangeErrorTpl">
                  <nz-date-picker formControlName="availableTo" nzFormat="yyyy-MM-dd" style="width: 100%"></nz-date-picker>
                </nz-form-control>
              </nz-form-item>
            </div>

            <nz-form-item>
              <nz-form-label nzRequired>Mô tả chi tiết</nz-form-label>
              <nz-form-control [nzErrorTip]="requiredTpl">
                <textarea
                  nz-input
                  rows="4"
                  formControlName="description"
                  placeholder="Mô tả chất liệu, phụ kiện đi kèm, lưu ý sử dụng"
                ></textarea>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-label>Ảnh sản phẩm (URL)</nz-form-label>
              <nz-form-control>
                <div class="tag-input-row">
                  <input
                    nz-input
                    [value]="imageInput()"
                    (input)="onImageInput($any($event.target).value)"
                    placeholder="Dán URL ảnh và nhấn thêm"
                  />
                  <button nz-button nzType="default" type="button" (click)="addImageUrl()">
                    <span nz-icon nzType="plus"></span>
                    Thêm ảnh
                  </button>
                </div>
                <div class="tag-list" *ngIf="imageUrls().length">
                  <nz-tag *ngFor="let image of imageUrls(); trackBy: trackByValue" nzMode="closeable" (nzOnClose)="removeImageUrl(image)">
                    {{ image }}
                  </nz-tag>
                </div>
              </nz-form-control>
            </nz-form-item>

            <div class="actions">
              <button nz-button nzType="default" type="button" (click)="reset()" [disabled]="submitting()">
                Làm mới
              </button>
              <button nz-button nzType="primary" type="submit" [disabled]="form.invalid || submitting()">
                {{ submitting() ? 'Đang đăng...' : 'Đăng sản phẩm' }}
              </button>
            </div>
          </form>
        </nz-card>

        <nz-card nzTitle="Tóm tắt nhanh" class="summary-card">
          <p><strong>Tên:</strong> {{ form.controls.title.value || 'Chưa có' }}</p>
          <p><strong>Giá/ngày:</strong> {{ form.controls.pricePerDay.value || 0 | number }} VND</p>
          <p><strong>Tiền cọc:</strong> {{ form.controls.deposit.value || 0 | number }} VND</p>
          <p><strong>Số ảnh:</strong> {{ imageUrls().length }}</p>
          <p><strong>Trạng thái form:</strong> {{ form.valid ? 'Hợp lệ' : 'Chưa hợp lệ' }}</p>
        </nz-card>
      </div>
    </section>

    <ng-template #requiredTpl>Trường này là bắt buộc.</ng-template>
    <ng-template #titleErrorTpl>
      <span *ngIf="form.controls.title.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="form.controls.title.hasError('minlength')">Tên sản phẩm tối thiểu 5 ký tự.</span>
    </ng-template>
    <ng-template #priceErrorTpl>
      <span *ngIf="form.controls.pricePerDay.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="form.controls.pricePerDay.hasError('min')">Giá thuê tối thiểu 50.000 VND.</span>
    </ng-template>
    <ng-template #depositErrorTpl>
      <span *ngIf="form.controls.deposit.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="form.controls.deposit.hasError('min')">Tiền cọc không được âm.</span>
    </ng-template>
    <ng-template #dateRangeErrorTpl>
      <span *ngIf="form.controls.availableTo.hasError('required')">Trường này là bắt buộc.</span>
      <span *ngIf="dateRangeInvalid()">Ngày kết thúc phải sau hoặc bằng ngày bắt đầu.</span>
    </ng-template>
  `,
  styles: [
    `
      .add-costume-page {
        padding: 24px 0 48px;
        background: var(--primary-navy-50);
      }

      .page-shell {
        display: grid;
        gap: 20px;
      }

      .intro-block h1 {
        margin: 0 0 8px;
      }

      .intro-block p {
        color: var(--primary-navy-700);
        margin: 0;
      }

      .form-card,
      .summary-card {
        border-radius: 12px;
      }

      .grid {
        display: grid;
        gap: 12px;
      }

      .cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .cols-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .tag-input-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
      }

      .tag-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .actions {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }

      @media (max-width: 992px) {
        .cols-2,
        .cols-3 {
          grid-template-columns: 1fr;
        }

        .tag-input-row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class AddCostumeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly costumeService = inject(CostumeService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly defaultShopId = '00000000-0000-0000-0000-000000000001';

  readonly submitting = signal(false);
  readonly imageUrls = signal<string[]>([]);
  readonly imageInput = signal('');

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    category: ['', [Validators.required]],
    size: ['', [Validators.required]],
    condition: ['', [Validators.required]],
    location: ['', [Validators.required]],
    pricePerDay: [100000, [Validators.required, Validators.min(50000)]],
    deposit: [200000, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    availableFrom: [null as Date | null, [Validators.required]],
    availableTo: [null as Date | null, [Validators.required]],
  });

  readonly dateRangeInvalid = computed(() => {
    const start = this.form.controls.availableFrom.value;
    const end = this.form.controls.availableTo.value;

    if (!start || !end) {
      return false;
    }

    return end.getTime() < start.getTime();
  });

  readonly formatVnd = (value: number) => `${new Intl.NumberFormat('vi-VN').format(value)} VND`;

  readonly parseNumber = (value: string) => Number(value.replace(/\D/g, ''));

  onImageInput(value: string): void {
    this.imageInput.set(value.trim());
  }

  addImageUrl(): void {
    const value = this.imageInput();
    if (!value) {
      return;
    }

    try {
      // Validate URL shape only
      new URL(value);
      this.imageUrls.update((items) => (items.includes(value) ? items : [...items, value]));
      this.imageInput.set('');
    } catch {
      this.notificationService.warning('URL ảnh không hợp lệ.');
    }
  }

  removeImageUrl(url: string): void {
    this.imageUrls.update((items) => items.filter((item) => item !== url));
  }

  reset(): void {
    this.form.reset({
      title: '',
      category: '',
      size: '',
      condition: '',
      location: '',
      pricePerDay: 100000,
      deposit: 200000,
      description: '',
      availableFrom: null,
      availableTo: null,
    });
    this.imageUrls.set([]);
    this.imageInput.set('');
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.dateRangeInvalid()) {
      this.notificationService.warning('Vui lòng kiểm tra lại thông tin sản phẩm.');
      return;
    }

    const payload = this.buildPayload();
    this.submitting.set(true);

    this.costumeService
      .createCostume(payload)
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (result) => {
          this.notificationService.success(`Đăng sản phẩm thành công: ${result.title}`);
          this.router.navigate(['/shop/inventory']);
        },
        error: (error: unknown) => {
          this.notificationService.error(
            this.resolveApiErrorMessage(error, 'Không thể đăng sản phẩm, vui lòng thử lại.')
          );
        },
      });
  }

  private resolveApiErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        return 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để đăng sản phẩm.';
      }

      if (error.status === 403) {
        return 'Tài khoản hiện tại không có quyền đăng sản phẩm.';
      }

      if (error.status === 409) {
        return 'Sản phẩm bị xung đột dữ liệu. Vui lòng tải lại và thử lại.';
      }
    }

    return defaultMessage;
  }

  trackByValue(_: number, value: string): string {
    return value;
  }

  private buildPayload(): CreateCostumePayload {
    const value = this.form.getRawValue();

    return {
      shopId: this.defaultShopId,
      name: value.title,
      description: value.description,
      pricePerDay: value.pricePerDay,
      depositAmount: value.deposit,
      availableQuantity: 1,
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
