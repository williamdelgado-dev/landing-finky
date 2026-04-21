import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portal-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="header" [class.scrolled]="isScrolled">
      <div class="container header-inner">
        <a routerLink="/" class="logo-wrap">
          <img src="/assets/images/finkylogo.jpg" alt="Finky" class="logo" />
        </a>
        
        <nav class="nav">
          <div class="nav-links">
            <a class="nav-link" routerLink="/que-es-finky" routerLinkActive="active">Qué es Finky</a>
            <a class="nav-link" routerLink="/instituciones-aliadas" routerLinkActive="active">Instituciones aliadas</a>
            <a class="nav-link" routerLink="/preguntas" routerLinkActive="active">FAQ</a>
            <a class="nav-link paga-cuota-btn" href="https://app.finky.la/pagos">Paga tu cuota</a>
          </div>
          
          <div class="nav-auth">
            <a href="https://app.finky.la/login" class="login-btn">Ingreso</a>
            <a href="https://app.finky.la/registro" class="register-btn">
              Registrarse
              <span class="material-icons">arrow_forward</span>
            </a>
          </div>
          
          <button class="mobile-toggle" (click)="isMobileMenuOpen = !isMobileMenuOpen">
            <span class="material-icons">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <a class="mobile-link" routerLink="/que-es-finky" (click)="isMobileMenuOpen = false">Qué es Finky</a>
        <a class="mobile-link" routerLink="/instituciones-aliadas" (click)="isMobileMenuOpen = false">Instituciones aliadas</a>
        <a class="mobile-link" routerLink="/preguntas" (click)="isMobileMenuOpen = false">FAQ</a>
        <a class="mobile-link paga-cuota-mobile" href="https://app.finky.la/pagos" (click)="isMobileMenuOpen = false">Paga tu cuota</a>
        <div class="mobile-auth">
          <a href="https://app.finky.la/login" class="login-btn">Ingreso</a>
          <a href="https://app.finky.la/registro" class="register-btn">Registrarse</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

      :host {
        --header-height: 84px;
        --primary-orange: #fc6223;
        --primary-purple: #fc6223;
        --nav-text: #4b5563;
      }

      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        height: var(--header-height);
        display: flex;
        align-items: center;
        background: white;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .header.scrolled {
        background: white;
        height: 74px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
      }

      .container {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 40px;
        width: 100%;
      }

      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        height: 48px;
        transition: transform 0.3s;
      }

      .logo:hover {
        transform: scale(1.05);
      }

      .nav {
        display: flex;
        align-items: center;
        gap: 40px;
      }

      .nav-links {
        display: flex;
        gap: 32px;
        align-items: center;
      }

      .nav-link {
        font-size: 15px;
        font-weight: 600;
        color: var(--nav-text);
        text-decoration: none;
        transition: all 0.3s ease;
        position: relative;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--primary-orange);
        transition: width 0.3s ease;
      }

      .nav-link:hover {
        color: var(--primary-orange);
      }

      .nav-link:hover::after, .nav-link.active::after {
        width: 100%;
      }

      .paga-cuota-btn {
        background: rgba(252, 98, 35, 0.1);
        color: var(--primary-orange) !important;
        padding: 8px 20px;
        border-radius: 50px;
        border: 2px solid var(--primary-orange);
        transition: all 0.3s ease !important;
      }

      .paga-cuota-btn::after {
        display: none;
      }

      .paga-cuota-btn:hover {
        background: var(--primary-orange);
        color: white !important;
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(252, 98, 35, 0.3);
      }

      .paga-cuota-mobile {
        background: var(--primary-orange);
        color: white !important;
        padding: 12px;
        border-radius: 12px;
        text-align: center;
        margin-top: 8px;
      }

      .nav-auth {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-left: 12px;
        padding-left: 32px;
        border-left: 1px solid rgba(0, 0, 0, 0.08);
      }

      .login-btn {
        font-size: 15px;
        color: var(--primary-orange);
        text-decoration: none;
        font-weight: 700;
        transition: all 0.2s;
      }

      .login-btn:hover {
        color: var(--primary-orange);
        opacity: 0.7;
      }

      .register-btn {
        background: var(--primary-orange);
        color: white;
        padding: 12px 28px;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
        box-shadow: 0 10px 20px rgba(252, 98, 35, 0.25);
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .register-btn span {
        font-size: 18px;
        transition: transform 0.3s ease;
      }

      .register-btn:hover {
        background: #e5521a;
        box-shadow: 0 15px 30px rgba(252, 98, 35, 0.35);
        transform: translateY(-2px);
      }

      .register-btn:hover span {
        transform: translateX(4px);
      }

      .mobile-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--primary-purple);
        cursor: pointer;
        padding: 8px;
      }

      /* Mobile Menu Styles */
      .mobile-menu {
        position: fixed;
        top: var(--header-height);
        left: 0;
        right: 0;
        background: white;
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      }

      .mobile-menu.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
      }

      .mobile-link {
        font-size: 18px;
        font-weight: 700;
        color: var(--primary-purple);
        text-decoration: none;
      }

      @media (max-width: 1024px) {
        .nav-links, .nav-auth {
          display: none;
        }
        .mobile-toggle {
          display: block;
        }
      }
    `,
  ],
})
export class PortalHeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 50;
      });
    }
  }
}
