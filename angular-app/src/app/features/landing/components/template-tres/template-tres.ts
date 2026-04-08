import { Component, inject, OnInit, OnDestroy, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-template-tres',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent, HeaderComponent],
  templateUrl: './template-tres.html',
  styleUrl: './template-tres.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-tres-host' }
})
export class TemplateTres implements OnInit {
  private configService = inject(ConfigService);

  // Consumimos directamente la señal del servicio
  public config = this.configService.config;

  // Computed properties centralizados ahora en ConfigService
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;

  ngOnInit() {
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
