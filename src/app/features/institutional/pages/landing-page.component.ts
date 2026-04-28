import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from '@institutional/services/config.service';
import { ToastService } from '@institutional/services/toast.service';
import { TemplateUno } from '@institutional/components/template-uno/template-uno';
import { TemplateDos } from '@institutional/components/template-dos/template-dos';
import { TemplateTres } from '@institutional/components/template-tres/template-tres';
import { FloatingWidgetComponent } from '@institutional/components/floating-widget/floating-widget';
import { ToastComponent } from '@institutional/components/toast/toast';

type PageState = 'loading' | 'loaded' | 'error';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [TemplateUno, TemplateDos, TemplateTres, FloatingWidgetComponent, ToastComponent],
  template: `
    <app-toast />
    @if (state() === 'loading') {
      <div class="lp-loading">
        <div class="lp-spinner"></div>
        <p>Cargando configuración...</p>
      </div>
    } @else if (state() === 'error') {
      <div class="lp-not-found">
        <div class="lp-404-icon">🏫</div>
        <h1>Institución no encontrada</h1>
        <p>
          No encontramos una configuración para <strong>{{ slug() }}</strong
          >.<br />
          Verifica que el nombre de la institución sea correcto.
        </p>
      </div>
    } @else {
      @switch (plantilla()) {
        @case (1) {
          <app-template-uno />
        }
        @case (2) {
          <app-template-dos />
        }
        @case (3) {
          <app-template-tres />
        }
        @default {
          <div class="lp-not-found">
            <h1>Plantilla no disponible</h1>
          </div>
        }
      }
      <app-floating-widget [config]="config()" />
      <!-- Re-sync component state -->
    }
  `,
  styles: [
    `
      .lp-loading {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        color: #666;
        gap: 20px;
        background: #f8f9fa;
      }
      .lp-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid #e0e0e0;
        border-top-color: #00acca;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      .lp-not-found {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Inter', sans-serif;
        text-align: center;
        padding: 40px;
        background: #f8f9fa;
      }
      .lp-404-icon {
        font-size: 80px;
        margin-bottom: 24px;
      }
      .lp-not-found h1 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 16px;
      }
      .lp-not-found p {
        font-size: 1.1rem;
        color: #777;
        line-height: 1.7;
      }
    `,
  ],
})
export class LandingPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private configService = inject(ConfigService);
  private toastService = inject(ToastService);

  public slug = signal('');
  public state = signal<PageState>('loading');

  public config = this.configService.config;

  // Forzamos a Number para evitar errores si la API devuelve un string (ej: "2" vs 2)
  public plantilla = computed(() => {
    const p = this.configService.config()?.plantilla;
    return p !== undefined ? Number(p) : 1;
  });

  async ngOnInit() {
    // 1. Prioridad 1: Parámetro de ruta (/:slug)
    let slugValue = this.route.snapshot.paramMap.get('slug');

    // 2. Prioridad 2: Subdominio (vía ConfigService)
    if (!slugValue) {
      slugValue = this.configService.getSubdomain();
    }

    this.slug.set(slugValue || 'unknown');

    // 3. Cargar configuración
    const success = await this.configService.loadConfig(slugValue || undefined);

    if (success) {
      console.log('[LandingPage] Configuración cargada con éxito:', this.config());
      console.log('[LandingPage] Plantilla activa:', this.plantilla());
      this.state.set('loaded');
      this.validateBannerDimensions();
    } else {
      // El ConfigService ya se encarga de redirigir si loadConfig devuelve false
      console.warn('[LandingPage] Configuración fallida para slug:', this.slug());
    }
  }

  private validateBannerDimensions() {
    const config = this.configService.config();
    if (!config?.banner) return;

    // Validación PC
    if (config.banner.pc) {
      const imgPc = new Image();
      imgPc.src = config.banner.pc;
      imgPc.onload = () => {
        /* const isIdeal =
          (imgPc.width >= 1440 && imgPc.height >= 960) ||
          (imgPc.width >= 1920 && imgPc.height >= 1080); */
        /* if (!isIdeal) {
          this.toastService.show(
            `Aviso: La imagen de escritorio tiene dimensiones bajas (${imgPc.width}x${imgPc.height}px). Podría no verse bien en pantallas grandes.`,
            'warning',
            8000
          );
        } */
      };
    }

    // Validación Móvil
    if (config.banner.movil) {
      const imgMov = new Image();
      imgMov.src = config.banner.movil;
      imgMov.onload = () => {
        const isIdealMob =
          (imgMov.width >= 320 && imgMov.height >= 560) ||
          (imgMov.width >= 640 && imgMov.height >= 1120);
        if (!isIdealMob) {
          this.toastService.show(
            `Aviso: La imagen móvil (${imgMov.width}x${imgMov.height}px) no es ideal. Se recomienda 320x560 o 640x1120.`,
            'info',
            8000,
          );
        }
      };
    }
  }
}
