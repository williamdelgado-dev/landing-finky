import { Component, HostListener, signal, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
import { LinaPortalComponent } from '@site/components/lina-portal/lina-portal.component';
import { UniversityService } from '@site/services/university.service';
import * as AOS from 'aos';

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
    LinaPortalComponent,
  ],
  templateUrl: './portal-home.component.html',
  styleUrl: './portal-home.component.css',
})
export class PortalHomeComponent implements OnInit {
  private universityService = inject(UniversityService);
  private sanitizer = inject(DomSanitizer);

  public isLoading = this.universityService.loading;
  public apiUniversities = this.universityService.universities;

  public iframeHeight = signal<number>(650);
  public iframeWidth = signal<string | number>('100%');
  public scrollingMode = signal<string>('no');
  public mainIframeUrl: SafeResourceUrl | null = null;

  ngOnInit() {
    this.loadData();

    // Pre-calculamos la URL del iframe principal para evitar re-renderizados constantes (flickering)
    const color = 'f16c2d';
    const url = `https://d13p412flothha.cloudfront.net/new-simulador.html?secondaryColor=${color}`;
    this.mainIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-back',
    });
  }

  /**
   * Genera la URL para el iframe con los parámetros de color (especial para modal)
   */
  getIframeUrl(): SafeResourceUrl {
    const color = 'f16c2d';
    const url = `https://d13p412flothha.cloudfront.net/new-simulador.html?secondaryColor=${color}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  searchTerm = '';
  selectedCarrera: Carrera | null = null;
  selectedUniversidad: Universidad | null = null;
  tags = tagsPopulares;
  carrerasFiltradas: Carrera[] = [];
  universidadesCarrera: Universidad[] = [];
  showScrollButton = signal(false);

  @HostListener('window:message', ['$event'])
  async onMessage(event: MessageEvent) {
    if (event.data && typeof event.data === 'object') {
      // Si detectamos que ya se simuló (por flag o por aumento de altura considerable)
      if (event.data.type === 'calculated' || event.data.simulated === true || (event.data.height && parseInt(event.data.height) > 900)) {
        this.scrollingMode.set('yes');
      }

      if (event.data.height) {
        // Convertimos a número si viene como string "1000px"
        const h =
          typeof event.data.height === 'string'
            ? parseInt(event.data.height, 10)
            : event.data.height;

        // Le damos un margen extra (+50px) para asegurar que nada se corte
        this.iframeHeight.set(h + 50);
      }
      if (event.data.width) {
        this.iframeWidth.set(event.data.width);
      }
    }
  }

  onIframeLoad() {
    console.log('[Home] Simulator iframe loaded successfully');
    // Forzamos una altura inicial si el postMessage aún no ha llegado
    if (this.iframeHeight() < 650) {
      this.iframeHeight.set(650);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Intentamos obtener el scroll de varias fuentes para mayor compatibilidad
    const scrollPos =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    const threshold = 100;
    const isVisible = scrollPos > threshold;

    if (this.showScrollButton() !== isVisible) {
      this.showScrollButton.set(isVisible);
      console.log('[Home] Scroll detected. Pos:', scrollPos, 'Visible:', isVisible);
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async loadData() {
    console.log('[Home] Cargando universidades dinámicas...');
    const unis = await this.universityService.getAllUniversities();
    console.log('[Home] Universidades recibidas:', unis);
  }

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
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.carrerasFiltradas = [];
      return;
    }

    // 1. Filtrar datos estáticos originales
    const staticResults = carreras.filter(
      (c) => c.nombre.toLowerCase().includes(term) || c.area.toLowerCase().includes(term),
    );

    // 2. Filtrar y mapear datos dinámicos de la API de Universidades
    const dynamicResults: Carrera[] = [];
    const allUnis = this.apiUniversities();

    allUnis.forEach((uni) => {
      uni.academicProgram.forEach((program) => {
        const matchesName = program.name.toLowerCase().includes(term);
        const matchesArea = program.programType.description.toLowerCase().includes(term);
        const matchesUni = uni.displayName.toLowerCase().includes(term);

        if (matchesName || matchesArea || matchesUni) {
          dynamicResults.push({
            id: program.id + 10000, // Offset para evitar colisiones
            nombre: program.name,
            area: program.programType.description,
            duracion: `${program.semesters} semestres`,
            // Limpiamos el precio para evitar el doble $$ ($ 4.200.000 COP -> 4.200.000)
            precio: program.semesterPriceString.replace('$', '').replace('COP', '').trim(),
            universidades: [uni.id],
          });
        }
      });
    });

    // 3. Unir y eliminar duplicados potenciales (por nombre si es necesario,
    // pero aquí los mantenemos para mostrar todas las opciones de diferentes fuentes)
    this.carrerasFiltradas = [...staticResults, ...dynamicResults];
  }

  selectCarrera(carrera: Carrera) {
    this.selectedCarrera = carrera;

    if (carrera.id >= 10000) {
      // Caso dinámico: Buscar en las universidades del API
      const apiUni = this.apiUniversities().find((u) => u.id === carrera.universidades[0]);
      if (apiUni) {
        this.universidadesCarrera = [
          {
            id: apiUni.id,
            nombre: apiUni.displayName || apiUni.name,
            logo: 'https://finky.la/wp-content/uploads/2025/11/Areandina-editado.png', // Logo por defecto si no hay en API
            ciudad: 'Múltiples sedes',
            modalidades: apiUni.aplicasede ? ['Presencial', 'Virtual'] : ['Virtual'],
          },
        ];
      }
    } else {
      // Caso estático: Usar la función original
      this.universidadesCarrera = getUniversidadesByCarrera(carrera);
    }
  }

  backToResults() {
    this.selectedCarrera = null;
    this.selectedUniversidad = null;
  }

  onSimularClick(uni: Universidad) {
    console.log('[Home] Intento de simulación solicitado para:', {
      universidad: uni.nombre,
      carrera: this.selectedCarrera?.nombre,
    });
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
