import { Component, inject, OnInit, signal, computed, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { LandingConfig } from '../../models/landing-config.model';
import { Subscription } from 'rxjs';

import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { AllianceSectionComponent } from '../../../../shared/components/alliance-section/alliance-section.component';
import { SimuladorButtonComponent } from '../../../../shared/components/simulador-button/simulador-button.component';

import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-template-uno',
  standalone: true,
  imports: [CommonModule, FooterComponent, AllianceSectionComponent, SimuladorButtonComponent, HeaderComponent],
  templateUrl: './template-uno.html',
  styleUrl: './template-uno.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'template-uno-host' }
})
export class TemplateUno implements OnInit {
  private configService = inject(ConfigService);
  
  public config = this.configService.config;
  public validatedBanner = this.configService.validatedBanner;
  public validatedBullets = this.configService.validatedBullets;

  ngOnInit() {
  }

  public scrollToSimulador() {
    const element = document.getElementById('seccion-simulador');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public onOfertaChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    if (val) {
      this.scrollToSimulador();
    }
  }
}
