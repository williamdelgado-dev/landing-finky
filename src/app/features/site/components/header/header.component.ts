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
          
          <button class="mobile-toggle" (click)="toggleMobileMenu()">
            <span class="material-icons">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" [class.open]="isMobileMenuOpen">
        <a class="mobile-link" routerLink="/que-es-finky" (click)="toggleMobileMenu()">Qué es Finky</a>
        <a class="mobile-link" routerLink="/instituciones-aliadas" (click)="toggleMobileMenu()">Instituciones aliadas</a>
        <a class="mobile-link" routerLink="/preguntas" (click)="toggleMobileMenu()">FAQ</a>
        <a class="mobile-link paga-cuota-mobile" href="https://app.finky.la/pagos" (click)="toggleMobileMenu()">Paga tu cuota</a>
        <div class="mobile-auth">
          <a href="https://app.finky.la/login" class="login-btn" (click)="toggleMobileMenu()">Ingreso</a>
          <a href="https://app.finky.la/registro" class="register-btn" (click)="toggleMobileMenu()">Registrarse</a>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

      :host {
        --header-height: 84px;
        --primary-orange: #f16c2d;
        --primary-purple: #f16c2d;
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
        gap: 24px;
      }

      .nav-links {
        display: flex;
        gap: 20px;
        align-items: center;
      }

      .nav-link {
        font-size: 14px;
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
        background: rgba(241, 108, 45, 0.1);
        color: var(--primary-orange) !important;
        padding: 6px 16px;
        border-radius: 50px;
        border: 2px solid var(--primary-orange);
        transition: all 0.3s ease !important;
        font-size: 14px;
        text-decoration: none;
      }

      .paga-cuota-btn:hover {
        background: var(--primary-orange);
        color: white !important;
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(241, 108, 45, 0.3);
      }

      .nav-auth {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: 8px;
        padding-left: 20px;
        border-left: 1px solid rgba(0, 0, 0, 0.08);
      }

      .login-btn {
        font-size: 14px;
        color: var(--primary-orange);
        text-decoration: none;
        font-weight: 700;
        transition: all 0.2s;
      }

      .register-btn {
        background: var(--primary-orange);
        color: white;
        padding: 10px 20px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.4s cubic-bezier(0.2, 1, 0.2, 1);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .mobile-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--primary-orange);
        cursor: pointer;
        padding: 8px;
        transition: transform 0.3s ease;
      }

      /* Mobile Menu Styles */
      .mobile-menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        padding: 100px 32px 40px;
        display: flex;
        flex-direction: column;
        gap: 0;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: 2000000;
      }

      .mobile-menu.open {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
      }

      .mobile-link {
        font-size: 20px;
        font-weight: 700;
        color: #1e293b;
        text-decoration: none;
        padding: 16px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }

      .paga-cuota-mobile {
        background: var(--primary-orange);
        color: white !important;
        padding: 14px;
        border-radius: 12px;
        text-align: center;
        margin-top: 16px;
        font-weight: 700;
        font-size: 16px;
        text-decoration: none;
      }

      .mobile-auth {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 0;
      }

      .mobile-auth .login-btn {
        text-align: center;
        font-size: 15px;
        padding: 6px;
      }

      .mobile-auth .register-btn {
        justify-content: center;
        padding: 12px;
        font-size: 14px;
        border-radius: 10px;
      }

      @media (max-width: 1280px) {
        .container { padding: 0 32px; }
        .nav { gap: 20px; }
      }

      @media (max-width: 991px) {
        .nav-links, .nav-auth { display: none; }
        .mobile-toggle {
          display: block;
          position: relative;
          z-index: 2000001;
        }
        .header { height: 70px; }
        .logo { height: 38px; }
        .paga-cuota-mobile, .mobile-auth .login-btn, .mobile-auth .register-btn {
          max-width: 320px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }
      }
    `,
  ],
})
export class PortalHeaderComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  public toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      if (this.isMobileMenuOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }
  }
}
