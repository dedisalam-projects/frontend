import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiResponse {
  message: string;
  services?: {
    user: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getHello(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.apiUrl}/api/v1/hello`);
  }
}
