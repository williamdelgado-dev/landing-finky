import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UniversityResponse, University, AcademicProgram, AcademicProgramResponse } from '../models/university.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private http = inject(HttpClient);
  
  // State management with Signals
  private _universities = signal<University[]>([]);
  public universities = this._universities.asReadonly();

  private _programs = signal<AcademicProgram[]>([]);
  public programs = this._programs.asReadonly();
  
  private _loading = signal<boolean>(false);
  public loading = this._loading.asReadonly();

  /**
   * Fetches all universities from the production API.
   */
  async getAllUniversities(): Promise<University[]> {
    try {
      this._loading.set(true);
      const url = `${environment.apiUrl}/universidades/v2/get-all?limit=1000&enabled=true`;
      
      const response = await firstValueFrom(this.http.get<UniversityResponse>(url));
      
      if (response && response.status) {
        this._universities.set(response.data.data);
        return response.data.data;
      }
      
      return [];
    } catch (error) {
      console.error('[UniversityService] Error fetching universities:', error);
      return [];
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Fetches all academic programs from the production API.
   */
  async getAllPrograms(): Promise<AcademicProgram[]> {
    try {
      this._loading.set(true);
      const url = `${environment.apiUrl}/programas/get-academic-programs?limit=5000`;
      
      const response = await firstValueFrom(this.http.get<AcademicProgramResponse>(url));
      
      if (response && response.status) {
        this._programs.set(response.data.data);
        return response.data.data;
      }
      
      return [];
    } catch (error) {
      console.error('[UniversityService] Error fetching programs:', error);
      return [];
    } finally {
      this._loading.set(false);
    }
  }

  /**
   * Clears the cached data.
   */
  clearCache(): void {
    this._universities.set([]);
    this._programs.set([]);
  }
}
