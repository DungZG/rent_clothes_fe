import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/services/api.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { ApiResponse } from '../../../shared/models/api-response.model';

export interface CreateBookingPayload {
  customerId: string;
  shopId: string;
  startDate: string;
  endDate: string;
  items: {
    costumeId: string;
    quantity: number;
  }[];
  notes: string;
}

export interface BookingSummary {
  id: string;
  costumeId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  startDate: string;
  endDate: string;
  quantity: number;
  totalAmount: number;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly apiService = inject(ApiService);

  createBooking(payload: CreateBookingPayload): Observable<BookingSummary> {
    return this.apiService
      .post<ApiResponse<BookingSummary> | BookingSummary>(API_ENDPOINTS.BOOKINGS.CHECKOUT, payload)
      .pipe(map((response) => this.unwrapResponse(response)));
  }

  getBookingDetail(id: string): Observable<BookingSummary> {
    return this.apiService
      .get<ApiResponse<BookingSummary> | BookingSummary>(API_ENDPOINTS.BOOKINGS.DETAIL(id))
      .pipe(map((response) => this.unwrapResponse(response)));
  }

  cancelBooking(id: string, reason: string): Observable<BookingSummary> {
    return this.apiService
      .post<ApiResponse<BookingSummary> | BookingSummary>(API_ENDPOINTS.BOOKINGS.CANCEL(id), {
        reason,
      })
      .pipe(map((response) => this.unwrapResponse(response)));
  }

  rescheduleBooking(id: string, startDate: string, endDate: string): Observable<BookingSummary> {
    return this.apiService
      .patch<ApiResponse<BookingSummary> | BookingSummary>(API_ENDPOINTS.BOOKINGS.RESCHEDULE(id), {
        startDate,
        endDate,
      })
      .pipe(map((response) => this.unwrapResponse(response)));
  }

  private unwrapResponse<T>(response: ApiResponse<T> | T): T {
    if (this.isApiResponse(response)) {
      return response.data;
    }
    return response;
  }

  private isApiResponse<T>(response: ApiResponse<T> | T): response is ApiResponse<T> {
    return !!response && typeof response === 'object' && 'success' in response && 'data' in response;
  }

  private calculateRentalDays(startDate: string, endDate: string): number {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (!start || !end || end < start) {
      return 1;
    }
    return Math.max(1, Math.ceil((end - start) / 86400000) + 1);
  }
}
