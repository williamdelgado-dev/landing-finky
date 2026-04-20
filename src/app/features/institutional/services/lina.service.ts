import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface LinaCallPayload {
  phone: string;
  caller_id: string;
  promptType: string;
  customContext: {
    nombre: string;
    phone: string;
  };
}

export interface LinaCallResponse {
  status: boolean;
  message: string;
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class LinaService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  /**
   * Solicitud de nueva llamada a Lina (Portal Legalizaciones)
   * @param payload Datos de la llamada
   * @returns Observable con la respuesta
   */
  requestNewCall(payload: LinaCallPayload): Observable<LinaCallResponse> {
    const url = `${this.baseUrl}/portal-legalizaciones/lina/new-call`;
    return this.http.post<LinaCallResponse>(url, payload);
  }
}
