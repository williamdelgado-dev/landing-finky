import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LandingConfig, ConfigApiResponse } from '@institutional/models/landing-config.model';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private router = inject(Router);
  private http = inject(HttpClient);

  // Estado centralizado con Signals (Arquitectura Angular 21)
  private _config = signal<LandingConfig | null>(null);
  public config = this._config.asReadonly();

  // Helper para saber si la configuración está lista
  public isLoaded = computed(() => this._config() !== null);

  /**
   * Extrae el subdominio si está presente (ej: salle.finky.la -> salle)
   */
  public getSubdomain(): string | null {
    if (typeof window === 'undefined') return null;
    const host = window.location.hostname;
    const parts = host.split('.');

    // Si estamos en localhost para pruebas, o en el dominio real con subdominio
    if (parts.length >= 3) {
      return parts[0];
    }

    // Soporte para pruebas locales: salle.localhost
    if (parts.length === 2 && parts[1] === 'localhost') {
      return parts[0];
    }

    return null;
  }

  // Registro de instituciones que no existen para evitar bucles en subdominios
  private failedSlugs = new Set<string>();

  /**
   * Carga la configuración desde la API basándose en el slug.
   * Si no se encuentra, redirige.
   */
  async loadConfig(slug?: string): Promise<boolean> {
    try {
      // 1. Determinar el slug (parámetro o subdominio)
      const finalSlug = (slug || this.getSubdomain() || '').toLowerCase();

      if (!finalSlug) {
        console.warn('[ConfigService] No se detectó slug ni subdominio.');
        return false;
      }

      // Si ya sabemos que falló, no re-intentamos (evita bucles infinitos)
      if (this.failedSlugs.has(finalSlug)) {
        return false;
      }

      // 2. Llamada a la API de Staging (vía Variable de Entorno)
      const apiUrl = `${environment.apiUrl}/portal-legalizaciones/ies-landing-config/search?slug=${finalSlug}`;

      const response = await firstValueFrom(this.http.get<ConfigApiResponse>(apiUrl)).catch(
        () => null,
      );

      console.log(`[ConfigService] Respuesta de API para "${finalSlug}":`, response);

      if (response && response.status && response.data) {
        this._config.set(response.data);
        this.applyColors(response.data.colores);
        return true;
      }

      console.warn(`[ConfigService] Configuración no encontrada para "${finalSlug}"`);
      
      // Registramos el fallo y redirigimos
      this.failedSlugs.add(finalSlug);
      this.router.navigate(['/']);
      return false;
    } catch (error) {
      console.error('[ConfigService] Error cargando configuración vía API:', error);
      this.router.navigate(['/']);
      return false;
    }
  }

  /**
   * Verifica si un slug o subdominio ya falló previamente
   */
  public hasFailed(slug: string): boolean {
    return this.failedSlugs.has(slug.toLowerCase());
  }

  private applySettings(config: LandingConfig) {
    this._config.set(config);
    this.applyColors(config.colores);
  }

  private applyColors(colores: { oscuro: string; claro: string }) {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-oscuro', colores.oscuro);
      root.style.setProperty('--color-claro', colores.claro);

      // Mantenemos variables anteriores por compatibilidad legacy
      root.style.setProperty('--secondary-blue', colores.oscuro);
      root.style.setProperty('--dark-bg', colores.oscuro);
    }
  }

  /**
   * Computed Signals para datos validados (Único punto de verdad)
   * Esto evita duplicar lógica de truncado y validación en cada template.
   */

  public validatedBanner = computed(() => {
    const banner = this._config()?.banner;
    if (!banner) return null;
    return {
      ...banner,
      titulo: this.truncate(banner.titulo, 150),
      contenido: this.truncate(banner.contenido, 300),
    };
  });

  public validatedBullets = computed(() => {
    const bullets = this._config()?.bullets || [];
    return bullets.slice(0, 10).map((b, i) => {
      // Golden Rule #4 check (2 words title for statistics)
      const words = (b.titulo || '').trim().split(/\s+/);
      if (words.length !== 2 && this._config()?.plantilla === 1) {
        console.warn(
          `[ConfigService] Bullet #${i + 1}: El título debería tener 2 palabras para Template 1 ("${b.titulo}")`,
        );
      }
      return {
        ...b,
        desc: this.truncate(b.desc, 100),
      };
    });
  });

  public simuladorUrl = computed(() => {
    const config = this._config();
    if (!config) return '';
    const id = config.idUniversidad || '1';
    const color = (config.colores?.oscuro || '#4876B7').replace('#', '');
    return `https://d13p412flothha.cloudfront.net/new-simulador.html?universityId=${id}&secondaryColor=${color}`;
  });

  private truncate(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '…' : text;
  }

  // Método legacy por compatibilidad (opcional, para no romper componentes actuales)
  getConfig(): LandingConfig | null {
    return this._config();
  }
}
