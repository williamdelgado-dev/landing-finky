import { Component } from '@angular/core';

import { universidades } from '@site/data/finky-data';

@Component({
  selector: 'app-portal-universidades-carousel',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="title-container">
        <h2 class="title">Estudia en las mejores universidades del país</h2>
      </div>
      <div class="scroll-track">
        <div class="scroll-inner">
          @for (uni of allLogos; track uni.nombre + $index) {
            <img [src]="uni.logo" [alt]="uni.nombre" class="uni-logo" />
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        padding: 80px 0;
        background: #fdfdfd;
        overflow: hidden;
      }
      .title-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }
      .title {
        font-size: 36px;
        font-weight: 800;
        text-align: center;
        color: #111827;
        margin-bottom: 64px;
        letter-spacing: -0.02em;
      }
      .scroll-track {
        width: 100%;
        overflow: hidden;
        mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 90%,
          transparent
        );
      }
      .scroll-inner {
        display: flex;
        gap: 80px;
        animation: scroll 40s linear infinite;
        align-items: center;
      }
      .uni-logo {
        height: 90px;
        width: auto;
        object-fit: contain;
        flex-shrink: 0;
        filter: grayscale(100%) opacity(0.6);
        transition: all 0.4s ease;
      }
      .uni-logo:hover {
        filter: grayscale(0%) opacity(1);
        transform: scale(1.1);
      }
      @keyframes scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `,
  ],
})
export class PortalUniversidadesCarouselComponent {
  allLogos = [...universidades, ...universidades];
}
