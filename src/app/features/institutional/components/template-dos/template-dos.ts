import {
  Component,
  inject,
  signal,
  computed,
  ViewEncapsulation,
  HostListener,
  OnInit,
} from '@angular/core';

import * as AOS from 'aos';

import { ConfigService } from '@institutional/services/config.service';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { AllianceSectionComponent } from '@shared/components/alliance-section/alliance-section.component';

import { HeaderComponent } from '@shared/components/header/header.component';
import { SafeUrlPipe } from '@shared/pipes/safe-url.pipe';
import { SimuladorButtonComponent } from '@app/shared/components/simulador-button/simulador-button.component';

@Component({
  selector: 'app-template-dos',
  standalone: true,
  imports: [
    FooterComponent,
    AllianceSectionComponent,
    HeaderComponent,
    SafeUrlPipe,
    SimuladorButtonComponent,
  ],
  templateUrl: './template-dos.html',
  styleUrl: './template-dos.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-dos-host' },
})
export class TemplateDos implements OnInit {
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
      });
    }
  }
  private configService = inject(ConfigService);

  public config = this.configService.config;
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;
  public simuladorUrl = this.configService.simuladorUrl;
  public iframeHeight = signal<number>(600);
  public iframeWidth = signal<string | number>('100%');

  public scrollToSimulador() {
    const element = document.getElementById('simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public scrollToOferta() {
    const element = document.getElementById('oferta');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Divide el título del banner en [main, accent] para destacar las últimas
   * 1-2 palabras con --color-claro. Mantiene 100% reactividad sobre el signal.
   */
  public titleParts = computed(() => {
    const raw = (this.validatedBanner()?.titulo || '').trim();
    if (!raw) return { main: '', accent: '' };
    const tokens = raw.split(/\s+/);
    if (tokens.length <= 2) return { main: '', accent: raw };
    const accentCount = tokens.length >= 5 ? 2 : 1;
    const main = tokens.slice(0, tokens.length - accentCount).join(' ');
    const accent = tokens.slice(tokens.length - accentCount).join(' ');
    return { main, accent };
  });

  /**
   * Tiempo aproximado de aprobación que aparece en el badge flotante del hero.
   * Extrae sólo la cifra y unidad (ej: "5 min", "4 minutos") del primer
   * bullet que mencione una unidad de tiempo. Si no encuentra, usa "4 min".
   */
  public aprobacionTime = computed(() => {
    const bullets = this.validatedBullets() || [];
    for (const b of bullets) {
      const match = (b.titulo || '').match(
        /(\+?\d+\s*(min|minuto|minutos|hora|horas|seg|segundo|segundos))/i,
      );
      if (match) return match[1].toLowerCase();
    }
    return '4 min';
  });

  // Estado de filtrado
  public activeTab = signal('Todos');

  // Tipos de programa (niveles) dinámicos para las pestañas
  public niveles = computed(() => {
    const oferta = this.config()?.oferta || [];
    const tipos = oferta.map((item) => item.tipoPrograma);
    return ['Todos', ...new Set(tipos)];
  });

  // Catálogo de programas dinámico basado en la configuración
  public programas = computed(() => {
    const oferta = this.config()?.oferta || [];
    return oferta.map((item) => ({
      name: item.Nombre,
      level: item.tipoPrograma,
      price: item.valorSemestre ? `${item.valorSemestre}` : 'Consultar',
    }));
  });

  // Programas filtrados reactivos
  public filteredPrograms = computed(() => {
    const tab = this.activeTab();
    const allPrograms = this.programas();
    if (tab === 'Todos') return allPrograms;
    return allPrograms.filter((p) => p.level === tab);
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

  @HostListener('window:message', ['$event'])
  async onMessage(event: MessageEvent) {
    if (event.data && typeof event.data === 'object') {
      if (event.data.height) {
        this.iframeHeight.set(event.data.height);
      }
      if (event.data.width) {
        this.iframeWidth.set(event.data.width);
      }
    }
  }
}
