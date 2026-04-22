import { Component, inject, computed } from '@angular/core';
import { UniversityService } from '@site/services/university.service';

@Component({
  selector: 'app-portal-universidades-carousel',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="title-container">
        <h2 class="title">Estudia en las mejores Instituciones de Educación Superior (IES) aliadas</h2>
      </div>
      <div class="scroll-track">
        <div class="scroll-inner">
          @for (uni of allLogos(); track uni.nombre + $index) {
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
        gap: 120px;
        animation: scroll 60s linear infinite;
        align-items: center;
      }
      .uni-logo {
        height: 180px;
        width: auto;
        max-width: 360px;
        object-fit: contain;
        flex-shrink: 0;
        opacity: 0.9;
        transition: all 0.4s ease;
      }
      .uni-logo:hover {
        opacity: 1;
        transform: scale(1.05);
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
  private universityService = inject(UniversityService);

  allLogos = computed(() => {
    const unis = this.universityService.universities();
    if (unis.length === 0) return [];

    // Usamos un Map para asegurar que cada URL de logo sea única
    const uniqueLogos = new Map<string, any>();

    unis.forEach((u) => {
      const logoPath = u.landingConfig?.iconUniversity;
      if (logoPath && logoPath.trim() !== '') {
        const fullUrl = `https://portal-legalizaciones.s3.us-east-1.amazonaws.com/${logoPath}`;
        if (!uniqueLogos.has(fullUrl)) {
          uniqueLogos.set(fullUrl, {
            nombre: u.displayName || u.name,
            logo: fullUrl,
          });
        }
      }
    });

    const mapped = Array.from(uniqueLogos.values());

    // Duplicamos para el efecto de scroll infinito (si hay suficientes logos)
    return mapped.length > 0 ? [...mapped, ...mapped] : [];
  });
}
