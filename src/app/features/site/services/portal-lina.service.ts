import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface PortalLinaPayload {
  phone: string;
  name: string;
  Pantalla: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortalLinaService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Solicitud de nueva llamada a Lina para el Portal Principal
   */
  requestPortalCall(payload: PortalLinaPayload): Observable<any> {
    const url = `${this.baseUrl}/user/callback-ai/create-callback-ai-v2`;
    return this.http.post<any>(url, payload);
  }
}
