import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-portal-stats',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="container">
        @for (stat of activeStats(); track stat.label; let i = $index) {
          <div class="stat" data-aos="fade-up" [attr.data-aos-delay]="i * 100">
            <p class="stat-value">{{ stat.current }}{{ stat.suffix }}</p>
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
        background: #f16c2d; /* Using primary orange */
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
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .stat {
        /* Animación manejada por AOS */
      }
      .stat-value {
        font-size: 40px;
        font-weight: 800;
        color: white;
        font-family: 'Outfit', sans-serif;
        margin-bottom: 4px;
      }
      .stat-label {
        font-size: 16px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 0.5px;
      }
    `,
  ],
})
export class PortalStatsComponent implements OnInit {
  public activeStats = signal([
    { target: 14, current: 0, suffix: 'k', label: 'Estudiantes activos' },
    { target: 25, current: 0, suffix: '+', label: 'IES aliadas' },
    { target: 1100, current: 0, suffix: '+', label: 'Ciudades y municipios' },
  ]);

  ngOnInit() {
    this.animateCounters();
  }

  animateCounters() {
    const duration = 2000; // 2 seconds
    const fps = 60;
    const steps = (duration / 1000) * fps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      this.activeStats.update(stats => 
        stats.map(s => ({
          ...s,
          current: Math.floor(s.target * this.easeOutExpo(progress))
        }))
      );

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, 1000 / fps);
  }

  private easeOutExpo(x: number): number {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
}
