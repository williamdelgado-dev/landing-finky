import { Component, HostListener } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalSimuladorComponent } from '@site/components/simulador/simulador.component';
import { PortalBeneficiosComponent } from '@site/components/beneficios/beneficios.component';
import { PortalStatsComponent } from '@site/components/stats/stats.component';
import { PortalTestimoniosComponent } from '@site/components/testimonios/testimonios.component';
import { PortalFaqsComponent } from '@site/components/faqs/faqs.component';
import { PortalUniversidadesCarouselComponent } from '@site/components/universidades-carousel/universidades-carousel.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';
import { carreras, tagsPopulares, getUniversidadesByCarrera } from '@site/data/finky-data';
import { Carrera, Universidad } from '@site/models/models';
import { CookiesBannerComponent } from '@shared/components/cookies-banner/cookies-banner.component';
import { FloatingWidgetComponent } from '@institutional/components/floating-widget/floating-widget';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    FormsModule,
    PortalHeaderComponent,
    PortalSimuladorComponent,
    PortalBeneficiosComponent,
    PortalStatsComponent,
    PortalTestimoniosComponent,
    PortalFaqsComponent,
    PortalUniversidadesCarouselComponent,
    PortalFooterComponent,
    CookiesBannerComponent,
    FloatingWidgetComponent,
  ],
  templateUrl: './portal-home.component.html',
  styleUrl: './portal-home.component.css',
})
export class PortalHomeComponent {
  searchTerm = '';
  selectedCarrera: Carrera | null = null;
  selectedUniversidad: Universidad | null = null;
  tags = tagsPopulares;
  carrerasFiltradas: Carrera[] = [];
  universidadesCarrera: Universidad[] = [];

  onSearchChange() {
    this.selectedCarrera = null;
    this.selectedUniversidad = null;
    this.filterCarreras();
  }

  setSearch(tag: string) {
    this.searchTerm = tag;
    this.onSearchChange();
  }

  filterCarreras() {
    const term = this.searchTerm.toLowerCase();
    this.carrerasFiltradas = carreras.filter(
      (c) => c.nombre.toLowerCase().includes(term) || c.area.toLowerCase().includes(term),
    );
  }

  selectCarrera(carrera: Carrera) {
    this.selectedCarrera = carrera;
    this.universidadesCarrera = getUniversidadesByCarrera(carrera);
  }

  backToResults() {
    this.selectedCarrera = null;
    this.selectedUniversidad = null;
  }

  selectUniversidad(uni: Universidad) {
    this.selectedUniversidad = uni;
  }

  closeModal() {
    this.selectedUniversidad = null;
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.selectedUniversidad) {
      this.closeModal();
    }
  }
}
