import {
  Component,
  inject,
  signal,
  computed,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';

import { ConfigService } from '@institutional/services/config.service';

import { FooterComponent } from '@shared/components/footer/footer.component';
import { AllianceSectionComponent } from '@shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '@shared/components/simulador-button/simulador-button.component';

import { HeaderComponent } from '@shared/components/header/header.component';
import { SafeUrlPipe } from '@shared/pipes/safe-url.pipe';

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
export class TemplateUno {
  private configService = inject(ConfigService);

  public config = this.configService.config;
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;
  public simuladorUrl = this.configService.simuladorUrl;
  public iframeHeight = signal<number>(560);
  public iframeWidth = signal<string | number>('100%');

  // Estado de los selectores
  public selectedTipo = signal<string>('');

  // Tipos de programa únicos (Primer selector)
  public tiposPrograma = computed(() => {
    const oferta = this.config()?.oferta || [];
    const tipos = oferta.map((item) => item.tipoPrograma);
    return [...new Set(tipos)];
  });

  // Programas filtrados (Segundo selector)
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

  public onTipoChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedTipo.set(val);
  }

  public onProgramaChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (val) {
      this.scrollToSimulador();
    }
  }

  @HostListener('window:message', ['$event'])
  async onMessage(event: MessageEvent) {
    console.log('se realiza simulación');

    if (event.data && typeof event.data === 'object') {
      console.log('se realiza simulación');
      if (event.data.height) {
        this.iframeHeight.set(event.data.height);
      }
      if (event.data.width) {
        this.iframeWidth.set(event.data.width);
      }
    }
  }
}
