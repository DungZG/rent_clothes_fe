import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyVnd', standalone: true })
export class CurrencyVndPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) return '0 ';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  }
}
