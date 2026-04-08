import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LandingConfig } from '../models/landing-config.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // Estado centralizado con Signals (Arquitectura Angular 21)
  private _config = signal<LandingConfig | null>(null);
  public config = this._config.asReadonly();

  // Helper para saber si la configuración está lista
  public isLoaded = computed(() => this._config() !== null);

  /**
   * Carga la configuración desde institutions.json basándose en el slug.
   * Si no se encuentra, redirige a la home (/)
   */
  async loadConfig(slug: string): Promise<boolean> {
    try {
      const institutions = await firstValueFrom(
        this.http.get<Record<string, LandingConfig>>('/institutions.json')
      );
      
      const slugKey = slug.toLowerCase();
      const config = institutions[slugKey];

      if (config) {
        this.applySettings(config);
        return true;
      } else {
        console.warn(`[ConfigService] Slug "${slugKey}" no encontrado. Redirigiendo...`);
        this.router.navigate(['/']);
        return false;
      }
    } catch (error) {
      console.error('[ConfigService] Error cargando configuración:', error);
      this.router.navigate(['/']);
      return false;
    }
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
      contenido: this.truncate(banner.contenido, 300)
    };
  });

  public validatedBullets = computed(() => {
    const bullets = this._config()?.bullets || [];
    return bullets.slice(0, 10).map((b, i) => {
      // Golden Rule #4 check (2 words title for statistics)
      const words = (b.titulo || '').trim().split(/\s+/);
      if (words.length !== 2 && this._config()?.plantilla === 1) {
        console.warn(`[ConfigService] Bullet #${i + 1}: El título debería tener 2 palabras para Template 1 ("${b.titulo}")`);
      }
      return {
        ...b,
        desc: this.truncate(b.desc, 100)
      };
    });
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
