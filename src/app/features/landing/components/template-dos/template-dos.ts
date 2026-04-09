import { Component, inject, OnInit, OnDestroy, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-template-dos',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent, HeaderComponent, SafeUrlPipe],
  templateUrl: './template-dos.html',
  styleUrl: './template-dos.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-dos-host' }
})
export class TemplateDos implements OnInit {
  private configService = inject(ConfigService);
  
  public config = this.configService.config;
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;
  public simuladorUrl = this.configService.simuladorUrl;

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

  // Tipos de programa (niveles) dinámicos para las pestañas
  public niveles = computed(() => {
    const oferta = this.config()?.oferta || [];
    const tipos = oferta.map(item => item.tipoPrograma);
    return ['Todos', ...new Set(tipos)];
  });

  // Catálogo de programas dinámico basado en la configuración
  public programas = computed(() => {
    const oferta = this.config()?.oferta || [];
    return oferta.map(item => ({
      name: item.Nombre,
      level: item.tipoPrograma,
      duration: 'Consultar', // El nuevo modelo no incluye duración
      modality: item.modalidad || 'Presencial',
      price: item.valorSemestre ? `$ ${item.valorSemestre}` : 'Consultar'
    }));
  });

  // Programas filtrados reactivos
  public filteredPrograms = computed(() => {
    const tab = this.activeTab();
    const allPrograms = this.programas();
    if (tab === 'Todos') return allPrograms;
    return allPrograms.filter(p => p.level === tab);
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
