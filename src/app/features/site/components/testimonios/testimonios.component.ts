import { Component } from '@angular/core';

import { testimonios } from '@site/data/finky-data';

@Component({
  selector: 'app-portal-testimonios',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="title">Lo que dicen nuestros Finkers</h2>
        <p class="subtitle">Miles de estudiantes ya financiaron sus estudios con nosotros</p>
        <div class="grid">
          @for (t of testimonios; track t.nombre) {
            <div class="card">
              <div class="avatar-row">
                <img [src]="t.imagen" [alt]="t.nombre" class="avatar" />
                <div>
                  <p class="name">{{ t.nombre }}</p>
                  <p class="role">Estudiante</p>
                </div>
              </div>
              <p class="quote">"{{ t.texto }}"</p>
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
        background: #f9fafb;
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
        margin-bottom: 16px;
      }
      .subtitle {
        text-align: center;
        color: #4b5563;
        margin-bottom: 48px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 24px;
      }
      @media (min-width: 768px) {
        .grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      }
      .avatar-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
      }
      .name {
        font-weight: 600;
        color: #111827;
      }
      .role {
        font-size: 14px;
        color: #6b7280;
      }
      .quote {
        color: #4b5563;
        font-style: italic;
      }
    `,
  ],
})
export class PortalTestimoniosComponent {
  testimonios = testimonios;
}
