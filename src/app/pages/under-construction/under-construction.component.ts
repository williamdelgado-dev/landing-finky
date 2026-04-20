import { Component } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  standalone: true,
  template: `
    <div class="uc-container">
      <div class="uc-card">
        <div class="uc-icon-wrapper">
          <svg
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="uc-icon-svg"
          >
            <!-- Barrier Top Bar -->
            <rect x="10" y="10" width="80" height="15" rx="4" fill="#FBBF24" />
            <path d="M25 10L10 25H15L30 10H25Z" fill="#1F2937" />
            <path d="M45 10L30 25H35L50 10H45Z" fill="#1F2937" />
            <path d="M65 10L50 25H55L70 10H65Z" fill="#1F2937" />
            <path d="M85 10L70 25H75L90 10H85Z" fill="#1F2937" />

            <!-- Barrier Posts -->
            <rect x="25" y="25" width="8" height="25" rx="2" fill="#E879F9" />
            <rect x="67" y="25" width="8" height="25" rx="2" fill="#E879F9" />
          </svg>
        </div>
        <h1 class="uc-title">Página en Construcción</h1>
        <p class="uc-subtitle">
          Estamos preparando algo increíble.<br />
          Pronto podrás acceder a tu landing personalizada.
        </p>
        <div class="uc-divider"></div>
        <img
          src="https://finky.la/wp-content/uploads/2025/11/Diseno_sin_titulo__2___1_-removebg-preview-e1769455260406.png"
          alt="Finky Logo"
          class="uc-logo"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .uc-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, #1e3a45 0%, #0f2027 100%);
        font-family: 'Inter', sans-serif;
        padding: 20px;
        margin: 0;
      }

      .uc-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(30px);
        -webkit-backdrop-filter: blur(30px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 32px;
        padding: 60px 40px;
        text-align: center;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
      }

      .uc-icon-wrapper {
        margin-bottom: 24px;
        display: flex;
        justify-content: center;
      }

      .uc-icon-svg {
        width: 120px;
        height: auto;
        filter: drop-shadow(0 0 15px rgba(232, 121, 249, 0.3));
      }

      .uc-title {
        font-family: 'Archivo Narrow', 'Inter', sans-serif;
        font-size: 2.8rem;
        font-weight: 700;
        color: #ffffff;
        margin: 0 0 16px;
        line-height: 1.1;
        letter-spacing: -0.02em;
      }

      .uc-subtitle {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        line-height: 1.6;
        margin: 0 0 32px;
        font-weight: 400;
      }

      .uc-divider {
        width: 48px;
        height: 4px;
        background: linear-gradient(90deg, #00acca, #f96123);
        border-radius: 2px;
        margin: 0 auto 40px;
      }

      .uc-logo {
        height: 40px;
        filter: brightness(0) invert(1);
        opacity: 0.9;
        transition: opacity 0.3s ease;
      }

      .uc-logo:hover {
        opacity: 1;
      }

      @media (max-width: 480px) {
        .uc-title {
          font-size: 2rem;
        }
        .uc-card {
          padding: 40px 24px;
        }
      }
    `,
  ],
})
export class UnderConstructionComponent {}
