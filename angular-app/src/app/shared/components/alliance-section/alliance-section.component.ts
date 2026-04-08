import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimuladorButtonComponent } from '../simulador-button/simulador-button.component';

@Component({
  selector: 'app-alliance-section',
  standalone: true,
  imports: [CommonModule, SimuladorButtonComponent],
  templateUrl: './alliance-section.component.html',
  styleUrl: './alliance-section.component.css'
})
export class AllianceSectionComponent {
  @Input() imageSrc: string = '/assets/images/finker_1.png';
  @Input() universityName: string = '';
  @Input() useClaro: boolean = false;

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
