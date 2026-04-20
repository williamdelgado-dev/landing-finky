import { Component, Input } from '@angular/core';

import { SimuladorButtonComponent } from '../simulador-button/simulador-button.component';

@Component({
  selector: 'app-alliance-section',
  standalone: true,
  imports: [SimuladorButtonComponent],
  templateUrl: './alliance-section.component.html',
  styleUrl: './alliance-section.component.css',
})
export class AllianceSectionComponent {
  @Input() imageSrc = '/assets/images/finker_1.png';
  @Input() universityName = '';
  @Input() useClaro = false;

  public scrollToSimulador() {
    const ids = ['simulador', 'seccion-simulador'];
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        break;
      }
    }
  }
}
