import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../../../core/http/services/api.service';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { ApiResponse } from '../../../shared/models/api-response.model';

export interface CreateCostumePayload {
  shopId: string;
  name: string;
  description: string;
  pricePerDay: number;
  depositAmount: number;
  availableQuantity: number;
}

export interface CostumeCreated {
  id: string;
  title: string;
  pricePerDay: number;
  status: 'draft' | 'active';
}

@Injectable({ providedIn: 'root' })
export class CostumeService {
  private readonly apiService = inject(ApiService);

  createCostume(payload: CreateCostumePayload): Observable<CostumeCreated> {
    return this.apiService
      .post<ApiResponse<CostumeCreated> | CostumeCreated>(API_ENDPOINTS.LISTINGS.CREATE, payload)
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
}
