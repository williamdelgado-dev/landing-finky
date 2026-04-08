import { Component, inject, OnInit, OnDestroy, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

@Component({
  selector: 'app-template-dos',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent],
  templateUrl: './template-dos.html',
  styleUrl: './template-dos.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-dos-host' }
})
export class TemplateDos implements OnInit, OnDestroy {
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
        desc: this.truncate(b.desc, 40) // Template 2 seems more flexible with desc
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

  // Estado de filtrado
  public activeTab = signal('Todos');
  public niveles = ['Todos', 'Técnico laboral', 'Técnico profesional', 'Pregrado', 'Posgrado', 'Especialización', 'Educación continuada'];

  // Catálogo de programas (Mock data basado en la referencia)
  public programas = [
    { name: 'Técnico laboral auxiliar administrativo', level: 'Técnico laboral', duration: '24 meses', modality: 'Virtual', price: '$ 12\'000.000' },
    { name: 'Técnico laboral auxiliar en recreación y deporte.', level: 'Técnico laboral', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' },
    { name: 'Técnico laboral en auxiliar clínica veterinaria', level: 'Técnico laboral', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' },
    { name: 'Técnico profesional en contabilidad y finanzas', level: 'Técnico profesional', duration: '24 meses', modality: 'Virtual', price: '$ 12\'000.000' },
    { name: 'Técnico profesional en producción agropecuaria', level: 'Técnico profesional', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' },
    { name: 'Administración de empresas', level: 'Pregrado', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' },
    { name: 'Arquitectura', level: 'Pregrado', duration: '24 meses', modality: 'Virtual', price: '$ 12\'000.000' },
    { name: 'Especialización en marketing digital', level: 'Posgrado', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' },
    { name: 'Especialización en análisis estadístico de ciencia de datos', level: 'Especialización', duration: '12 meses', modality: 'Nocturna', price: '$ 8\'000.000' }
  ];

  // Programas filtrados reactivos
  public filteredPrograms = computed(() => {
    const tab = this.activeTab();
    if (tab === 'Todos') return this.programas;
    return this.programas.filter(p => p.level === tab);
  });

  public setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  public onOfertaChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (val) {
      this.scrollToSimulador();
    }
  }
}
