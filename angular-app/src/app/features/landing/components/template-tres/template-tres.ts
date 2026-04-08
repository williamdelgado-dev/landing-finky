import { Component, inject, OnInit, OnDestroy, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

@Component({
  selector: 'app-template-tres',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent],
  templateUrl: './template-tres.html',
  styleUrl: './template-tres.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-tres-host' }
})
export class TemplateTres implements OnInit, OnDestroy {
  private configService = inject(ConfigService);

  // Consumimos directamente la señal del servicio
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
      return {
        ...b,
        desc: this.truncate(b.desc, 50)
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
    const element = document.getElementById('simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
