import { Component } from '@angular/core';

@Component({
  selector: 'app-portal-beneficios',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="title">¿Por qué elegir Finky?</h2>
        <div class="grid">
          @for (item of beneficios; track item.titulo) {
            <div class="card">
              <div class="icon-wrap">
                @switch (item.icon) {
                  @case ('shield') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                      />
                    </svg>
                  }
                  @case ('zap') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                      />
                    </svg>
                  }
                  @case ('card') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  }
                  @case ('star') {
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                      />
                    </svg>
                  }
                }
              </div>
              <h3 class="card-title">{{ item.titulo }}</h3>
              <p class="card-desc">{{ item.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        padding: 64px 16px;
        background: white;
      }
      .container {
        max-width: 1152px;
        margin: 0 auto;
      }
      .title {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        color: #111827;
        margin-bottom: 48px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (min-width: 1024px) {
        .grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }
      .card {
        background: #fff7ed;
        border-radius: 16px;
        padding: 24px;
        text-align: center;
        transition: box-shadow 0.3s;
      }
      .card:hover {
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }
      .icon-wrap {
        width: 56px;
        height: 56px;
        background: #ff6b35;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
      }
      .card-title {
        font-weight: 700;
        color: #111827;
        margin-bottom: 8px;
      }
      .card-desc {
        font-size: 14px;
        color: #4b5563;
      }
    `,
  ],
})
export class PortalBeneficiosComponent {
  beneficios = [
    {
      icon: 'shield',
      titulo: 'Sin codeudor',
      desc: 'Aquí respondes tú, no alguien más. No necesitas poner a un tercero como respaldo.',
    },
    {
      icon: 'zap',
      titulo: 'Aprobación en 5 min',
      desc: 'Proceso 100% digital. Simula, regístrate y obtén respuesta inmediata.',
    },
    {
      icon: 'card',
      titulo: 'Sin historial crediticio',
      desc: 'No te pedimos historial para entrar; te lo ayudamos a crear.',
    },
    {
      icon: 'star',
      titulo: 'Renovación con ahorro',
      desc: 'Si ya eres Finker y renuevas, no te cobramos la fianza porque confiamos en ti.',
    },
  ];
}
