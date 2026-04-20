import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simulador-button',
  standalone: true,
  imports: [],
  templateUrl: './simulador-button.component.html',
  styleUrl: './simulador-button.component.css',
})
export class SimuladorButtonComponent {
  @Input() text = 'Simular mi crédito';
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
