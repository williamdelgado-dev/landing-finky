import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-cookies-banner',
  standalone: true,
  template: `
    @if (isVisible()) {
      <div class="cookies-banner">
        <div class="content">
          <p>Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra <a href="#">política de cookies</a>.</p>
          <button (click)="accept()" class="accept-btn">Aceptar</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .cookies-banner {
      position: fixed;
      bottom: 24px;
      left: 24px;
      right: 24px;
      background: white;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      border-radius: 16px;
      padding: 16px 24px;
      z-index: 2000;
      border: 1px solid #f3f4f6;
      animation: slideIn 0.5s ease-out;
    }
    @media (min-width: 768px) {
      .cookies-banner {
        left: auto;
        right: 24px;
        max-width: 400px;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    @media (min-width: 640px) {
      .content {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
    p {
      font-size: 13px;
      color: #4b5563;
      margin: 0;
      line-height: 1.5;
    }
    a {
      color: #ff6b35;
      text-decoration: none;
      font-weight: 600;
    }
    .accept-btn {
      background: #3e2a7e;
      color: white;
      border: none;
      padding: 8px 24px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .accept-btn:hover {
      background: #2d1e5c;
      transform: scale(1.05);
    }
    @keyframes slideIn {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class CookiesBannerComponent {
  isVisible = signal(!localStorage.getItem('cookies-accepted'));

  accept() {
    localStorage.setItem('cookies-accepted', 'true');
    this.isVisible.set(false);
  }
}
