import { Component, inject, OnInit, OnDestroy, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';

import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

@Component({
  selector: 'app-template-uno',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent],
  templateUrl: './template-uno.html',
  styleUrl: './template-uno.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-uno-host' }
})
export class TemplateUno implements OnInit, OnDestroy {
  private configService = inject(ConfigService);

  // Consumimos directamente la señal del servicio (solo lectura)
  public config = this.configService.config;

  // Computed properties for validated data
  public validatedBanner = computed(() => {
    const banner = this.config()?.banner;
    if (!banner) return null;
    return {
      ...banner,
      titulo: this.truncate(banner.titulo, 150),
      contenido: this.truncate(banner.contenido, 300)
    };
  });

  public validatedBullets = computed(() => {
    const bullets = this.config()?.bullets || [];
    return bullets.slice(0, 10).map((b: { titulo: string; desc: string }, i: number) => {
      const words = (b.titulo || '').trim().split(/\s+/);
      if (words.length !== 2) {
        console.warn(`Bullet #${i + 1}: El título debe tener exactamente 2 palabras ("${b.titulo}")`);
      }
      return {
        ...b,
        desc: this.truncate(b.desc, 20)
      };
    });
  });

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  private truncate(text: string, limit: number): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '…' : text;
  }

  public scrollToSimulador() {
    const element = document.getElementById('seccion-simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public onOfertaChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (val) {
      this.scrollToSimulador();
    }
  }
}
