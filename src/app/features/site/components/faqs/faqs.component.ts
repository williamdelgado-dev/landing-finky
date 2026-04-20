import { Component } from '@angular/core';

import { faqs } from '@site/data/finky-data';

@Component({
  selector: 'app-portal-faqs',
  standalone: true,
  imports: [],
  template: `
    <section class="section">
      <div class="container">
        <h2 class="title">Preguntas frecuentes</h2>
        <p class="subtitle">Información clave para orientarte durante tu proceso</p>
        <div class="faq-list">
          @for (faq of faqs; track faq.pregunta; let i = $index) {
            <div class="faq-item">
              <button (click)="toggle(i)" class="faq-btn">
                <span class="faq-question">{{ faq.pregunta }}</span>
                <svg
                  [class.rotated]="openIdx === i"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9ca3af"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              @if (openIdx === i) {
                <div class="faq-answer">{{ faq.respuesta }}</div>
              }
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
        max-width: 768px;
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
      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .faq-item {
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        overflow: hidden;
      }
      .faq-btn {
        width: 100%;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
      }
      .faq-btn:hover {
        background: #f9fafb;
      }
      .faq-question {
        font-weight: 500;
        color: #111827;
      }
      svg {
        transition: transform 0.2s;
        flex-shrink: 0;
      }
      .rotated {
        transform: rotate(180deg);
      }
      .faq-answer {
        padding: 0 24px 16px;
        color: #4b5563;
      }
    `,
  ],
})
export class PortalFaqsComponent {
  faqs = faqs;
  openIdx: number | null = null;

  toggle(idx: number) {
    this.openIdx = this.openIdx === idx ? null : idx;
  }
}
