import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulador-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulador-button.component.html',
  styleUrl: './simulador-button.component.css'
})
export class SimuladorButtonComponent {
  @Input() text: string = 'Simular mi crédito';

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
