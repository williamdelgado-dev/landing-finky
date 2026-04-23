import { Component, HostListener, signal, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalSimuladorComponent } from '@site/components/simulador/simulador.component';
import { PortalBeneficiosComponent } from '@site/components/beneficios/beneficios.component';
import { PortalStatsComponent } from '@site/components/stats/stats.component';
import { PortalTestimoniosComponent } from '@site/components/testimonios/testimonios.component';
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
    PortalBeneficiosComponent,
    PortalStatsComponent,
    PortalTestimoniosComponent,
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

  ngOnInit(): void {
    this.loadData();

    // Pre-calculamos la URL del iframe principal para evitar re-renderizados constantes (flickering)
    const color = 'f16c2d';
    const url = `https://d13p412flothha.cloudfront.net/new-simulador.html?secondaryColor=${color}`;
    this.mainIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 800,
        once: true,
        mirror: false,
      });

      // Enable scrolling on mobile/tablet devices automatically
      if (window.innerWidth < 1024) {
        this.scrollingMode.set('yes');
      }
    }
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
    console.log('[Home] Cargando datos dinámicos...');
    const [unis, progs] = await Promise.all([
      this.universityService.getAllUniversities(),
      this.universityService.getAllPrograms()
    ]);
    console.log('[Home] Datos cargados:', { unis: unis.length, programs: progs.length });
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

    const allPrograms = this.universityService.programs();
    const allUnis = this.universityService.universities();

    // Filtramos y mapeamos los programas del API
    this.carrerasFiltradas = allPrograms
      .filter((program) => {
        const matchesName = program.name.toLowerCase().includes(term);
        const matchesType = program.programType?.description.toLowerCase().includes(term);
        
        // También buscamos por el nombre de la universidad relacionada
        const uni = allUnis.find(u => u.id === program.universityId);
        const matchesUni = uni ? uni.name.toLowerCase().includes(term) : false;

        return matchesName || matchesType || matchesUni;
      })
      .map((program) => {
        const uni = allUnis.find(u => u.id === program.universityId);
        return {
          id: program.id,
          nombre: program.name,
          area: program.programType?.description || 'General',
          duracion: `${program.semesters} semestres`,
          precio: program.semesterPrice.toLocaleString('es-CO'),
          universidades: [program.universityId],
          // Guardamos referencia a la universidad para facilitar el detalle
          _university: uni
        };
      }) as any;
  }

  selectCarrera(carrera: any) {
    this.selectedCarrera = carrera;
    const uni = carrera._university;

    if (uni) {
      this.universidadesCarrera = [
        {
          id: uni.id,
          nombre: uni.displayName || uni.name,
          // Usamos el logo del landingConfig si existe, si no un placeholder
          logo: uni.landingConfig?.iconUniversity 
            ? `https://portal-legalizaciones.s3.us-east-1.amazonaws.com/${uni.landingConfig.iconUniversity}`
            : '/assets/images/finkylogo.jpg',
          ciudad: 'Múltiples sedes',
          modalidades: uni.aplicasede ? ['Presencial', 'Virtual'] : ['Virtual'],
          slug: uni.landingConfig?.slug || uni.slug
        },
      ];
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
