import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-stats',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="container">
        @for (stat of stats; track stat.label) {
          <div class="stat">
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        padding: 48px 16px;
        background: #ff6b35;
      }
      .container {
        max-width: 1152px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
        text-align: center;
      }
      @media (min-width: 768px) {
        .container {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .stat-value {
        font-size: 36px;
        font-weight: 700;
        color: white;
      }
      .stat-label {
        color: rgba(255, 255, 255, 0.8);
      }
    `,
  ],
})
export class PortalStatsComponent {
  stats = [
    { value: '10k+', label: 'Estudiantes' },
    { value: '25+', label: 'Universidades' },
    { value: '20k+', label: 'Créditos' },
    { value: '0', label: 'Codeudores' },
  ];
}
