import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UniversityResponse, University } from '../models/university.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private http = inject(HttpClient);
  
  // State management with Signals
  private _universities = signal<University[]>([]);
  public universities = this._universities.asReadonly();
  
  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  /**
   * Fetches all universities and their academic programs from the production API.
   */
  async getAllUniversities(): Promise<University[]> {
    try {
      this._loading.set(true);
      const url = `${environment.apiUrl}/user/universidades/get-all-not`;
      
      const response = await firstValueFrom(this.http.get<UniversityResponse>(url));
      
      if (response && response.status) {
        this._universities.set(response.data);
        return response.data;
      }
      
      console.warn('[UniversityService] API returned status false or invalid data');
      return [];
    } catch (error) {
      console.error('[UniversityService] Error fetching universities:', error);
      return [];
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Clears the cached universities.
   */
  clearCache(): void {
    this._universities.set([]);
  }
}
