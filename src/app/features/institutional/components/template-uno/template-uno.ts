import {
  Component,
  inject,
  signal,
  computed,
  ViewEncapsulation,
  HostListener,
  OnInit,
} from '@angular/core';

import { ConfigService } from '@institutional/services/config.service';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { AllianceSectionComponent } from '@shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '@shared/components/simulador-button/simulador-button.component';

import { HeaderComponent } from '@shared/components/header/header.component';
import { SafeUrlPipe } from '@shared/pipes/safe-url.pipe';
import * as AOS from 'aos';

@Component({
  selector: 'app-template-uno',
  standalone: true,
  imports: [
    FooterComponent,
    AllianceSectionComponent,
    SimuladorButtonComponent,
    HeaderComponent,
    SafeUrlPipe,
  ],
  templateUrl: './template-uno.html',
  styleUrl: './template-uno.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-uno-host' },
})
export class TemplateUno implements OnInit {
  private configService = inject(ConfigService);

  public config = this.configService.config;
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;
  public simuladorUrl = this.configService.simuladorUrl;
  public iframeHeight = signal<number>(640);
  public iframeWidth = signal<string | number>('100%');

  // Estado de los selectores (Signal-based filter)
  public selectedTipo = signal<string>('');

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      AOS.init({ duration: 900, once: true, mirror: false });
    }
    // Auto-select del primer tipo para mostrar contenido al entrar
    queueMicrotask(() => {
      const tipos = this.tiposPrograma();
      if (tipos.length && !this.selectedTipo()) {
        this.selectedTipo.set(tipos[0]);
      }
    });
  }

  // Tipos de programa únicos (Signal computed)
  public tiposPrograma = computed(() => {
    const oferta = this.config()?.oferta || [];
    const tipos = oferta.map((item) => item.tipoPrograma);
    return [...new Set(tipos)];
  });

  // Programas filtrados (Signal computed)
  public programasFiltrados = computed(() => {
    const oferta = this.config()?.oferta || [];
    const tipo = this.selectedTipo();
    if (!tipo) return [];
    return oferta.filter((item) => item.tipoPrograma === tipo);
  });

  public scrollToSimulador() {
    const element = document.getElementById('seccion-simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public selectTipo(tipo: string) {
    this.selectedTipo.set(tipo);
  }

  public onProgramaSelect() {
    this.scrollToSimulador();
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
